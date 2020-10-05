// Forma simple 
/*var number;
do {
    var rest;
    var letter;
    // Paso 1: pedir datos al usuario
    number = prompt("Introduce tu número de DNI");
    // Paso 2: comprobar que es un número
    if (parseInt(number) === Number(number)) {
        number = Number(number);
        // Paso 3: comprobar que es un número válido
        if (number >= 0 && number <= 99999999) {
            // Paso 4: obtener el resto y la letra correspondiente
            rest = number % 23;
            switch (rest) {
                case 0:
                    letter = "T";
                    break;
                case 1:
                    letter = "R";
                    break;
                case 2:
                    letter = "W";
                    break;
                case 3:
                    letter = "A";
                    break;
                case 4:
                    letter = "G";
                    break;
                case 5:
                    letter = "M";
                    break;
                case 6:
                    letter = "Y";
                    break;
                case 7:
                    letter = "F";
                    break;
                case 8:
                    letter = "P";
                    break;
                case 9:
                    letter = "D";
                    break;
                case 10:
                    letter = "X";
                    break;
                case 11:
                    letter = "B";
                    break;
                case 12:
                    letter = "N";
                    break;
                case 13:
                    letter = "J";
                    break;
                case 14:
                    letter = "Z";
                    break;
                case 15:
                    letter = "S";
                    break;
                case 16:
                    letter = "Q";
                    break;
                case 17:
                    letter = "V";
                    break;
                case 18:
                    letter = "H";
                    break;
                case 19:
                    letter = "L";
                    break;
                case 20:
                    letter = "C";
                    break;
                case 21:
                    letter = "K";
                    break;
                case 22:
                    letter = "E";
                    break;
            }
            alert("Número: " + number + ", Letra: " + letter);
            number = null; // Finalizamos el código
        } else {
            alert("El número de DNI introducido es erróneo");
        }
    } else {
        // Si pulsó "Aceptar" sin introducir un número...
        // paso 6: Si pulsó "Cancelar", no mostrar el mensaje
        if (number !== null) {
            alert(number + " No es un número");
        }
    }
} while (number !== null);
*/



document
    .getElementById("register")
    .addEventListener("submit", validateForm, true);

function validateForm(event) {
    console.log("COMIENZA PROCESO VALIDACIÓN");
}


// 1. Full name validation.
var isValidFullName = fullname => fullname && fullname.length >= 5;

var validateFullName = () => {
    var fullNameField = document.getElementById("fullName");
    var valid = isValidFullName(fullNameField.value);
    if (valid) {
        fullNameField.classList.remove("error");
    } else {
        fullNameField.classList.add("error");
    }
    return valid;
};

// 2a. Birthdate validaton.
var isValidYear = year =>
    year && year >= 1850 && year < new Date().getFullYear();
var isValidMonth = month => month >= 1 && month <= 12;
var isLeapYear = year =>
    year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
var isValidDay = (day, month, year) => {
    var monthLength = [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return day > 0 && day <= monthLength[month - 1];
};
var splitDateInParts = date => {
    var parts = date.split("/");
    return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])];
};
var isValidDate = date => {
    if (date.length < 8 || date.length > 10) return false;
    var parts = splitDateInParts(date); // [day, month, year]
    return (
        isValidYear(parts[2]) &&
        isValidMonth(parts[1]) &&
        isValidDay(parts[0], parts[1], parts[2])
    );
};
var validateBirthdate = () => {
    var birthdayField = document.getElementById("birthday");
    var valid = isValidDate(birthdayField.value);
    if (isValidDate(birthdayField.value)) {
        birthdayField.classList.remove("error");
    } else {
        birthdayField.classList.add("error");
    }
    return valid;
};

// 2b. Birthdate over 18.
var isOver18 = date => {
    var parts = splitDateInParts(date); // [day, month, year]
    var nowDate = new Date();
    var limitDate = nowDate.setFullYear(nowDate.getFullYear() - 18);
    return limitDate >= new Date(parts[2], parts[1] - 1, parts[0]); // Months in 0 base
};
var showIsAdult = () => {
    var birthdayField = document.getElementById("birthday");
    document.getElementById("age").innerHTML = isOver18(birthdayField.value) ?
        "SÍ" :
        "NO";
};

// 3. DNI validation.
var DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKET";
var isValidDNILetter = (dniLetter, dniNumber) =>
    DNI_LETTERS[dniNumber % 23] === dniLetter.toUpperCase();
var isValidDNINumber = number => number >= 0 && number <= 99999999;
var isValidDNI = dni => {
    if (dni.length !== 9) return false;
    var dniNumber = dni.slice(0, 8);
    var dniLetter = dni.slice(8, 9);
    return isValidDNINumber(dniNumber) && isValidDNILetter(dniLetter, dniNumber);
};
var validateDNI = () => {
    var dniField = document.getElementById("dni");
    var valid = isValidDNI(dniField.value);
    if (valid) {
        dniField.classList.remove("error");
    } else {
        dniField.classList.add("error");
    }
    return valid;
};

// 4. Mobile validation.
var isValidMobile = mobile => {
    return (
        parseInt(mobile) &&
        mobile.length === 9 &&
        (mobile.startsWith(9) ||
            mobile.startsWith(8) ||
            mobile.startsWith(7) ||
            mobile.startsWith(6))
    );
};

var validateMobile = () => {
    var mobileField = document.getElementById("mobile");
    var valid = isValidMobile(mobileField.value);
    if (valid) {
        mobileField.classList.remove("error");
    } else {
        mobileField.classList.add("error");
    }
    return valid;
};

// 5. General Algorithm.

var validateForm = event => {
    event.preventDefault();
    validateFullName();
    if (validateBirthdate()) showIsAdult();
    validateDNI();
    validateMobile();
};


var validateInput = (id, validationFunction, onValidCallback) => {
    var field = document.getElementById(id);
    var valid = validationFunction(field.value);
    if (valid) {
        field.classList.remove("error");
        onValidCallback && onValidCallback();
    } else {
        field.classList.add("error");
    }
    return valid;
};

/*
var validateForm = event => {
    event.preventDefault();
    validateInput("fullName", isValidFullName);
    validateInput("birthday", isValidDate, showIsAdult);
    validateInput("dni", isValidDNI);
    validateInput("mobile", isValidMobile);
};*/
// EVENTS
document.getElementById("register").addEventListener("submit", validateForm);
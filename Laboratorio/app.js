// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;
// Entrada.
const products = [{
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

// Variables para el algoritmo que crea el html del carrito
var main = document.getElementById("product-list-container");
var productContainer;
var i = 0;

// funciones para crear el html

var ProductNumber = () => {
    var productNumber = document.createElement("sup");
    productNumber.setAttribute("class", "product-sup");
    productContainer.appendChild(productNumber);
    productNumber.innerHTML = ++i;
}

var ProductName = product => {
    var productName = document.createElement("h2");
    productName.setAttribute("class", "product-name");
    productContainer.appendChild(productName);
    productName.innerHTML = product.description;
}

var ProductPrice = product => {
    var productPrice = document.createElement("span");
    productPrice.setAttribute("class", "product-price");
    productContainer.appendChild(productPrice);
    productPrice.innerHTML = product.price + '€/ud.';
}



var ProductUnits = product => {
    var productUnits = document.createElement("input");
    productUnits.setAttribute("class", "product-unit");
    productUnits.setAttribute("id", "product-unit-" + i);
    productUnits.setAttribute("type", "number");
    productUnits.setAttribute("required", "required");
    productUnits.setAttribute("min", 0)
    productUnits.setAttribute("max", product.stock);
    productUnits.setAttribute("value", product.units);
    productUnits.addEventListener("change", event => product.units = parseInt(event.target.value));
    productContainer.appendChild(productUnits);

    var productUnitsMax = parseInt(productUnits.getAttribute('max'));  


    var checkProductsUnits = () => {   
            if(productUnits.value != 0) {
                buyButton.disabled = false;              
                if (productUnits.value > productUnitsMax) {       
                    productUnits.value = productUnitsMax;
                }     
            }else if(productUnits.value == 0){
                buyButton.disabled = 'disabled';
            }            
    }

    productUnits.addEventListener("change", checkProductsUnits)

}


// Algoritmo para crear el html

function CreateCart(products) {    
    for (product of products) {        
        productContainer = document.createElement("div");
        productContainer.setAttribute("class", "col-12 product-container");
        main.appendChild(productContainer);

        ProductNumber();
        ProductName(product);
        ProductPrice(product);
        ProductUnits(product);
    }

}

CreateCart(products);


// Variables para el algoritmo que calcular los precios del carrito

var subtotal = 0;
var taxType = 0;
var finalPrice = 0;
var buyButton = document.getElementById("buy");
var subTotalField = document.getElementById("free-taxes-price");
var taxField = document.getElementById("product-taxes");
var totalField = document.getElementById("total-price");

// Funciones para calcular precios

var CalculateProductTotalPrice = product => {
    productPrice = product.price * product.units;
    return productPrice;
}

var CalculateTaxes = product => {
    taxType += (CalculateProductTotalPrice(product) * product.tax) / 100;
    return taxType;
}

var CalculateSubtotal = product => {
    subtotal = subtotal + CalculateProductTotalPrice(product);
    return subtotal;
}

var CalculateFinalPrice = () => {
    finalPrice = subtotal + taxType;
    return finalPrice
}

// Algoritmo para calcualr precios

function CalculateCartAmount(product) {

    for (product of products) {
        CalculateSubtotal(product);
        CalculateTaxes(product);
        CalculateFinalPrice(product);
    }

    subTotalField.innerHTML = subtotal.toFixed(2) + ' €';
    taxField.innerHTML = taxType.toFixed(2) + ' €';
    totalField.innerHTML = finalPrice.toFixed(2) + ' €'

}


buyButton.addEventListener("click", () => CalculateCartAmount());
//  des éléments à appeler pour la boucle d'affchage des produits/articles Etape 8 des specifications techniques

const LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));
const PRODUCTS_URL = "http://localhost:3000/api/products/";

// Identification des balises d'affichages

const displayCard = document.getElementById("cart__items");
const displayQty = document.getElementsByClassName("itemQuantity");

//  des variables à utiliser - function displayTotal

let sumPrice = [];
let totalQuantity = [];
let firstName, lastName, address, city, email;
let article;

// l'appel de l'API pour la liste des articles

async function getArticle(productID) {
    const receiveArticles = await fetch(PRODUCTS_URL + productID)
        .then((receiveArticles) => receiveArticles.json())
        .then(function(data) {
            article = data;
        })
        .catch(function(err) {
            console.log("Error fetch" + err);
        });
    return article;
}

// Fonction affichage des produits dans le panier

async function displayBasket() {
    // Si LOCALSTORAGE est présent, on fait une boucle pour afficher les informations des produits

    if (LOCALSTORAGE !== null) {
        for (let product of LOCALSTORAGE) {
            // Recherche des informations des produits dans l'API

            const article = await getArticle(product.userProductId);


            // Assignation des appels au LOCALSTORAGE et de l'API dans des variablles 

            let productChosenId = article._id;
            let ProductChosenColor = product.userProductColor;
            let productChosenImg = article.imageUrl;
            let productChosenImgAlt = article.altTxt;
            let productChosenName = article.name;
            let productChosenPrice = article.price;
            let productChosenQuantity = product.userProductQty;

            // Création des éléments HTML pour l'affichage des produits


            const productCard = document.createElement("article");
            displayCard.appendChild(productCard);
            productCard.classList = "cart__item";
            productCard.dataset.id = productChosenId;
            productCard.dataset.color = ProductChosenColor;

            // div Image

            const productCardImgContainer = document.createElement("div");
            productCard.appendChild(productCardImgContainer);
            productCardImgContainer.classList = "cart__item__img";

            // Image

            const productCardImg = document.createElement("img");
            productCardImgContainer.appendChild(productCardImg);
            productCardImg.src = productChosenImg;
            productCardImg.alt = productChosenImgAlt;

            // div Content

            const productCardContent = document.createElement("div");
            productCard.appendChild(productCardContent);
            productCardContent.classList = "cart__item__content";

            // div Content Description

            const productCardContentDescription = document.createElement("div");
            productCardContent.appendChild(productCardContentDescription);
            productCardContentDescription.classList =
                "cart__item__content__description";

            // Titre h2 - Nom du produit

            const productCardContentName = document.createElement("h2");
            productCardContentDescription.appendChild(productCardContentName);
            productCardContentName.innerHTML = productChosenName;

            // Paragraphe - Couleur du produit

            const productCardContentColor = document.createElement("p");
            productCardContentDescription.appendChild(productCardContentColor);
            productCardContentColor.innerHTML = ProductChosenColor;

            // Paragraphe _ Prix du produit

            const productCardContentPrice = document.createElement("p");
            productCardContentDescription.appendChild(productCardContentPrice);
            productCardContentPrice.classList =
                "cart__item__content__description__price";
            productCardContentPrice.dataset.price = productChosenPrice;
            productCardContentPrice.innerHTML = productChosenPrice + " €";

            // div Content Settings

            const productCardSettings = document.createElement("div");
            productCard.appendChild(productCardSettings);
            productCardSettings.classList = "cart__item__content__settings";

            // div Content Quantity

            const productCardSettingsQuantity = document.createElement("div");
            productCardSettings.appendChild(productCardSettingsQuantity);
            productCardSettingsQuantity.classList =
                "cart__item__content__settings__quantity";

            // Paragraphe "Qté :""

            const productCardSettingsQuantityTitle = document.createElement("p");
            productCardSettingsQuantity.appendChild(productCardSettingsQuantityTitle);
            productCardSettingsQuantityTitle.textContent = "Qté : ";

            // Input Quantity

            const productCardSettingsQuantityInput = document.createElement("input");
            productCardSettingsQuantity.appendChild(productCardSettingsQuantityInput);
            productCardSettingsQuantityInput.setAttribute("type", "number");
            productCardSettingsQuantityInput.classList = "itemQuantity";
            productCardSettingsQuantityInput.setAttribute("name", "itemQuantity");
            productCardSettingsQuantityInput.setAttribute("min", "1");
            productCardSettingsQuantityInput.setAttribute("max", "100");
            productCardSettingsQuantityInput.setAttribute(
                "value",
                productChosenQuantity
            );

            // div Delete

            const productCardDeleteContainer = document.createElement("div");
            productCardSettings.appendChild(productCardDeleteContainer);
            productCardDeleteContainer.classList =
                "cart__item__content__settings__delete";

            // p delete button

            const productCardDeleteButton = document.createElement("p");
            productCardDeleteContainer.appendChild(productCardDeleteButton);
            productCardDeleteButton.classList = "deleteItem";
            productCardDeleteButton.textContent = "Supprimer";

            // Calcul totaux

            evalTotal(productChosenQuantity, productChosenPrice);
        }
    } else {
        // Message si LOCALSTORAGE est vide

        const productCardEmpty = document.createElement("p");
        displayCard.appendChild(productCardEmpty);
        productCardEmpty.textContent = "Votre panier est vide";

        const totalPriceSpan = document.getElementById("totalPrice");
        totalPriceSpan.textContent = 0;

        const totalQuantitySpan = document.getElementById("totalQuantity");
        totalQuantitySpan.textContent = 0;
    }
    changeTotal();
    removeItems();
}
displayBasket();

// Stockage du prix de chaque item en fonction de leurs quantités et stockage de la quantité

function evalTotal(Qty, Price) {
    let totalPrice = Qty * Price;
    sumPrice.push(totalPrice);

    totalQuantity.push(Number(Qty));

    displayTotal(sumPrice, totalQuantity);
}

// affichage totaux

function displayTotal(sumPrice, totalQuantity) {
    sumPrice = sumPrice.reduce((a, b) => a + b);
    totalQuantity = totalQuantity.reduce((a, b) => a + b);

    const totalPriceSpan = document.getElementById("totalPrice");
    totalPriceSpan.dataset.price = sumPrice;
    totalPriceSpan.textContent = sumPrice;

    const totalQuantitySpan = document.getElementById("totalQuantity");
    totalQuantitySpan.dataset.qty = totalQuantity;
    totalQuantitySpan.textContent = totalQuantity;
}

// changement totaux

function changeTotal() {
    //ciblage des inputs de quantité

    const inputQuantity = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < inputQuantity.length; i++) {
        let userInput = inputQuantity[i];
        const target = userInput.closest("article"); // .closest() = methode qui traverse les elements avant de trouver le noeud qui correspond al'element passe en argument
        const targetPrice = document.querySelectorAll(
            "#cart__items > article > div.cart__item__content > div > p.cart__item__content__description__price"
        );

        // Ecoute des inputs

        userInput.addEventListener("change", async function() {
            let changingProductid = target.dataset.id;
            let changingProductColor = target.dataset.color;
            let newQty = userInput.value;

            for (product of LOCALSTORAGE) {
                const article = await getArticle(product.userProductId);
                if (
                    changingProductid === product.userProductId &&
                    changingProductColor === product.userProductColor
                ) {
                    product.userProductQty = newQty;
                    if (newQty != 0) {
                        localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));

                        let sumArray = [];
                        let sumProduct = 0;

                        let qtyArray = [];

                        for (product of LOCALSTORAGE) {
                            sumProduct = article.price * product.userProductQty;
                            sumArray.push(sumProduct);
                            qtyArray.push(Number(product.userProductQty));
                        }

                        //Faire un reduce et afficher dans le dom le resultat

                        sumArray = sumArray.reduce((a, b) => a + b);
                        qtyArray = qtyArray.reduce((a, b) => a + b);

                        const totalPriceSpan = document.getElementById("totalPrice");
                        totalPriceSpan.dataset.price = sumArray;
                        totalPriceSpan.textContent = sumArray;

                        const totalQuantitySpan = document.getElementById("totalQuantity");
                        totalQuantitySpan.dataset.qty = qtyArray;
                        totalQuantitySpan.textContent = qtyArray;
                    } else if (newQty == 0) {
                        LOCALSTORAGE.splice(LOCALSTORAGE.indexOf(product), 1)
                        localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE))
                        location.reload();
                    } else {
                        alert("Votre panier est vide")
                    }
                }
            }
        });
    }
};

// Suppression d'items

function removeItems() {
    const deleteProduct = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < deleteProduct.length; i++) {
        let userInput = deleteProduct[i];
        let target = userInput.closest("article");

        deleteProduct[i].addEventListener("click", () => {
            let deleteProductid = target.dataset.id;
            let deleteProductColor = target.dataset.color;

            for (product of LOCALSTORAGE) {
                if (
                    deleteProductid === product.userProductId &&
                    deleteProductColor === product.userProductColor
                ) {
                    LOCALSTORAGE.splice(i, 1);
                    localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));
                    if (LOCALSTORAGE.length === 0) {
                        localStorage.removeItem("userProducts");
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                }
            }
        });
    }
}

// Formulaire dans Etape 10 des specifictions techniquies du Projet

function getUserForm() {
    let inputs = document.querySelectorAll("input");

    // Gestion des erreurs

    const errorDisplay = (tag, message, valid) => {
        const displayErrorMessage = document.querySelector("#" + tag + "ErrorMsg");
        if (!valid) {
            displayErrorMessage.textContent = message;
        } else {
            displayErrorMessage.textContent = "";
        }
    };

    // Validation des champs via comparaison REGEX

    const firstNameCheck = (value) => {
        if (value.length > 0 && (value.length < 2 || value.length > 20)) {
            errorDisplay(
                "firstName",
                "Le prénom doit contenir entre 2 et 20 caractères"
            );
            firstName = null;
        } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
            errorDisplay(
                "firstName",
                "Le prénom ne doit pas contenir de caractères spéciaux"
            );
            firstName = null;
        } else {
            errorDisplay("firstName", "", true);
            firstName = value;
        }
    };

    const lastNameCheck = (value) => {
        if (value.length > 0 && (value.length < 2 || value.length > 20)) {
            errorDisplay(
                "lastName",
                "Le nom de famille doit contenir entre 2 et 20 caractères"
            );
            lastName = null;
        } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
            errorDisplay(
                "lastName",
                "Le nom de famille ne doit pas contenir de caractères spéciaux"
            );
            lastName = null;
        } else {
            errorDisplay("lastName", "", true);
            lastName = value;
        }
    };

    const addressCheck = (value) => {
        if (value.length > 0 && (value.length < 2 || value.length > 50)) {
            errorDisplay(
                "address",
                "L'adresse doit contenir entre 2 et 20 caractères"
            );
            address = null;
        } else if (!value.match(
                /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/
            )) {
            errorDisplay(
                "address",
                "L'adresse doit comprendre un numéro, la voie, le nom de la voie ainsi que le code postal et la ville"
            );
            address = null;
        } else {
            errorDisplay("address", "", true);
            address = value;
        }
    };

    const cityCheck = (value) => {
        if (value.length > 0 && (value.length < 2 || value.length > 20)) {
            errorDisplay(
                "city",
                "Le nom de la ville doit contenir entre 2 et 20 caractères"
            );
            city = null;
        } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
            errorDisplay(
                "city",
                "Le nom de la ville ne doit pas contenir de caractères spéciaux"
            );
            city = null;
        } else {
            errorDisplay("city", "", true);
            city = value;
        }
    };

    const emailCheck = (value) => {
        if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
            errorDisplay("email", "Le mail n'est pas valide");
            email = null;
        } else {
            errorDisplay("email", "", true);
            email = value;
        }
    };

    // Ecoute des champs du formulaire

    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            switch (e.target.id) {
                case "firstName":
                    firstNameCheck(e.target.value);

                    break;
                case "lastName":
                    lastNameCheck(e.target.value);

                    break;
                case "address":
                    addressCheck(e.target.value);

                    break;
                case "city":
                    cityCheck(e.target.value);

                    break;
                case "email":
                    emailCheck(e.target.value);
                default:
                    null;
            }
        });
    });
}
getUserForm();

// Envoi d'une requête POST à l'API

function postFormData() {
    const orderBtn = document.getElementById("order");

    //Ecouter le bouton submit

    orderBtn.addEventListener("click", (event) => {
        event.preventDefault();

        if (LOCALSTORAGE !== null) {
            let orderProducts = [];
            for (let i = 0; i < LOCALSTORAGE.length; i++) {
                orderProducts.push(LOCALSTORAGE[i].userProductId);
            }

            // Construction de l'objet attendu par l'API

            if (firstName && lastName && address && city && email) {
                const orderUserProduct = {
                    contact: {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        city: city,
                        email: email,
                    },
                    products: orderProducts,
                };

                // Requête POST

                const results = {
                    method: "POST",
                    body: JSON.stringify(orderUserProduct),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };
                fetch("http://localhost:3000/api/products/order", results)
                    .then((res) => res.json())
                    .then((data) => {
                        // Renvoi de l'orderID dans l'URL
                        document.location.href = "confirmation.html?id=" + data.orderId;
                    })
                    .catch(function(err) {
                        console.log("Erreur fetch" + err);
                    });
            } else {
                alert("Veuillez renseigner le formulaire");
            }
        } else {
            alert("Votre Panier est vide");
        }
    });
}
postFormData();
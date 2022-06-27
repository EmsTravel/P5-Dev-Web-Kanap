//Récupération du paramètre d'identification du produit choisi dans l'adresse du navigateur

//let url = new URL(str);
//let productId = url.searchParams.get("id");
//var str = "http://localhost:3000/api/products/";
//var url = new URL(str);
//var productId = url.searchParams.get("id");
//console.log(id);



//const id = window. location. search;
//const parameters = new URLSearchParams(id);
//const productId = parameters. get('id');

//const queryString_url_id = window.location.search;
//const ProductId


let str = window.location.href;
console.log(str);
let url = new URL(str);
let productId = url.searchParams.get("id");
console.log(productId);

const PRODUCTS_URL = "http://127.0.0.1:3000/api/products/";


//Requête vers l'API pour récupérer l'objet contenant tous les produits et leurs caractèristiques. la fonction attend la requête avant de poursuivre.


function getArticle (productId)  {
   fetch(PRODUCTS_URL+ productId)
        .then((res) => res.json())
        .then((data) => {
            let article = data;
            console.log(article);


const productImg = document.createElement("img");
document.querySelector(".item__img").appendChild(productImg);
productImg.src = article.imageUrl;
productImg.alt = article.altTxt;

const productTitle = document.getElementById("title");
productTitle.innerHTML = article.name;

const productPrice = document.getElementById("price");
productPrice.innerHTML = article.price;

const productDescription = document.getElementById("description");
productDescription.innerHTML = article.description;

  //Boucle pour les couleurs disponibles du produit

for (color of article.colors) {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = color;
    productColors.innerHTML = color;
  }

        });   
       
};
getArticle(productId);

  /*  function getArticle (productId)  {
    let article = null;

    const catchArticles = fetch(PRODUCTS_URL + productId)
    .then((catchArticles) => catchArticles.json())
    .then(( (data) => {
     article = data;
      console.log(data);
    })
   .catch(function (err) {
      console.log("Error fetch" + err);
    });
    console.log(article);
  return article;
  
}*/

//Appel de la fonction de la requête et, une fois éxécutée, interprétation des données promises en Json.

/*async function displayArticle(productId) {
    console.log(productId);
  const article = await getArticle(productId);
  console.log(article);

  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  const productTitle = document.getElementById("title");
  productTitle.innerHTML = article.name;

  const productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  const productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  //Boucle pour les couleurs disponibles du produit

  for (color of article.colors) {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = color;
    productColors.innerHTML = color;
  }

  
}
displayArticle(productId);*/

function addToCart() {
    //declaration des variables

    const addButton = document.getElementById("addToCart");
    const quantity = document.getElementById("quantity");
    const color = document.getElementById("colors");

    // add event when clicking on the button 

    addButton.addEventListener("click", () => {
        if(color.value !== "" && quantity.value != 0 && quantity.value <= 100) {
            // if data is filled in = stockage donnees dans variables

            let userProductId = productId;
            let userProductColor = color.value;
            let userProductQuantity = quantity.value;

            // object creation in array

            let userProductArray = {
                userProductId: userProductId,
                userProductColor: userProductColor,
                userProductQuantity:userProductQuantity,

            };

            //Mise a disposition du localStorage
            let productLocalStorage = JSON.parse(
                localStorage.getItem("userProducts")
            );

           /* // if no LocalStorage available ( no value, no type = null)
            if(productLocalStorage == null) {
                productLocalStorage = [];
                productLocalStorage.push(userProductArray);
                localStorage.setItem(
                    "userProducts",
                    JSON.stringify(productLocalStorage)
                );
                alert ("Good,product is set");
            } else  {
                // if data exists in localStorage
                // Condition if product has the same Id and color. Method find in the localStorage and comparing with the object values (userProductArray)

             let mappingProducts = productLocalStorage.find (
                 (element) =>
                 element.userProductId === userProductId && 
                 element.userProductColor === userProductColor
             );

             // if condition returns true we add the quantity from LocalStorage 

             if(mappingProducts){
                 // incrementer la quantite

                 newQuantity = parseInt(mappingProducts.userProductQuantity) + parseInt(userProductQuantity);

                 // register in the LocalStorage

                 
          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
          alert("C'est cool, le produit est enregistré");
        } else {
          // Dans tous les autres cas, on enregistre un nouvel objet dans le localStorage

          productLocalStorage.push(userProductArray);
          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
          alert("C'est cool, le produit est enregistré");
        }
      }

      //Fin des conditions pour le localStorage
    } else {
      alert(
        "Veuillez renseigner la couleur et la quantité du produit sélectionné"
      );
    }
  });*/
addToCart();
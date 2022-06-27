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
   fetch(PRODUCTS_URL + productId)
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



addToCart();



function addToCart() {
  //Définition des champs à renseigner

  const addBtn = document.getElementById("addToCart");
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");

  // Au clic, l'évènement s'effectue si les champs sont renseignés

  addBtn.addEventListener("click", () => {
    if (color.value !== "" && quantity.value != 0 && quantity.value <= 100) {
      //Si les champs sont renseignés : stockage des données dans des variables

      let userProductId = productId;
      let userProductColor = color.value;
      let userProductQty = quantity.value;

      // Création d'un objet produit

      let userProductArray = {
        userProductId: userProductId,
        userProductColor: userProductColor,
        userProductQty: userProductQty,
      };

      // Mise à disposition du localStorage si existant

      let productLocalStorage = JSON.parse( // json.parse = transforme json en js ou en l'objet js
        localStorage.getItem("userProducts")
      );

      // Comportement si il n'y a pas de localStorage (il n'a ni valeur ni type défini : donc null)

      if (productLocalStorage == null) {
        productLocalStorage = [];
        productLocalStorage.push(userProductArray);
        localStorage.setItem(
          "userProducts",
          JSON.stringify(productLocalStorage) // convertir valeur javascript en chaine JSON avec stringify
        );
        alert("Parfait, le produit est enregistré");
      } else {
        // Comportement si il existe des données dans le localStorage

        // Condition si le produit a le même Id et la même couleur. Méthode find dans le localStorage et comparaison avec les valeurs de l'objet userProductArray

        let mappingProducts = productLocalStorage.find(
          (element) =>
          element.userProductId === userProductId &&
          element.userProductColor === userProductColor
        );

        // Si la condition est vraie on additionne la quantité de l'objet du localStorage qui répond à la condition avec celle de la page en cours et on renvoie le tout au localStorage

        if (mappingProducts) {
          // On incrémente la quantité

          newQty =
            parseInt(mappingProducts.userProductQty) + parseInt(userProductQty);
          mappingProducts.userProductQty = newQty;

          // On l'enregistre dans le localStorage

          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
          alert("bravo,le produit  est enregistré");
        } else {
          // Dans tous les autres cas, on enregistre un nouvel objet dans le localStorage

          productLocalStorage.push(userProductArray);
          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
          alert("le produit est enregistré");
        }
      }

      //Fin des conditions pour le localStorage
    } else {
      alert(
        "Veuillez renseigner la couleur et la quantité du produit sélectionné"
      );
    }
  });
}

// Requete vers l'API to recover the object with all other products and charachteristics

async function getProducts() {

const catchProducts = await fetch("http://localhost:3000/api/products/"); 
console.log(catchProducts);
return catchProducts;   


};
// turn the object in Json and make the loop to show the products

function fillProducts() {
    getProducts()
    .then(catchProducts => catchProducts.json())
    .then(function (data){
      console.log(data);
        const products = data;
        for (let product of products) {
         
// Product injection data in HTML

const productLink = document.createElement("a");
document.querySelector(".items").appendChild(productLink);
productLink.href = `../html/product.html?id=${product._id}`;

const productArticle = document.createElement("article");
productLink.appendChild(productArticle);

const productImage = document.createElement("img");
productArticle.appendChild(productImage);
productImage.src = product.imageUrl;

const productName = document.createElement("h3");
productArticle.appendChild(productName);
productName.textContent = product.name;

const productDescription = document.createElement("p"); // declaring variable and creating p element
productArticle.appendChild(productDescription);// append the object to the list of children
productDescription.textContent = product.description; // add the text 

        }
    })

// error gestion
.catch(function(err) {
console.log('Erreur fetch' + err);
})

};

// call the function 
fillProducts(); 


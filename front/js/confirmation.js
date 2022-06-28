//Récupération du numéro de commande dans l'URL

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Affichage du numéro de commande Etape 11 dans specifications techniques
const userOrderId = document.querySelector('#orderId');
userOrderId.textContent = productId;

// on supprimes des données stockées dans le localStorage
localStorage.removeItem('userProducts');
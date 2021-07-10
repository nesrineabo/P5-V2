import { furnitureManager } from "./services/FurnitureManager.js";
import { cart } from "./models/Cart.js";
import { addedToCartMessageTemplate } from "./templates/addedToCartMessageTemplate.js";

//insertion des informations du meuble passé en paramètre
export function processFurnitureInfos(product) {
  let productImage = document.querySelector(".img-left");
  let productName = document.querySelector(".right-title");
  let productPrice = document.querySelector(".right-price");
  let productDescription = document.querySelector(".right-description");

  productImage.setAttribute("src", product.image());
  productName.innerHTML = product.name();
  productPrice.innerHTML = `Prix : ${product.price()} €`;
  productDescription.innerHTML = product.description();
}

// Création des options couleurs pour le formulaire de personnalisation
export function setVarnishesOptions(product) {
  let select = document.getElementById("select-varnish");

  product.varnishes().forEach((varnish) => {
    let option = document.createElement("option");
    option.value = varnish;
    option.innerText = varnish;
    select.appendChild(option);
  });
}

// Requête http vers l'élément correspondant à l'ID donné
furnitureManager.getFurniture().then((product) => {
  processFurnitureInfos(product);
  setVarnishesOptions(product);
  activateAddToCartButtonListener(product);
});

//Au clic sur le bouton "Ajouter au panier", message d'alerte et produit ajouté au panier
export function activateAddToCartButtonListener(product) {
  let button = document.querySelector("#add-to-cart");

  button.addEventListener("click", function () {
    addedToCartMessageTemplate(); // Fonction déclarée dans le fichier addedToCartMessageTemplate.js
    cart.addToCart(product, quantityInputValue(), varnishSelectValue());
  });
}

//Récupération de l'input quantité de l'utilisateur
export function quantityInputValue() {
  return parseInt(document.querySelector("#input-quantity").value);
}

//Récupération de l'input vernis de l'utilisateur
export function varnishSelectValue() {
  return document.querySelector("#select-varnish").value;
}

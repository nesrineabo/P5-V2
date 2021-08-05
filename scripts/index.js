import { furnitureManager } from "./services/FurnitureManager.js";
import { insertFurnitureInListTemplate } from "./templates/insertFurnitureInListTemplate.js";

// Requête http vers l'Api pour récupérer les informations de tous les produits
function fetchFurnitures() {
  furnitureManager // constante créée dans le fichier furnitureManager.js
    .getFurnitures()
    .then((products) => processEachFurniture(products));
  //console.log(products);
}

// Affichage de chaque produit sous forme de liste
function processEachFurniture(products) {
  products.forEach((product) => {
    insertFurnitureInListTemplate(product); // Cette fonction est déclarée dans le fichier insertTeddyInListTemplate
  });
  //console.log(products);
}

fetchFurnitures(); // Renvoie les éléments de la fonction

//console.log(products);

import { furnitureManager } from "./furnitureManagerService.js";
import { insertFurnitureInListTemplate } from "./insertFurnitureInListTemplate.js";

// Requête http vers l'Api pour récupérer les informations de tous les produits
function fetchFurnitures() {
  furnitureManager
    .getFurnitures()
    .then((products) => processEachFurniture(products));
}

// Affichage de chaque produit sous forme de liste
function processEachFurniture(products) {
  products.forEach((product) => {
    insertFurnitureInListTemplate(product); // Cette fonction est déclarée dans le fichier insertTeddyInListTemplate
  });
}

fetchFurnitures();

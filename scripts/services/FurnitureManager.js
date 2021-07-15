import { apiClient } from "./ApiClient.js";
import { Product } from "../models/Product.js";

class FurnitureManager {
  // méthode pour récupérer les informations de tous les produits
  getFurnitures() {
    return apiClient
      .get("api/furniture/") //Récupération de cette fonction sur apiClient sous get(path) avec un fetch this.baseUrl + path => ici http://localhost:3000/ + "api/furniture/"
      .then((products) => products.map((product) => new Product(product)));
  }

  // Méthode pour récupérer les informations d'un produit selon son id
  getFurniture() {
    return apiClient
      .get(`api/furniture/${this.getFurnitureIdFromUrl()}`)
      .then((productHash) => new Product(productHash));
  }

  // Récupération de l'Id du produit depuis une query string
  getFurnitureIdFromUrl() {
    const queryString = window.location.search;
    const productId = queryString.substr(4); // ici on supprime les 4 1ers caractères de l'url cad "?=id" pour ne récupérer que l'ID
    return productId;
  }
}

export const furnitureManager = new FurnitureManager();

//console.log(furnitureManager);

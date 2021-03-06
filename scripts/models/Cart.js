import { Product } from "./Product.js";

class Cart {
  constructor() {
    this.retrieveCartContent();
  }

  // Ajout du produit au contenu du panier (cartContent)
  addToCart(product, quantity, varnish) {
    //console.log(product, quantity, varnish);
    const productAlreadyAdded = this.cartContent.find(
      (cartItem) =>
        cartItem.product._id == product._id && cartItem.varnish == varnish
    );

    //console.log(productAlreadyAdded);

    // Si le produit avec ce vernis est déjà dans le panier, on incrémente seulement la qté
    if (productAlreadyAdded) {
      productAlreadyAdded.quantity += quantity;
      console.log(quantity);
    } else {
      // si le produit n'est pas déjà dans le panier, alors on l'ajoute
      this.cartContent.push({
        product: product,
        quantity: quantity,
        varnish: varnish,
      });
      //console.log("push");
    }
    this.saveCart();

    //console.log(this.cartContent);
  }

  // Mise à jour de la qité d'un élément du panier selon l'index sélectionné
  updateCartItemQuantity(index, value) {
    if (value < 1) return;

    this.cartContent[index].quantity = value;
    this.saveCart();
  }

  //-----suppression d'un produit du panier selon l'index donné
  removeFromCart(index) {
    this.cartContent.splice(index, 1); // splice permet de modifier le contenu du tableau, ici on retire un item du panier et du localStorage pour la fonction supprimer
    this.saveCart();
  }

  //-----remise à zéro du panier (cartContent sera rendu vide)
  clearCart() {
    this.cartContent = [];
    this.saveCart();
  }

  //-----calcul du prix total d'un élément du panier en fonction de sa quantité
  cartItemTotalPrice(cartItem) {
    return cartItem.product.price() * cartItem.quantity;
  }

  //------calcul du prix total du panier (utilisation de la méthode reduce qui accumule toutes les valeurs afin de les réduire à une seule valeur)
  totalPrice() {
    return this.cartContent.reduce(
      (previousValue, cartItem) =>
        previousValue + this.cartItemTotalPrice(cartItem),
      0
    );
  }

  //Interprétation d'un panier vide (cartContent vide où sa valeur est strictement égale à 0)
  isCartEmpty() {
    return this.cartContent.length === 0;
  }

  //Récupération de l'id des produits contenus dans le panier, sous forme d'un tableau
  productIds() {
    let products = [];
    for (let cartItem of this.cartContent) {
      products.push(cartItem.product.id());
    }
    return products;
  }

  //------ La fonction retrieveCartContent permet de récupérer le contenu du panier dans un tableau, depuis le localStorage
  retrieveCartContent() {
    const jsonCart = localStorage.getItem("cart");
    this.cartContent = JSON.parse(jsonCart) || [];
    this.cartContent.forEach((cartItem) => {
      cartItem.product = new Product(cartItem.product);
    });
  }

  // On sauvegarde le contenu du panier dans le localStorage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cartContent));
  }
}

// Initialisation d'un nouvel objet panier
export const cart = new Cart();

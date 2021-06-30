import { cart } from "./cartModel.js";

// Contenu de chaque ligne de produit contenu dans le panier
export function cartItemTemplate(cartItem, index) {
  document.querySelector(".cart-item").insertAdjacentHTML(
    "beforeend",
    `   <div class="cart-remove">
            <button type="button" class="bouton remove-button-${index}" id="close-btn-mobile"><i class="fas fa-times"></i></button>
        </div>

    <div class="cart-thumbnail">
        <a href="produit.html?id=${cartItem.product.id()}">
            <img src="${cartItem.product.image()}" alt="Photo Meuble Chene">
        </a>
    </div>

    <div class="cart-description">
        <h4>${cartItem.product.name()}</h4>
        <span>${cartItem.varnish}</span>
    </div>

    <div class="cart-quantity">
        <button class="minus-btn bouton button-quantity-${index}">
            <i class="fas fa-minus"></i>
        </button>
        <span id="quantity-${index}">${cartItem.quantity}</span>
        <button class="plus-btn bouton button-quantity-${index} up">
            <i class="fas fa-plus"></i>
        </button>
    </div>

    <div class="cart-total">
    <p class="mb-2 product-price">Prix : ${cart.cartItemTotalPrice(
      cartItem
    )} €</p>
    </div>`
  );
}

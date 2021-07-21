// Template du message d'alerte "produit ajouté au panier" sur la page singleProduct

export function addedToCartMessageTemplate() {
  document.querySelector(".right").insertAdjacentHTML(
    "beforeend",
    `
    <div id="added-to-cart" class="alert-success" role="alert">
        <p class="alert-header">Produit ajouté au panier !</p>
        <a class="voir-panier" href="cart.html"><i class="fas fa-arrow-right"></i> Voir mon panier</a>
    </div>`
  );
}

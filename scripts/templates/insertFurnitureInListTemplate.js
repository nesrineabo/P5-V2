// Template de chaque article affiché sur la page d'accueil, index.html

export function insertFurnitureInListTemplate(product) {
  let productSection = document.querySelector(".products-center");
  productSection.innerHTML += `<article class="product">
    <div class="img-container" id="productImg">
        <img src="${product.image()}" alt="${product.name()}" class="product-img" />
    </div>
    <h3 id="productName">${product.name()}</h3>
    <h4 id="productPrice">${product.price()} €</h4>
    <a href="singleProduct.html?id=${product.id()}"> <button class="more-info">Plus d'informations</button></a>
</article>`;
}

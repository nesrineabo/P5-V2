import { cart } from "./cartModel.js";

export function totalPriceTemplate() {
  document.querySelector(".prixTotal-container").innerHTML = `
    <div id="prixTotal">
            <p>Total à payer : ${cart.totalPrice()} €</p>
    </div>`;
}

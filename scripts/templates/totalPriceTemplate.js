import { cart } from "../models/Cart.js";

export function totalPriceTemplate() {
  document.querySelector(".prixTotal-container").innerHTML = `
    <div id="prixTotal">
            <p>Total à payer : ${cart.totalPrice()} €</p>
    </div>`;
}

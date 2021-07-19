import { apiClient } from "./services/ApiClient.js";
import { cart } from "./models/Cart.js";
import { cartItemTemplate } from "./templates/cartItemTemplate.js";
import { totalPriceTemplate } from "./templates/totalPriceTemplate.js";

let cartItemContainer = document.querySelector(".cart-container");

//---------Affichage du contenu du panier
function renderCartContent() {
  cartItemContainer.innerHTML = "";

  cart.cartContent.forEach((cartItem, index) => {
    cartItemTemplate(cartItem, index); // Fonction déclarée dans le fichier cartItemTemplate.js
    removeButton(index);
    setQuantityInputListeners(index);

    //console.log(cartItem); // nous retourne les éléments du
  });

  displayTotalPrice();

  //Si le panier est vide, pas de formulaire et affichage de la phrase "Votre panier est vide"
  if (cart.isCartEmpty()) {
    document.querySelector("#empty-cart").classList.remove("d-none");
    document.querySelector(".customer-info").classList.add("d-none");
    document.querySelector(".prixTotal-container").classList.add("d-none");
    document.querySelector(".footer-container").classList.add("sticky-footer");
  }
}

renderCartContent();

//---- Bouton Supprimer
function removeButton(index) {
  let removeButtonIndex = document.querySelectorAll(`.remove-button-${index}`);

  removeButtonIndex.forEach((removeButton) => {
    removeButton.addEventListener("click", function () {
      cart.removeFromCart(index); // fonction suppression d'un produit du panier selon l'index donné, dans /models/Cart.js
      renderCartContent();
    });

    //console.log(removeButton); //on a vérifié que la fonction détecte bien chaque bouton supprimer
  });
}

// Écoute de la modification de la quantité d'un article (index) dans le panier
function setQuantityInputListeners(index) {
  const buttons = document.querySelectorAll(`.button-quantity-${index}`);
  buttons.forEach(function (button) {
    button.addEventListener("click", () => quantityInputChanged(index, button));
  });

  //console.log(buttons);
}

//Modification de la quantité d'un article dans le panier
function quantityInputChanged(index, button) {
  const previousQuantity = cart.cartContent[index].quantity;
  const desiredUpdate = button.classList.contains("up") ? 1 : -1;
  const newValue = previousQuantity + desiredUpdate;

  cart.updateCartItemQuantity(index, newValue);
  renderCartContent();
}

//-----Affichage du prix total du panier s'il n'est pas vide
function displayTotalPrice() {
  let totalPriceBloc = document.querySelector(".prixTotal-container");

  if (cart.isCartEmpty()) {
    return (totalPriceBloc.innerHTML = "");
  } else {
    totalPriceTemplate(); // Cette fonction est déclarée dans le fichier du même nom
  }

  console.log(totalPriceBloc);
}

//-----Formulaire de validation de la commande
let orderForm = document.querySelector("#orderForm");

//-----Évènement où on écoute la modification de l'email de l'utilisateur
orderForm.email.addEventListener("change", function () {
  validEmail(this);
});

function validEmail(inputEmail) {
  //---Création de la regex pour la validation de l'email
  let emailRegexp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

  //----Test de la RegEx
  let smallDiv = inputEmail.nextElementSibling;
  if (emailRegexp.test(inputEmail.value)) {
    smallDiv.innerHTML = "Adresse valide";
    smallDiv.classList.remove("text-danger");
    smallDiv.classList.add("text-success");
    return true;
  } else {
    smallDiv.innerHTML = "Adresse non valide";
    smallDiv.classList.remove("text-success");
    smallDiv.classList.add("text-danger");
    return false;
  }
}

//-----Écoute de l'envoi / validation du formulaire
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  function validField() {
    //-----Vérification de la présence de tous les champs requis
    const fieldsToCheck = ["lastName", "firstName", "email", "address", "city"];
    let areAllFieldsValid = true;
    for (let field of fieldsToCheck) {
      let fieldElement = document.querySelector(`#${field}`);
      let fieldErrorElement = document.querySelector(`.${field}-error`);

      //-----vérification du remplissage des champs requis
      if (!fieldElement.value) {
        fieldErrorElement.innerHTML = "Veuillez renseigner ce champ";
        fieldErrorElement.classList.add("text-danger");
        areAllFieldsValid = false;
      } else if (fieldElement.value.length < 2) {
        fieldErrorElement.innerHTML =
          "Ce champ doit contenir au moins 2 lettres";
        fieldErrorElement.classList.add("text-danger");
        areAllFieldsValid = false;
      } else {
        fieldErrorElement.innerHTML = "";
        fieldErrorElement.classList.remove("text-danger");
      }
    }
    return areAllFieldsValid;
  }

  //si tous les champs sont valides, envoi des données du formulaire au serveur
  if (validField() && validEmail(orderForm.email)) {
    sendOrderForm();
  }
});

// Requête post pour l'envoi des données du formulaire au serveur
function sendOrderForm() {
  let orderData = {
    contact: {
      lastName: document.querySelector("#lastName").value,
      firstName: document.querySelector("#firstName").value,
      email: document.querySelector("#email").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
    },
    products: cart.productIds(),
  };

  apiClient
    .createOrder(orderData)

    .then(function (response) {
      let orderInfos = {
        userName: orderData.contact.firstName,
        totalPrice: cart.totalPrice(),
        orderId: response.orderId,
      };
      //stockage des données de la commande dans le localStorage
      sessionStorage.setItem("orderInfos", JSON.stringify(orderInfos));
      //vidage du panier lorsqu'une commande est validée
      cart.clearCart();
      window.location.replace("./orderConfirmed.html");
    });
}

class ApiClient {
  constructor() {
    this.baseUrl = "http://localhost:3000/";
  }

  // Méthode pour récupérer le lien vers l'Api. Il est général, ce qui permet seulement de modifier le "path" ici en furniture

  get(path) {
    return fetch(this.baseUrl + path)
      .then((response) => response.json())
      .catch(() => alert("Impossible de récupérer les données de l'Api"));
  }

  // Méthode d'envoi des données du formulaire + création d'une nvelle commande
  post(path, body) {
    return fetch(this.baseUrl + path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  // Méthode pour la création et l'envoi de la commande
  createOrder(orderData) {
    return this.post("api/furniture/order", orderData).catch(() =>
      alert("Impossible de créer la commande")
    );
  }
}

export const apiClient = new ApiClient();

//console.log(apiClient); //--- retourne la baseUrl : http://localhost:3000/ ---

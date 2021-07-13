//Récupération des infos de la commande confirmée, sotckées dans le localStorage
const jsonOrderInfos = sessionStorage.getItem("orderInfos");
const orderInfos = JSON.parse(jsonOrderInfos);

document.querySelector("#confirmation-text").innerHTML = `
<p>Votre commande est validée <span class="username">${orderInfos.userName}</span>!</p><br />
<p>Notre équipe va traiter votre commande dans les plus brefs délais.</p><br />
<p>Nous vous remercions pour votre confiance !<br /><br />

<p>Vous trouverez ci-dessous le récapitulatif de votre commande :</p><br />
<p class="bold"><ins>N° de commande</ins> : ${orderInfos.orderId}</p>
<p class="bold"><ins>Prix total TTC</ins> : ${orderInfos.totalPrice} €</p>
`;

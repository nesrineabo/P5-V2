//Récupération des infos de la commande confirmée, sotckées dans le localStorage
const jsonOrderInfos = sessionStorage.getItem("orderInfos");
const orderInfos = JSON.parse(jsonOrderInfos);

document.querySelector("#confirmation-text").innerHTML = `
<p>Bonjour ${orderInfos.userName},</p>
<p>Commande validée ! Nous vous remercions pour votre commande !</p><br /><br />

<p>Vous trouverez ci-dessous le récapitulatif de votre commande :</p>
<p class="font-weight-bold"><ins>N° de commande</ins> : ${orderInfos.orderId}</p>
<p class="font-weight-bold"><ins>Prix total TTC</ins> : ${orderInfos.totalPrice} €</p>
`;

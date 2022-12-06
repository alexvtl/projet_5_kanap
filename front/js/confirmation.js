//on récupere l'URL qui contient le numéro de commande('orderId')
// on affiche le numero de commande dans le code HTML et on vide le panier du local storage
const str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get('id');

let baliseIdorder = document.getElementById('orderId')

baliseIdorder.innerHTML = id;
baliseIdorder.style.fontWeight = "bold";

localStorage.clear();

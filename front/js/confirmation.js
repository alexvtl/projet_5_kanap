const str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get('id');

let baliseIdorder = document.getElementById('orderId')

baliseIdorder.innerHTML = id;
baliseIdorder.style.fontWeight = "bold"

console.log(localStorage.getItem('panier'))
let cart = JSON.parse(localStorage.getItem('panier'))
console.log(cart)

let baliseItems = document.getElementById('cart__items')
let totalCart = 0;
let totalQuantity = 0;

for(let product of cart){

 let URL = 'http://localhost:3000/api/products/'
 console.log(product)

fetch( URL + product.id)
.then( function(res){
    if(res.ok){
        return res.json()}
})
.then( function(value){
    let affichage = ''
     affichage += `
     <article class="cart__item" data-id="${value._id}" data-color="${product.color}">
     <div class="cart__item__img">
     <img src=${value.imageUrl} alt=${value.altTxt}>
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>${value.name}</h2>
       <p>${product.color}</p>
       <p>${value.price} €</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>`
    baliseItems.innerHTML += affichage;


// quantité total du panier
    let baliseTotalQuantity = document.getElementById('totalQuantity')
    totalQuantity += parseInt(product.quantity)
    baliseTotalQuantity.innerHTML = totalQuantity;

// Montant total du panier
    let montantArticle = (product.quantity*value.price)
    totalCart += montantArticle
    let totalPrice = document.getElementById('totalPrice')
    totalPrice.innerHTML = totalCart;

//actualisation du changement de la quantité(prise en cpte de l'id et couleur sur le pdt)

  function modifQuantity() {
    const itemsQuantity = document.querySelectorAll(".itemQuantity");
  
    itemsQuantity.forEach((itemQuantity) => {

      itemQuantity.addEventListener("change", () => {

        const newQuantity = Number(itemQuantity.value);
        itemQuantity.textContent = newQuantity;
        let kanap = itemQuantity.closest("article");
        console.log(kanap)
        let cart = JSON.parse(localStorage.getItem("panier"));
        let getId = kanap.getAttribute("data-id"); 
        console.log(getId);
        let getColor = kanap.getAttribute("data-color"); 
        console.log(getColor)
        for (let index = 0; index < cart.length; index++) {

          const productLocalS = cart[index];
          if (getId === productLocalS.id && getColor === productLocalS.color) {

            if(newQuantity <= 100 && newQuantity > 0){ 
            productLocalS.quantity = newQuantity;
            localStorage.setItem("panier", JSON.stringify(cart))
            window.location.reload();
            
            }else if(newQuantity==0){
              removeItem(getId,getColor)
            }else{
              alert('Veuillez choisir une quantité entre 0 et 100')
              window.location.reload();
            }
          }
        }
      });
    });
  }

  modifQuantity();

// click bouton supprimer prend l'id et la color de la balise article le plus proche
    let balisesDelete = document.querySelectorAll('.deleteItem');
    balisesDelete.forEach((baliseDelete) => {
      baliseDelete.addEventListener('click', () => {
        let produitsàSuprimer = baliseDelete.closest('article');
        console.log(produitsàSuprimer)
         getId = produitsàSuprimer.getAttribute("data-id");
        console.log(getId)
        getColor = produitsàSuprimer.getAttribute("data-color");
        console.log(getColor)
        removeItem(getId,getColor)
        })
      })
// et réactualise le localstorage avec les produits restants avec la fonction removeItem
    function removeItem(getId,getColor){
        let cart = JSON.parse(localStorage.getItem("panier"));
        let NewCart = cart.filter((article) =>
        (article.id !== getId && article.color !== getColor) || (article.id === getId && article.color !== getColor));
        localStorage.setItem('panier',JSON.stringify(NewCart))
        window.location.reload();
    }



})
}






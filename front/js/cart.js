console.log(localStorage.getItem('panier'))
let cart = JSON.parse(localStorage.getItem('panier'))
console.log(cart)

let baliseItems = document.getElementById('cart__items')
let totalCart = 0;
let totalQuantity = 0;

if(cart == null){
  baliseItems.innerHTML = 'Votre panier est vide'
  baliseItems.style.backgroundColor = "red"
  baliseItems.style.textAlign="center"
}else if(cart.length>0){
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
}else{
  baliseItems.innerHTML = 'Votre panier est vide'
  baliseItems.style.backgroundColor = "red"
  baliseItems.style.textAlign="center"
}

// récupération panier final 
if(cart){
  let finalCart = [];
 cart = JSON.parse(localStorage.getItem('panier'))
for(let product of cart){
  finalCart.push(product.id)
}
 }

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");

// variable formulaire
let formulaire = document.querySelector(".cart__order__form");
// variable bouton order
let btnOrder = document.getElementById('order');

// création de regex  
formulaire.firstName.addEventListener('change', function(){
  validfirstName(this);
})

function validfirstName(input){
  firstNameRegex = new RegExp(/^[A-Za-zéèêëàçâ-]{3,30}$/)

  let testfirstname = firstNameRegex.test(input.value)
    if(testfirstname){
      firstNameErrorMsg.innerHTML="saisie enregistrée"
      firstNameErrorMsg.style.color="green"
      return true
    }else{
      firstNameErrorMsg.innerHTML= "Veuillez renseigner un prénom valide !"
      firstNameErrorMsg.style.color="red"
      return false
    }
}

formulaire.lastName.addEventListener('change', function(){
  validlastName(this);
})

function validlastName(input){
  lastNameRegex = new RegExp(/^[A-Za-zéèêëàçâ-]{3,30}$/)

  let testLastName = lastNameRegex.test(input.value)
    if(testLastName){
      lastNameErrorMsg.innerHTML="saisie enregistrée"
      lastNameErrorMsg.style.color="green"
      return true
    }else{
      lastNameErrorMsg.innerHTML= "Veuillez renseigner un nom valide !"
      lastNameErrorMsg.style.color="red"
      return false
    }
}

formulaire.address.addEventListener('change', function(){
  validAddress(this);
})

function validAddress(input){
  addressRegex = new RegExp(/^[a-zA-Zçéèêôùïâàû0-9\s, '-]{3,60}$/)

  let testAddress = addressRegex.test(input.value)
    if(testAddress){
      addressErrorMsg.innerHTML="saisie enregistrée"
      addressErrorMsg.style.color="green"
      return true
    }else{
      addressErrorMsg.innerHTML= "Veuillez renseigner une adresse valide !"
      addressErrorMsg.style.color="red"
      return false
    }
}

formulaire.city.addEventListener('change', function(){
  validCity(this);
})

function validCity(input){
  cityRegex = new RegExp(/^[a-zA-Zçéèêôùïâàû\s, '-]{3,60}$/)

  let testCity = cityRegex.test(input.value)
    if(testCity){
      cityErrorMsg.innerHTML="saisie enregistrée"
      cityErrorMsg.style.color="green"
      return true
    }else{
      cityErrorMsg.innerHTML= "Veuillez renseigner une ville valide !"
      cityErrorMsg.style.color="red" 
      return false
    }
}

formulaire.email.addEventListener('change', function(){
  validEmail(this);
})

function validEmail(input){
  emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

  let testEmail = emailRegex.test(input.value)
    if(testEmail){
      emailErrorMsg.innerHTML="saisie enregistrée"
      emailErrorMsg.style.color="green"
      return true
    }else{
      emailErrorMsg.innerHTML= "Veuillez renseigner une adresse mail valide !"
      emailErrorMsg.style.color="red"
      return false
    }
}

btnOrder.addEventListener('click',function(event){
  // confirmation formulaire et panier rempli
  if(validfirstName(formulaire.firstName) && validlastName(formulaire.lastName) && validAddress(formulaire.address) && validCity(formulaire.city) && validEmail(formulaire.email)){
    if(cart == null){
      alert('Votre panier est vide, Sélectionné des articles et ainsi finaliser votre commande')
      event.preventDefault(event)
    }else if(cart>0){
    contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
    };
    send();
    }else{
      alert('Votre panier est vide, Sélectionné des articles et ainsi finaliser votre commande')
      event.preventDefault(event)
  }}else{
    event.preventDefault(event)
  }
})

function send(){

  fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: { 
  'Accept': 'application/json', 
  'Content-Type': 'application/json' 
  },
    body: JSON.stringify({contact,
      products: finalCart}),
  })
  .then((res)=> res.json())
  .then((value)=> {
    const idOrder = value.orderId
    if(idOrder!==""){
    document.location.href=`./confirmation.html?id=${idOrder}`;
    }else{
      alert('Erreur Serveur le numéro de commande ne peut pas être généré')
    }
  })
}
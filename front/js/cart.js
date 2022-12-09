// on récupere la tableau 'panier du local strorage'
let cart = JSON.parse(localStorage.getItem('panier'))

let baliseItems = document.getElementById('cart__items')
let totalCart = 0;
let totalQuantity = 0;
//Si le localstorage('panier) n'existe pas, un message que le panier est vide est affiché
if(!cart){
  baliseItems.innerHTML = 'Votre panier est vide, Veuillez sélectionner des articles'
  baliseItems.style.backgroundColor = "red"
  baliseItems.style.textAlign="center"
// si le localstorage existe, pour chaque article du panier dans le localstorage 
//on récupère les caractéristiques de l'article avec une requête fetch en utlisant l'url de l'api +l'id du produit
}else if(cart.length>0){
for(let product of cart){

 let URL = 'http://localhost:3000/api/products/'

fetch( URL + product.id)
.then( function(res){
    if(res.ok){
        return res.json()}
})
// si la requête s'est bien passée on ajoute notre balise article avec les caractéristique de l'article à la balise parent 'cart__items'
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

//actualisation de la quantité (prise en compte de l'id et couleur sur le produit)
  function modifQuantity() {
    const itemsQuantity = document.querySelectorAll(".itemQuantity");
  
    itemsQuantity.forEach((itemQuantity) => {
//lorsque la quantité est changé sur la page panier on récupere l'id et la couleur de larticle le plus proche avec .closest et 
// on modifie la quantité dans le localstorage par la nouvelle quantitée.
      itemQuantity.addEventListener("change", () => {

        const newQuantity = Number(itemQuantity.value);
        itemQuantity.textContent = newQuantity;
        let kanap = itemQuantity.closest("article");
        let cart = JSON.parse(localStorage.getItem("panier"));
        let getId = kanap.getAttribute("data-id"); 
        let getColor = kanap.getAttribute("data-color"); 

        for (let index = 0; index < cart.length; index++) {

          let productLocalS = cart[index];
          if (getId === productLocalS.id && getColor === productLocalS.color) {

            if(newQuantity <= 100 && newQuantity > 0){ 
            productLocalS.quantity = newQuantity;
            localStorage.setItem("panier", JSON.stringify(cart))
            window.location.reload();
//si la nouvelle quantité est de 0 alors l'article en question est supprimé avec la fonction removeItem()
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

// cliquer sur le bouton supprimer prend l'id et la color de la balise de l'article le plus proche et le supprime du panier
    let balisesDelete = document.querySelectorAll('.deleteItem');
    balisesDelete.forEach((baliseDelete) => {
      baliseDelete.addEventListener('click', () => {
        let produitsàSuprimer = baliseDelete.closest('article');      
        getId = produitsàSuprimer.getAttribute("data-id");
        getColor = produitsàSuprimer.getAttribute("data-color");
        removeItem(getId,getColor)
        })
      })
// fonction removeItem réactualise le localstorage avec les produits restants
    function removeItem(getId,getColor){
        let cart = JSON.parse(localStorage.getItem("panier"));
        let NewCart = cart.filter((article) =>
        (article.id !== getId && article.color !== getColor) || (article.id === getId && article.color !== getColor));
        localStorage.setItem('panier',JSON.stringify(NewCart))
        window.location.reload();
    }

})
}
// si la panier du local storage est vide aprés qu'un élément a été supprimé, le panier est supprimé du localstorage
}else{
  baliseItems.innerHTML = 'Votre panier est vide'
  baliseItems.style.backgroundColor = "red"
  baliseItems.style.textAlign="center"
  localStorage.removeItem('panier')
}

// récupération panier final  avec seulement l'id des articles
let finalCartId = [];
 cart = JSON.parse(localStorage.getItem('panier'))
for(let product of cart){
  finalCartId.push(product.id)
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
// Vérification du texte saisi par l'utilisateur s'il rentre dans les critères du regex true sera renvoyé avec un message positif
//sinon un message d'erreur est affiché et false est renvoyé
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
//lorsque l'utilisateur clique sur le bouton commander ...
btnOrder.addEventListener('click',function(event){
  event.preventDefault(event)
  // confirmation formulaire et panier rempli sinon le bouton est désactivé
  if(validfirstName(formulaire.firstName) && validlastName(formulaire.lastName) && validAddress(formulaire.address) && validCity(formulaire.city) && validEmail(formulaire.email)){
 // l'objet contact est crée avec les informations du client
      contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
      };
      send();
  }else{
    event.preventDefault(event)
  }
})

// fonction send qui creer une requête POST pour l'envoi de l'objet contact en JSON ainsi que tableau finalcartId qui contient l'id des produits et
// l'utilisteur est redirigé à la page confirmation
function send(){
        fetch('http://localhost:3000/api/products/order', {
          method: "POST",
          headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
          body: JSON.stringify({contact,
            products: finalCartId}),
        })
        .then((res)=> {return res.json()})
        .then((value)=> {
          const idOrder = value.orderId
          location.href=`./confirmation.html?id=${idOrder}`;
        })}
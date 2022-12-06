// récupération de l'url de la page actuelle
const str = window.location.href;
let url = new URL(str);
// on récupère l'id de l'url précédente
let id = url.searchParams.get('id');
// récupèration nos differentes balises de notre code HTML
const baliseimg = document.querySelector('.item__img');
const balisetitle = document.querySelector('#title');
const baliseprice = document.querySelector('#price');
const balisedescription = document.querySelector('#description');
const balisecolors = document.querySelector('#colors');
const balisequantity = document.querySelector('#quantity');
// requête auprés de l'api pour récupérer nos produits et leurs caratéristiques
fetch('http://localhost:3000/api/products')
.then( async function(res){
    if(res.ok){
        return res.json()}
})
// après avoir vérifier que la requête s'est bien passée on appelle une fonction qui compare l'id pour chaque article avec l'id de notre URL
// et ainsi  ajouter à nos balises HTML les caratéristiques de l'article en question.
.then( function(value){
    for (kanap of value){
    
        if(id==kanap._id){
    
        baliseimg.innerHTML = `<img src=${kanap.imageUrl} alt=${kanap.altTxt}>`
        balisetitle.innerHTML=`${kanap.name}`
        baliseprice.innerHTML=`${kanap.price}`
        balisedescription.innerHTML=`${kanap.description}`

        let colors = kanap.colors;

        let affichage ='';

        for(let color of colors){
    
            affichage += `<option value= ${color}>${color}</option>` 
        }
        balisecolors.insertAdjacentHTML("beforeend",affichage);
        }
    }
  }
)
//En cas d'erreur de la requête un message d'alerte est envoyé sur notre page
.catch(function(err) {
    alert('Erreur Promise')
   })
// récupération de notre bouton panier
const boutonpanier = document.querySelector('#addToCart');

// Lorsque que le client clique sur le bouton panier la fonction addCart est appelée..
boutonpanier.addEventListener('click', function addCart(){
// on récupere la couleur et la quantité indiquées par le client 
    let chooseColor = balisecolors.value
    let chooseQuantity = balisequantity.value
// création de la class kanappanier qui regroupe l'id , la couleur et la quantité  de l'objet
    class kanappanier {
        constructor(id,color,quantity){
            this.id = id;
            this.color = color;
            this.quantity = quantity;
        }
    }
//création de l'objet mykanap qui regroupe l'id du produit, la couleur et la quantité sélectionnés par le client
    let mykanap = new kanappanier(`${id}`,`${chooseColor}`,`${chooseQuantity}`);
// création variable qui correspond à l'élement 'panier' du localStorage en étant parsé  
    let panierEnr = JSON.parse(localStorage.getItem('panier'));
//Vérification que le client a bien indiqué une couleur et une quantité entre 0 et 100
    if(chooseColor != "" && chooseQuantity > 0 && chooseQuantity <= 100){
// si la variable, donc l'element 'panier' existe dans le localstorage alors..
        if(panierEnr){
// on récupere dans un tableau pour chaque objet de notre tableau 'panierEnr' son id et sa couleur  avec la fonction map
            const idcolorenregistrés = panierEnr.map((article) => article.id + article.color)
// la fonction findIndex permet de récupéré l'index qui correspond à l'id actuel et la coleur du produit sélectionné par le client              
                let foundProductIndex = idcolorenregistrés.findIndex(element => element == id + mykanap.color)
// si l'index est supérieur ou égal à 0 veut dire que le client veut rajouter au panier un article avec la même couleur déja sélectionné dans son panier
                if(foundProductIndex >= 0){
// si c'est le cas on ajoute la quantité sélectioonnée à la quantité déjà presente dans le panier
                    let addquantity = parseInt(panierEnr[foundProductIndex].quantity)+ parseInt(mykanap.quantity)
                    panierEnr[foundProductIndex].quantity = JSON.stringify(addquantity)
                    localStorage.setItem('panier', JSON.stringify(panierEnr))
// Sinon on ajoute l'artcile sélectinné au panier
                }else{
                    panierEnr.push(mykanap)
                    localStorage.setItem('panier', JSON.stringify(panierEnr))
                }
// Si panierEnr n'existe pas on ajoute l'article au tableau et on créer notre élément et notre panier(tableau) dans le localStorage en JSON
        }else{
            panierEnr = [];
            panierEnr.push(mykanap)
            localStorage.setItem('panier',JSON.stringify(panierEnr))
        }
//message d'erreur si le client n'a pas indiqué une quantité entre 0 et 100 et ou une couleur
    }else{
        alert('Veuillez choisir une couleur et une quantité entre 0 et 100')
    }
})

const str = window.location.href;


let url = new URL(str);

let id = url.searchParams.get('id');


const baliseimg = document.querySelector('.item__img');
const balisetitle = document.querySelector('#title');
const baliseprice = document.querySelector('#price');
const balisedescription = document.querySelector('#description');
const balisecolors = document.querySelector('#colors');
const balisequantity = document.querySelector('#quantity');

fetch('http://localhost:3000/api/products')
.then( async function(res){
    if(res.ok){
        return res.json()}
})
.then( function(value){
    for (kanap of value){
    

        if(id===kanap._id){
    
        
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
.catch(function(err) {
   })


const boutonpanier = document.querySelector('#addToCart');

boutonpanier.addEventListener('click', function(x){

    let chooseColor = balisecolors.value
    let chooseQuantity = balisequantity.value

    class kanappanier {
        constructor(id,color,quantity){
            this.id = id;
            this.color = color;
            this.quantity = quantity;
        }
    }

    let mykanap = new kanappanier(`${id}`,`${chooseColor}`,`${chooseQuantity}`);
    
    let panierEnr = JSON.parse(localStorage.getItem('panier'));

   if(panierEnr){
    const idcolorenregistrés = panierEnr.map((article) => article.id + article.color)

    for( let i of idcolorenregistrés){
        
        let foundProductIndex = idcolorenregistrés.findIndex(element => element == id + mykanap.color)
        console.log(foundProductIndex)

        if(foundProductIndex >= 0){
            let addquantity = parseInt(panierEnr[foundProductIndex].quantity)+ parseInt(mykanap.quantity)
            panierEnr[foundProductIndex].quantity = JSON.stringify(addquantity)
            localStorage.setItem('panier', JSON.stringify(panierEnr))
            return
        }else{
            panierEnr.push(mykanap)
            localStorage.setItem('panier', JSON.stringify(panierEnr))
            return
        }
    }

   }else{
    panierEnr = [];
    panierEnr.push(mykanap)
    localStorage.setItem('panier',JSON.stringify(panierEnr))
   }


})

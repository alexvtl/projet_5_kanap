const str = window.location.href;
console.log(str);

let url = new URL(str);

let id = url.searchParams.get('id');
console.log(id);

const baliseimg = document.querySelector('.item__img');
const balisetitle = document.querySelector('#title');
const baliseprice = document.querySelector('#price');
const balisedescription = document.querySelector('#description');
const balisecolors = document.querySelector('#colors');

fetch('http://localhost:3000/api/products')
.then( async function(res){
    if(res.ok){
        return res.json()}
})
.then( function(value){
    for (kanap of value){
        console.log(kanap._id)

        if(id===kanap._id){
        console.log(kanap)
        
        baliseimg.innerHTML = `<img src=${kanap.imageUrl} alt=${kanap.altTxt}>`
        balisetitle.innerHTML=`${kanap.name}`
        baliseprice.innerHTML=`${kanap.price}`
        balisedescription.innerHTML=`${kanap.description}`

        console.log(kanap.colors)
        let colors = kanap.colors;

        let affichage ='';

        for(let color of colors){
            console.log(color)
            affichage += `<option value= ${color}>${color}</option>` 
        }
        balisecolors.insertAdjacentHTML("beforeend",affichage);
        }
    }
  }
)
.catch(function(err) {
   
})
let items = document.getElementById('items')

function createkanap(kanap){
  let newA = document.createElement('a');
  newA.setAttribute('href',`./product.html?id=${kanap._id}`)
  newA.innerHTML = `
  <article>
  <img src=${kanap.imageUrl} alt=${kanap.altTxt}>
  <h3 class="productName">${kanap.name}</h3>
  <p class="productDescription">${kanap.description}</p>
  </article>`
  return newA
}


fetch('http://localhost:3000/api/products')
.then( async function(res){
    if(res.ok){
        return res.json()}
})
.then( function(value){
    console.log(value)
  for(let article of value){
    console.log(article)
    items.append(createkanap(article))
  }
   }
)
.catch(function(err) {
    items.style.backgroundColor="red"
   items.innerHTML="Impossible de charger les produits"
})
// je récupère ma balise avec l'ID('items')
let items = document.getElementById('items')
// Création d'une fonction qui crée une balise lien avec un code HTML qui contient les caractéristiques du kanapé
function createkanap(kanap){
  let newArticle = document.createElement('a');
  newArticle.setAttribute('href',`./product.html?id=${kanap._id}`)
  newArticle.innerHTML = `
  <article>
  <img src=${kanap.imageUrl} alt=${kanap.altTxt}>
  <h3 class="productName">${kanap.name}</h3>
  <p class="productDescription">${kanap.description}</p>
  </article>`
  return newArticle
}
// requête aupres de l'API pour récupérer tous les produits
fetch('http://localhost:3000/api/products')
.then(function(res){
// vérification que la requête s'est bien passée avec res.ok
    if(res.ok){
        return res.json()}
})
// création d'une fonction qui va, pour chaque article de notre promise, créer une balise lien enfant avec la fonction createkanap() et l'ajouter à la balise parent ('items)
.then( function(value){
  for(let article of value){
    items.append(createkanap(article))
  }
   }
)
//Si la requête n'est pas obtenue la fonction catch est appelée et affichera un message d'erreur sur notre page
.catch(function(err) {
    items.style.backgroundColor="red"
   items.innerHTML="Impossible de charger les produits"
})
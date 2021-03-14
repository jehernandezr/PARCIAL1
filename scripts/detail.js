const element = JSON.parse(localStorage.getItem("seleccionado"));
const data = JSON.parse(localStorage.getItem("productos"));
function formatCurrency(locales, currency, fractionDigits, number) {
  let formatted = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
  }).format(number);
  return formatted;
}
function loadDetail() {
  const oldCard =document.querySelector(".card-large");
  let image = element.picture;
  let id = element.id;
  let title = element.title;
  let price = formatCurrency(
    "es-AR",
    element.price.currency,
    2,
    element.price.amount,
  );
  let description= element.description;
  let units = element.sold_quantity;
  let condition = element.condition;
  
  //verifico si el seleccionado es un favorito
  let stor=localStorage.getItem("favoritos");
  let favs= stor? JSON.parse(stor):[];
  hay=favs.find((e)=>{return e.id===element.id;});
  if(hay!==undefined  ) {

    oldCard.children[1].children[4].innerHTML="Quitar de favoritos";
    
  }


  create_elementDetail(id,title,description,units,condition,price,image,oldCard);    
  modifybreadcum(element.categories);
  

}

function create_elementDetail(id,title,description,units,condition,price,image,oldCard) {
  let Newcard = oldCard.cloneNode(true);
  Newcard.setAttribute("id",id);
  img=Newcard.children[0].children[0];
  img.setAttribute("src",image);
  uni_usad= Newcard.children[1].children[0];
  uni_usad.innerHTML=condition+ " | "+units+"  Vendidos";
  title_t=Newcard.children[1].children[1];
  title_t.innerHTML=title.substr(0,24);
  money=Newcard.children[1].children[2];
  money.innerHTML=price;
  desc_par=Newcard.children[2].children[1];
  desc_par.innerHTML=description;
  if (description.length>1510) {
    Newcard.setAttribute("class",Newcard.getAttribute("class")+" card-xtra-l");
  
  }
  if (description.length>1910) {
    Newcard.setAttribute("class",Newcard.getAttribute("class")+" card-xtra-xx-l");
  
  }
  
  oldCard.parentNode.replaceChild(Newcard,oldCard);


}

function modifybreadcum(categories) {
  lista=document.querySelector("ul.breadcrumb");
  for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    li=document.createElement("li");
    cate=document.createElement("a");
    cate.innerHTML=element;
    li.appendChild(cate);
    lista.appendChild(li);
  }

}
function search() {
  buscar= document.querySelector(".form")[0].value;
  encontrados= data.filter((element)=>{return(element.categories.includes(buscar));});
  localStorage.setItem("buscados",JSON.stringify(encontrados));
  localStorage.removeItem("seleccionado");
  window.location="/busqueda.html";
}

loadDetail();

function listfav() {
  window.location="/favorito.html";
  
}

function add_to_fav(este) {

  original=este;
  este=este.parentNode.parentNode;
  let stor=localStorage.getItem("favoritos");
  let favs= stor? JSON.parse(stor):[];
  hay=favs.find((e)=>{return e.id===este.id;});
  if(!hay) {
    favs.push(element);
    localStorage.setItem("favoritos",JSON.stringify(favs));
    original.innerHTML="Quitar de favoritos";
  }
  else{
    favs.splice(favs.indexOf(hay),1);
    original.innerHTML="Quitar de favoritos";
    localStorage.setItem("favoritos",JSON.stringify(favs));
    if (favs.length==0) { localStorage.removeItem("favoritos");}
    original.innerHTML="Añadir a favoritos";
  }
}


function buyme() {
  document.getElementsByClassName("fondo_transparente")[0].style.display="block" ;
}
document.getElementById("closemodal").addEventListener("click",function() {
  document.getElementsByClassName("fondo_transparente")[0].style.display="none"; 
});

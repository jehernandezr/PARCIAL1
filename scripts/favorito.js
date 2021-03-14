
function formatCurrency(locales, currency, fractionDigits, number) {
  let formatted = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
  }).format(number);
  return formatted;
}
function loadFavs() {

  let stor=localStorage.getItem("favoritos");
  let favs= stor? JSON.parse(stor):[];
  if (favs.length>0) {
    favs.forEach((element) => {
      let image = element.picture;
      let id = element.id;
      let title = element.title;
      let price = formatCurrency(
        "es-AR",
        element.price.currency,
        2,
        element.price.amount,
      );
      let is_freeShipping = element.free_shipping;
      let old_card=document.querySelector(".card");
      let Newcard = old_card.cloneNode(true);
      crear_elements(id,image,price,title,is_freeShipping,Newcard);    
    });
    
    document.getElementById("favs").removeChild(document.getElementsByClassName("card")[0]);
    

  }

  
  
}
 
let cuentaCheked=0; 
function cambiarColor(input) {
  let btn= document.getElementById("bt-del");
  if (input.checked) {
    cuentaCheked=cuentaCheked+1;
    btn.setAttribute("class", "bton-activ" );
  }
  else{
    cuentaCheked=cuentaCheked-1;
    if(cuentaCheked==0) {
      btn.setAttribute("class", "bton-desable" );}
    
  }
  
  
}
function crear_elements (id,image, price,title,is_freeShipping, new_card) {
  card_image=new_card.children[1];
  box=new_card.children[0];
  card_content= new_card.children[2];
  img=card_image.children[0];
  price_span=card_content.children[0];
  img_shiping=price_span.children[0];
  model=card_content.children[2];
    
  new_card.setAttribute("id",id );
  img.setAttribute("src",image);
  price_span.innerHTML=price;
  if(is_freeShipping) {price_span.appendChild(img_shiping);}
  model.innerHTML=title;
  box.setAttribute("value",id );
  document.getElementById("favs").appendChild(new_card);

}

window.onload =loadFavs();

function deletefav() {

  box=document.getElementById("chektodo");
  if(box.checked) {
    //localStorage.removeItem("favoritos");
    papa=document.querySelector("#favs");
    list=document.getElementsByClassName("card");
    while (document.getElementsByClassName("card").length>0) {
      papa.removeChild(papa.lastChild);
    }
    localStorage.removeItem("favoritos");
      
  }
  else {
    stor =JSON.parse(localStorage.getItem("favoritos"));
    papa=document.querySelector("#favs");
    list=document.querySelectorAll(".card");
    list.forEach(e => {
      item =e.children[0];
      if (item.checked) {
        borrando =stor.find((e)=>{return e.id==item.getAttribute("value");});
        stor.splice(stor.indexOf(borrando),1);
      }
      console.log(stor);
      item.checked? papa.removeChild(e): a=1;
      stor? localStorage.setItem("favoritos",JSON.stringify(stor)):localStorage.removeItem("favoritos");
    });

  }


  cards = document.querySelectorAll(".card");
  cards.forEach(e => {
    innerbox=e.getElementsByClassName("chekboxx")[0];
    if(innerbox.checked)
    {
      innerbox.value;
    }
  });

}

function irdetail(este) {
  let id_product=este.parentNode.parentNode.id;
  let f = JSON.parse(localStorage.getItem("productos"));
  let mi_product = f.find((item) => {return item.id === id_product;});
  localStorage.setItem("seleccionado",JSON.stringify(mi_product));
  window.location="detail.html";
}

function selectfavs(e) {

  box=document.getElementById("chektodo");
  buton=box.nextSibling.nextSibling;
  buton.setAttribute("class","bton-activ");
  if(box.checked) {
    cards = document.querySelectorAll(".card");
    if  (cards.length==0)
    {
      box.checked=0;
      buton.setAttribute("class","bton-desable");}
    cards.forEach(e => {
      innerbox=e.getElementsByClassName("chekboxx")[0];
      innerbox.checked=1;
    });
  }
  else{
    cards = document.querySelectorAll(".card");
    cards.forEach(e => {
      innerbox=e.getElementsByClassName("chekboxx")[0];
        
      innerbox.checked=0;
        
    });
    buton.setAttribute("class","bton-desable");
  }

}

function search() {
  buscar= document.querySelector(".form")[0].value;
  data=JSON.parse(localStorage.getItem("productos"));
  encontrados= data.filter((element)=>{return(element.categories.includes(buscar));});
  localStorage.setItem("buscados",JSON.stringify(encontrados));
  localStorage.removeItem("seleccionado");
  window.location="/busqueda.html";
}
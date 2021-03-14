function formatCurrency(locales, currency, fractionDigits, number) {
  let formatted = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
  }).format(number);
  return formatted;
}

function mostrardata(data) {
  let mydata=data;
  if (localStorage.getItem("productos")) {
    localStorage.setItem("productos",JSON.stringify(data));
    mydata=data;
  }
  else {
    mydata=data.items;
    localStorage.setItem("productos",JSON.stringify(data.items));
  }
  
  mydata.forEach((element) => {
    let image = element.picture;
    let id = element.id;
    let title = element.title;
    let price = formatCurrency(
      "es-AR",
      element.price.currency,
      2,
      element.price.amount,
    );
    let location = element.location;
    let is_freeShipping = element.free_shipping;
    let old_card=document.querySelector(".card");
    let Newcard = old_card.cloneNode(true);
    crear_elements(id,image,price,title,location,is_freeShipping,Newcard);    
  });

  document.getElementById("products").removeChild(document.getElementById("1"));

}


function hacerFetch()
{ console.log(localStorage.getItem("productos")=="undefined");
  console.log(localStorage.getItem("productos")==undefined);
  if(localStorage.getItem("productos")==undefined || localStorage.getItem("productos")==="undefined")
  {
    fetch(
      "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce"
    )
      .then((response) => response.json())
      .then(mostrardata)
      .catch((err) => (err.message));
    
  }
  else {
    mostrardata(JSON.parse(localStorage.getItem("productos")));
  }
}

function crear_elements (id,image, price,title,location, is_freeShipping, new_card) {
  card_image=new_card.children[0];
  card_content= new_card.children[1];
  img=card_image.children[0];
  price_span=card_content.children[0];
  img_shiping=price_span.children[0];
  city_span= card_content.children[1];
  model=card_content.children[2];
  
  new_card.setAttribute("id",id );
  img.setAttribute("src",image);
  price_span.innerHTML=price;
  if(is_freeShipping) {price_span.appendChild(img_shiping);}
  city_span.innerHTML=location;
  model.innerHTML=title;
  
  document.getElementById("products").appendChild(new_card);
}

// eslint-disable-next-line no-unused-vars
function irdetail(este) {
  let id_product=este.parentNode.parentNode.id;
  let f = JSON.parse(localStorage.getItem("productos"));
  let mi_product = f.find((item) => {return item.id === id_product;});
  localStorage.setItem("seleccionado",JSON.stringify(mi_product));
  window.location="detail.html";
}


function search() {
  buscar= document.querySelector(".form")[0].value;
  data=JSON.parse(localStorage.getItem("productos"));
  encontrados= data.filter((element)=>{return(element.categories.includes(buscar));});
  localStorage.setItem("buscados",JSON.stringify(encontrados));
  localStorage.removeItem("seleccionado");
  window.location="/busqueda.html";
}

function listfav() {
  window.location="/favorito.html";

}



hacerFetch();
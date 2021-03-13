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
  
  create_elementDetail(id,title,description,units,condition,price,image,oldCard);    
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

  oldCard.parentNode.replaceChild(Newcard,oldCard);

}
function search() {
  buscar= document.querySelector(".form")[0].value;
  encontrados= data.filter((element)=>{return(element.categories.includes(buscar));});
  localStorage.setItem("buscados",JSON.stringify(encontrados));
  localStorage.removeItem("seleccionado");
  window.location="/busqueda.html";
}

loadDetail();


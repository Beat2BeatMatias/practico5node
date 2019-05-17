var data;
var siteId;
var catId;
var pais=document.getElementById("s_pais");
var categoria=document.getElementById("s_categoria");
var modo=document.getElementById("s_modo");
var filas=document.getElementById("s_fila");
var col=document.getElementById("s_col");

function envio(){
    window.location.assign("trends/visualize?pais=" + siteId + "&" + "categoria=" +
    catId + "&" + "nrow=" + filas.value + "&" + "ncol=" + col.value + "&" + "modo=" + modo.value);
}

function seleccionSitio(){  
    data.forEach(sites => {
        if (pais.options[pais.selectedIndex].innerHTML == sites.name){
            siteId = sites.id;  
        }
    })
    var endPointCategories = "https://api.mercadolibre.com/sites/" + siteId + "/categories";
    request.open('GET', endPointCategories, true);
    request.onload = function () {
    // Begin accessing JSON data here
    data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        var i=0;
        data.forEach(cat => {
        var opt=document.createElement("option");
        opt.value=i;
        opt.innerHTML=cat.name;
        i++;
        categoria.appendChild(opt);
        });    
  } else {
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "No funciona!";
        document.getElementsByTagName("body").appendChild(errorMessage);
  }
}
request.send();
}
function seleccionCategoria(){
  data.forEach(categorias => {
      if (categoria.options[pais.selectedIndex].innerHTML == categorias.name){
          catId = categorias.id;  
      }
  })
}

var endPointSites = "https://api.mercadolibre.com/sites";
var request = new XMLHttpRequest();
request.open('GET', endPointSites, true);
//request.setRequestHeader("Access-Control-Allow-Origin", "*");
request.onload = function () {
  // Begin accessing JSON data here
  data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    var i=0;
    data.forEach(sites => {
      var opt=document.createElement("option");
      opt.value=i;
      opt.innerHTML=sites.name;
      i++;
      pais.appendChild(opt);
    });
    
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = "No funciona!";
    document.getElementsByTagName("body").appendChild(errorMessage);
  }
}
request.send();

var data;
var siteId;
var catId;
var pais=document.getElementById("s_pais");
var categoria=document.getElementById("s_categoria");
var modo=document.getElementById("s_modo");
var filas=document.getElementById("s_fila");
var col=document.getElementById("s_col");

function envio(){
    console.log(catId);
    if (siteId != "ninguno" && catId != "ninguno"){
        window.location.assign("trends/visualize?pais=" + siteId + "&" + "categoria=" +
            catId + "&" + "nrow=" + filas.value + "&" + "ncol=" + col.value + "&" + "modo=" + modo.value);
    } else if (siteId != "ninguno" && catId == "ninguno"){
        window.location.assign("trends/visualize?pais=" + siteId
            + "&" + "nrow=" + filas.value + "&" + "ncol=" + col.value + "&" + "modo=" + modo.value);
    } else {
       createError("Elija un pais...")
    }
}

function cleanElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function seleccionSitio(sitio){
    siteId = sitio.value;
    var endPointCategories = "https://api.mercadolibre.com/sites/" + siteId + "/categories";
    cleanElement(categoria);
    var opt=document.createElement("option");
    opt.innerHTML="Elija  o no una categoria";
    opt.value="ninguno";
    categoria.appendChild(opt);
    request.open('GET', endPointCategories, true);
    request.onload = function () {
        // Begin accessing JSON data here
        data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(cat => {
            var opt=document.createElement("option");
            opt.value=cat.id;
            opt.innerHTML=cat.name;
            categoria.appendChild(opt);
            });
      } else {
           createError()
      }
    }
    request.send();
}
function seleccionCategoria(categoria){
    console.log(categoria.value);
    catId = categoria.value;
}
siteId = pais.value;
catId = categoria.value;
console.log(catId);
var endPointSites = "https://api.mercadolibre.com/sites";
var request = new XMLHttpRequest();
request.open('GET', endPointSites, true);
//request.setRequestHeader("Access-Control-Allow-Origin", "*");
request.onload = function () {
      // Begin accessing JSON data here
    data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
    data.forEach(sites => {
      var opt=document.createElement("option");
      opt.value=sites.id;
      opt.innerHTML=sites.name;
      pais.appendChild(opt);
    });

    } else {
        createError()
    }
}
function createError(mensaje){
    alert(mensaje)
}
request.send();

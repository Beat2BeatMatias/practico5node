var url_string = window.location.href;
var url = new URL(url_string);
var pais= url.searchParams.get("pais");
var categoria= url.searchParams.get("categoria");
var nrow= url.searchParams.get("nrow");
var ncol= url.searchParams.get("ncol");
var modo= url.searchParams.get("modo");

var tbody = document.getElementById("tbody");

var endPointSites;
if (categoria != undefined) {
    console.log("entro 1")
    endPointSites = "https://api.mercadolibre.com/trends/" + pais + "/" + categoria;
}else{
    console.log("entro 2",pais)
    endPointSites = "https://api.mercadolibre.com/trends/" + pais;
}
var request = new XMLHttpRequest();
request.open('GET', endPointSites, true);
//request.setRequestHeader("Access-Control-Allow-Origin", "*");
request.onload = function () {
  // Begin accessing JSON data here
  data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400 && data != null) {
      var k=0;
      for(var i=0;i<nrow;i++){
          var r=document.createElement("tr");
          for(var j=0;j<ncol;j++){
            var d=document.createElement("td");
            var dataDesordenada = shuffle(data);
            var nombre=dataDesordenada[k].keyword.toUpperCase();
            d.innerHTML=nombre;
            r.appendChild(d);
            k++;
          }
          tbody.appendChild(r);
      }    
  } else {
      var errorMessage = document.createElement("p");
      errorMessage.textContent = "No funciona!";
      document.getElementById("container").appendChild(errorMessage);
  }
}
request.send();

function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

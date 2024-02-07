var _code;
var _titre;
var _artiste;
var _image;
var _prix;
var _info
var _select
function ChargerInfo(el) {
  _code = el.value;
  _titre = document.getElementById("titre");
  _artiste = document.getElementById("artiste");
  _prix = document.getElementById("prix");
  _image = document.getElementById("peinture");
  _info = document.getElementById("info")
  _select = document.getElementById("typefichier")

  if(_select.value == "xml"){
    GetAndDisplayXML();
    GetAndDisplayTEXT();
  }else if(_select.value == "json"){
    GetAndDisplayJSON();
    GetAndDisplayTEXT();
  }
}

function GetAndDisplayTEXT() {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			_info.textContent = xhr.responseText;
		}
	}
	
	xhr.open("GET", "ajax/" + _code + ".txt", true);
	xhr.send();
}

function GetAndDisplayXML() {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        DisplayXMLResponse(xhr.responseXML);
      }
    }
    
    xhr.open("GET", "ajax/peintures.xml", true);
    xhr.send();
  }
  
  
  /*
  Fonction qui récupère via AJAX un fichier JSON stocké sur le serveur et affiche son contenu dans la section <div>
  */
  function GetAndDisplayJSON() {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        DisplayJSONResponse(JSON.parse(xhr.responseText));
      }
    }
    
    xhr.open("GET", "ajax/peintures.json", true);
    xhr.send();
  }
  
  
  /*
  Fonction qui affiche le résultat XML dans la section <div>
  */
  function DisplayXMLResponse(xml) {
  
    var peinture = xml.getElementsByTagName("peinture");
    
    for (i = 0; i < peinture.length; i++) {
      if(_code == peinture[i].getElementsByTagName("code")[0].firstChild.nodeValue){
        var titre = peinture[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
        var artiste = peinture[i].getElementsByTagName("artiste")[0].firstChild.nodeValue;
        var prix = peinture[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
        var image = peinture[i].getElementsByTagName("image")[0].firstChild.nodeValue;

        _titre.textContent = titre;
        _artiste.textContent = artiste;
        _prix.textContent = prix;
        _image.src = "img/" + image;
      }
    }
  }
  
  
  /*
  Fonction qui affiche le résultat JSON dans la section <div>
  */
  function DisplayJSONResponse(json) {
  
    var tp2 = json.peinture;
    
    for (i = 0; i < tp2.length; i++) {
      if(_code == tp2[i].code){
        var titre = tp2[i].titre;
        var artiste = tp2[i].artiste;
        var prix = tp2[i].prix;
        var image = tp2[i].image

        _titre.textContent = titre
        _artiste.textContent = artiste
        _prix.textContent = prix;
        _image.src = "img/" + image;
      }
    }
  }

  function ClearDivMessage() {
    while (_code.firstChild) {
      _code.removeChild(_code.firstChild);
    }
    while (_titre.firstChild) {
      _titre.removeChild(_titre.firstChild);
    }
    while (_artiste.firstChild) {
      _artiste.removeChild(_artiste.firstChild);
    }
    while (_image.firstChild) {
      _image.removeChild(_image.firstChild);
    }
    while (_prix.firstChild) {
      _prix.removeChild(_prix.firstChild);
    }
  }
  
  
  /*
  Fonction qui crée et retourne une balise <p> et son contenu
  */
  function CreatePElement(text) {
    var newP = document.createElement("p");
    var newPText = document.createTextNode(text);
        
    newP.appendChild(newPText);
    
    return newP;
  }


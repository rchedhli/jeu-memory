/*
*
* Descriptif : Ce script est appelé depuis la page index.html
* Il contient le code javascript de l'application jeu-memory
*
* Version : 1.0
*/

var pairesOk    = 0; /* nombre de paires trouvé */
var lastCarte   = null; /* dernière carte sélectionnée */
var temps_debut = null; /* début de la partie */
var tempor      = 1000; /* Temporisateur en secondes */
var tirage      = true;
var perdu = false;

/* tableau contenant les cartes des fruits */
var arrayCartes = new Array("carte1", "carte2","carte3","carte4","carte5","carte6","carte7","carte8","carte9","carte10","carte11","carte12","carte13",
"carte14","carte15","carte16","carte17","carte18");
var valueCarte  = arrayCartes.concat(arrayCartes);
var nbrValeur   = valueCarte.length;
var arrayDonne  = new Array(nbrValeur);


/* progress bar */
var depart    = false;
var maxprogress = 360; /* total à atteindre  en secondes (360 secondes soit 6 min)*/
var actualprogress = 0;  /* valeur courante de la barre de progression */
var actualprogresspx = 0; /* valeur courante en courante */
var itv = 0; /* identifiant  pour la fonction setinterval */


/*
* Permet au commencement du jeu : 
* d'afficher les meilleurs temps
* de répartir les cartes de manière aléatiore
* Et de les afficher face cachée à l'écran
*/
function donne(){
  //Afficher les meilleurs temps
  meilleursTemps();
  
  //Récuperation de nombre de carte à partir de tableau (element HTML tabCarte)
  var objColTr  = document.getElementById('tabCarte').rows;
  var nbrCartes = (objColTr[0].cells.length * objColTr.length);
  var ok        = true;
  var Buffer    = "";
  var Compteur  = 0;
  
  // Le nombre de cartes(TD) doit être egale au nombre de valeurs
  // Et doit être un nombre paire
  if(nbrValeur == nbrCartes){
	 // Répartition  des cartes de manière aléatoire 
	 //En utilisant les fonction Math.random, Math.floor et RegExp
	 //Math.random : renvoie un nombre flottant pseudo-aléatoire compris dans [0, 1[
	 //Math.floor : renvoie le plus grand entier qui est inférieur ou égal à un nombre 
	 //RegExp : objet qui permet de définir des expressions régulières
	  while(ok){
		  var tirage = Math.floor(Math.random() * nbrCartes);
		  var reg = new RegExp("#"+tirage+":", "gi");
		  if (!reg.test(Buffer)){
			  arrayDonne[Compteur] = valueCarte[tirage];
			  Buffer += "#" + tirage+ ":";
			  Compteur ++;
			  if(Compteur == nbrCartes) ok = false;
			}
		}
	}
}

/*
* Reinitialiser le choix de l'utilitsateur
* En retournant les deux cartes coté back
* objetID : String identifiant de la première carte choisie
* objLast : identifiant de la deuxième carte choisie
*/
function resetChoix(objID, objLast){
  objID   = document.getElementById(objID);
  objLast = document.getElementById(objLast);
  // Images Vide
  objID.style.backgroundImage = "";
  objLast.style.backgroundImage = ""; 
  // appliquer le style css Back pour retourner les deux cartes
  objID.className = "Back";
  objLast.className = "Back";
  tirage = true;
}

/*
* Compter le temps restant
* Et afficher la barre de progression
* 
*/
function prog(){
	
 //on arrête la progression de la barre si on dépasse le temps imparti
  if(actualprogress > maxprogress){
	 //clearInterval arrête l'exécution d'un traitement à intervalle régulier
    clearInterval(itv);
	return;
  }
  
  var indicator = document.getElementById("indicator");
  actualprogress += 1;
  actualprogresspx +=1.8194;
  indicator.style.width=actualprogresspx + "px";
  
  if(actualprogress == maxprogress) {
	 //Affichage de message vous avez perdu
     setTimeout(function(){alert("Vous avez perduuuuuu !");}, 0);
	 //Arret de la barre de progression
	 clearInterval(itv);
     perdu = true;
	} 
}


/*
* Exécuter les controles à effectuer en cliquant sur une carte
* Si les deux cartes sont identiques la paire est validée
* Sinon les cartes retournées face cachée
* Paramètre objID : String identifiant de la carte selectionnée
*/
function jouer(objID){
	
	// empêcher le jour de continuer à jouer s'il a perdu
	if(perdu){
		return;
	}
	// sinon commencer une nouvelle partie
	if (depart == false){
		//déclencher la barre de progression
		itv = setInterval(prog, 1000);
		depart = true;
		temps_debut = new Date().getTime();
	}
		
 //La Carte ne doit pas étre retournée
	if(tirage && objID.className != "Front"){
		tirage = false;
		if(lastCarte == null){
			objID.className = "Front";
			objID.style.backgroundImage = "url(./images/"+arrayDonne[objID.id]+".png)";
			lastCarte = objID;
			tirage = true;
        } else {
			if(lastCarte.id != objID.id && objID.className != "Front"){
				// Retourne la Carte et Affiche sa Valeur/Image
				objID.className = "Front";
				objID.style.backgroundImage = "url(./images/"+arrayDonne[objID.id]+".png)";
				// Si les deux Cartes sont DIFFERENTE
				if(arrayDonne[objID.id] != arrayDonne[lastCarte.id]){
					// Declenche le Temporisateur
					setTimeout( "resetChoix(" + objID.id + ", "+ lastCarte.id + ")", tempor);
					lastCarte = null;
				} else {
					// Les Deux Cartes sont EGALE
					lastCarte = null;
					//count ++;
					pairesOk ++;
					// Si Tout gagner (nbr de paires)
					if(pairesOk == (nbrValeur/2)){
						clearInterval(itv);
						var dif_temps = Math.floor((new Date().getTime() - temps_debut)/1000);
						enregistrerTemps(dif_temps);
						setTimeout(function(){alert("Vous avez gagnéééééééééé !");}, 0);
					}
					tirage = true;
				}
			}		
		}	
	}
}


/*
* Afficher à l'écran les meilleurs temps
*/

function meilleursTemps(){ 
  http = new XMLHttpRequest();
  //Appel au service meilleurTemps
  http.open("GET", "http://localhost:4000/meilleurTemps");
  //Envoie de la requête http get
  http.send();
  http.onreadystatechange = function () {
	  if (this.readyState === 4  && this.status == 200) {
		  //Si la réponse est vide (aucun temps entregistré en base)
		  //on affiche Première exécution
		  if (this.responseText == ""){
			  document.getElementById("score1").innerHTML = "Première exécution";
			  } else {
				  //Sinon on affiche au maximun les trois premiers temps (en secondes)
				  var scores = this.responseText.split('|');
				  scores.filter(Number);
				  //tri ascendant des temps recuperés 
				  scores.sort(function(a, b){return a-b});
				// Affichage à l'écran des temps recuperés
				  for (var j=1; j < scores.length; j++){
						  document.getElementById("score" + j).innerHTML = "N°" + j + " : " + scores[j];		
		   }
	   }
		
		}
	}
}

/*
* Sauvegarder le temps de partie effectué
* @param {Number} temps de partie effectuée
*/
function enregistrerTemps(temps){ 
  http = new XMLHttpRequest();
  //Appel au service enregistrerTemps
  var url = "http://localhost:4000/enregistrerTemps/" + temps;
  http.open("POST", url);
  //Envoie de la requête HTTP POST
  http.send();
}


// Au Début du jeu : les cartes sont disposées face cachée
window.onload = donne;

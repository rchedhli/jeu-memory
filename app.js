/**
* Ce script JS contient le service de la couche Back de l'application Jeu Memory
* version 1.0
*
*/
// appel au module NodeJs express
var express = require('express');
// appel au module NodeJs sqlite pour le traitement de la base de données
var sqlite3 = require('sqlite3');
// appel au module NodeJs fs pour le traitement des fichiers
var fs = require('fs');
// init objet app en utilisant la fonction express()
var app = express();

// utilisation du répertoir public pour servir les ressourses statiques
app.use(express.static('./public'));

// création de la base de données memory-jeu.db s'il n'existe pas dans le répertoir data
var dbSqlite = new sqlite3.Database('data/memory-jeu.db');
dbSqlite.serialize(function() {
    dbSqlite.run("create table if not exists scores (temps)");
});
dbSqlite.close();

// init memoryRouter pour créer un gestionnaire de route
var memoryRouter = express.Router();

/* page d'accueil
 contient la fonction callback à exécuter quand un utilisateur se connecte à l'application
 Cette fonction prend 2 paramètres req: la requête du visiteur et res : la réponse qu'on doit renvoyer
 La fonction renvoie vers le fichier index.html
 */
memoryRouter.route('/')
.all(function(req,res){ 
	 res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile('./public/index.html', function (err,data) {
			if (err) {
			console.log(err);
			} else {
			res.end(data);
			} 
		});
});
  
  
/*
Recupérer de la table scores les trois meilleurs temps
Instanciation et Connexion à la base via sqlite3.Database
*/
memoryRouter.route('/meilleurTemps')
.get(function(req,res){ 
	var dbSqlite = new sqlite3.Database('data/memory-jeu.db');
	// Récupération des 3 valeurs distinctes dans l'ordre croissant
	dbSqlite.all("select distinct temps from scores order by temps ASC LIMIT 3", function(err, rows) {
		var resTemp = "";
		// si le résultat est vide, il s'agit de la première exécution de l'application
		if( rows.length == 0 )
			{
				console.log("Première exécution !");
			}
			// extraction de meilleurs scores
			else
			{
			for( var i in rows )
				{
					if (i < 3) {
						console.log("row" + i + " " + rows[i].temps);
						resTemp = resTemp + "|" + rows[i].temps;
					}
					else {
						break;
					}
				} 
			}
		res.send(resTemp);
	});
	// Déconnexion de la base
	dbSqlite.close();
});  


/*
Enregistrer le temps de partie effectuée avec succès dans la table "scores"
*/
memoryRouter.route('/enregistrerTemps/:temps')
.post(function(req,res){
	var dbSqlite = new sqlite3.Database('data/memory-jeu.db');
	console.log("temps passé : " + req.params.temps);
	var stmt = dbSqlite.prepare("insert into scores values (?)");
	stmt.run(req.params.temps);
	stmt.finalize();
	dbSqlite.close();

}); 


app.use(memoryRouter);

// Lancement du serveur avec le port d'écoute 4000
app.listen(4000);
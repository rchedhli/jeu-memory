# Jeu Memory
_Ce projet représente un jeu du mémoire.Le jeu dispose de 18 cartes représentant des fruits différents. Chaque carte est affcihée 2 fois au niveau de l'écarn. Initialement, les cartes sont affichées à l'écran face cachée._

Les étapes du jeu : 

- Le joueur clique sur deux cartes successivement. Si celles-ci sont identiques, la paire est validée. Sinon, les cartes sont de nouveau retournées face cachée, et le joueur doit sélectionner une nouvelle paire de cartes. 
 
- Un compteur de temps, avec une barre de progression, s’affiche en dessous du plateau. 
 
- Le joueur gagne s'il arrive à découvrir toutes les paires au bout de six minutes (360 secondes). 
 
- Chaque temps de partie effectuée avec succés est sauvegardée en base de données. Avant le début du jeu, les meilleurs temps s’affichent à l’écran. 


## Pour commencer

Avant de commencer à utiliser l'application, il faut avoir les pré-requis suivants et suivre les étapes d'installation décrites ci-dessous:

### Pré-requis

- Node JS:

L'installation de la version 12.14 Node JS se fait via ce lien : https://nodejs.org/en/download/.

- Docker (facultatif):

L'installation de Docker se fait via ce lien : https://docs.docker.com/docker-for-windows/install/

### Installation

Il y a deux façons pour installer le jeu du mémoire : Soit d'une façon "manuelle", soit en passant par Docker.

_Méthode n°1 (via Docker):_

1 - Recupérer le projet.

2- Exécuter la commande : docker build -t jeu-memory à la racine du projet.

3- Exécuter la commande : docker run -p 4000:4000 -d jeu-memory à la racine du projet.

_Méthode n°2:_

1 - Recupérer le projet

2 - Exécuter la commande : npm install à la racine du projet.

3 - Exécuter la commande : node app.js à la racine du projet.

Pour les deux méthodes, 

5 - Vérifier dans le navigateur que la page d'acceuil du jeu s'affiche correctement en ouvrant l'url http://localhost:4000.

Le résultat attendu est le suivant :

![alt tag](https://user-images.githubusercontent.com/57545358/71786702-c0c47f80-300e-11ea-8844-f6e91c21e844.PNG)


## Démarrage

Il faut sélectionner tous les paires de cartes identiques avant la fin du temps imparti qui est égale à 6 minutes.

Si vous dépassez les 6 minutes avant la sélection de tous les paires identiques, le message suivant s'affiche.

Si vous sélectionnez tous les paires identiques avant la fin du temps imparti, le message suivant s'affiche:



## Versions

**Dernière version :** 1.0


## Auteurs

* **Raja CHEDHLI** _alias_ [@rchedhli](https://github.com/rchedhli)





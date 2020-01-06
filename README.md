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

1 - Recupérer le projet

2- Exécuter la commande à la racine du projet: docker build -t jeu-memory .

3- Exécuter la commande à la racine du projet: docker run -p 4000:4000 -d jeu-memory

_Méthode n°2:_

1 - Recupérer le projet

2 - Exécuter la commande à la racine du projet : npm install

3 - Exécuter la commande à la racine du projet : node app.js

Pour les deux méthodes, 

5 - Vérifier dans le navigateur que la page d'acceuil du jeu s'affiche correctement en ouvrant l'url http://localhost:4000.

Le résultat attendu est le suivant :

![alt tag](https://user-images.githubusercontent.com/57545358/71825160-89e87b00-309b-11ea-8cc9-bdec46feeece.PNG)


## Démarrage

Il faut sélectionner tous les paires de cartes identiques avant la fin du temps imparti qui est égale à 6 minutes.

-_Cas Jeu perdu_:
Si vous dépassez les 6 minutes avant la sélection de tous les paires identiques, le message suivant s'affiche.
![alt tag](https://user-images.githubusercontent.com/57545358/71826108-83f39980-309d-11ea-8d11-b692cc05ec0a.PNG)

-_Cas Jeu gagné_:
Si vous sélectionnez tous les paires identiques avant la fin du temps imparti, le message suivant s'affiche:
![alt tag](https://user-images.githubusercontent.com/57545358/71826282-d92fab00-309d-11ea-83cd-bdcd21304f23.PNG)


## Versions

**Dernière version :** 1.0


## Auteurs

* **Raja CHEDHLI** _alias_ [@rchedhli](https://github.com/rchedhli)





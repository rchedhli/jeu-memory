FROM node:10

# Création de répertoire de travail de l'application
WORKDIR /usr/src/app

# Installation des dépendances de l'application
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]

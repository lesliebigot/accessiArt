# On démarre depuis une image officielle de node
FROM node:22-alpine

# On définit le répertoire de travail dans le conteneur
WORKDIR /app

# On copie le package.json dans le conteneur
COPY package.json .

# On installe les dépendances
RUN npm install

# On copie le reste du code dans le conteneur
COPY . .

# On expose le port 3000
EXPOSE 3000

# On lance le script start du package.json pour démarrer l'application
CMD ["npm", "start"]
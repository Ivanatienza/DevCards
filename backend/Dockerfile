#Usamos la imagen oficial de Node.js LTS 20 (última versión estable) para el backend
FROM node:20

#Creamos la carpeta de trabajo del contenedor
WORKDIR /app

#Copiamos el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./
RUN npm install

#Copiamos todo el código del backend al contenedor
COPY . .

#Exponemos el puerto donde correrá el backend
EXPOSE 3000

#Comando para levantar el servidor de desarrollo
CMD ["node", "src/server.js"]
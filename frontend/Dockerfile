#Usamos la imagen oficial de Node.js LTS 20
FROM node:20

#Carpeta de trabajo dentro del contenedor
WORKDIR /app

#Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

#Instalamos todas las dependencias
RUN npm install

#Copiamos todo el código del frontend
COPY . .

#Exponemos el puerto de desarrollo de Vite
EXPOSE 5173

# Comando para levantar el servidor de desarrollo
# El comando --host sirve para acceder fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]
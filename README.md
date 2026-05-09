# 🚀 DevCards

Aplicación web para gestionar y compartir tarjetas de documentación de desarrollo.  
Permite a los usuarios crear, editar, eliminar y consultar recursos técnicos organizados por etiquetas.

## 🧠 Tecnologías utilizadas

### 🔙 Backend

- Node.js  
- Express  
- MySQL  
- JWT (autenticación)  
- Docker (base de datos)

### 🎨 Frontend

- Vue 3 (Composition API)  
- Vue Router  
- Pinia (estado global)  
- Axios  
- Tailwind CSS  
- Vue I18n  
- Vue Toastification

## 📁 Estructura del proyecto

backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── utils/
 ├── config/
 └── server.js

frontend/
 ├── components/
 ├── views/
 ├── router/
 ├── stores/
 ├── services/
 ├── composables/
 ├── i18n/
 └── main.js

## ⚙️ Instalación y ejecución

### 🔧 Backend

cd backend
npm install

Variables de entorno

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=devcards
JWT_SECRET=tu_jwt_secret

🐳 Base de datos (Docker)

docker-compose up --build

▶️ Ejecutar backend

npm run dev

🎨 Frontend

cd frontend
npm install
npm run dev

🔐 Autenticación

Se utiliza JWT:

El usuario inicia sesión
El backend genera un token
El token se guarda en el cliente
Se envía en cada petición protegida

📡 Endpoints principales

Auth

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

Cards

GET /api/cards
POST /api/cards
PUT /api/cards/:id
DELETE /api/cards/:id
GET /api/cards/public

Users

GET /api/users
GET /api/users/profile
PUT /api/users/profile
DELETE /api/users/:id

Settings

GET /api/settings
PUT /api/settings

Tags

GET /api/tags
POST /api/tags

Admin

GET /api/admin/users
POST /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id

🧪 Validaciones

Backend

Validación de email
Validación de password segura
Validación de URLs
Validación de texto y campos obligatorios

Frontend

Validación por campo (UX)
Reglas reutilizables
Errores visuales en formularios

🎨 UI/UX

Diseño con Tailwind CSS
Soporte modo oscuro
Internacionalización (ES / EN)
Notificaciones con toast
Componentes reutilizables


📌 Notas técnicas

Arquitectura MVC en backend
Uso de middlewares para auth y roles
Separación de lógica (services, composables)
Uso de Docker para persistencia de datos

👨‍💻 Autor

Iván Atienza Moya
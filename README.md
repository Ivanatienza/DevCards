🚀 DevCards:

Aplicación web full stack para la gestión y compartición de tarjetas de documentación técnica orientadas al desarrollo de software.

Permite a los usuarios crear, editar, organizar y consultar recursos técnicos mediante etiquetas, con autenticación segura, panel administrativo y personalización de experiencia.

🌐 Demo en producción:

Frontend: https://dev-cards-favs.vercel.app
Backend API: https://devcards-production.up.railway.app/

✨ Funcionalidades principales:

Registro e inicio de sesión de usuarios
Autenticación segura con JWT
Gestión completa de tarjetas técnicas (CRUD)
Organización mediante etiquetas
Perfil de usuario editable
Panel de administración
Gestión de usuarios
Sistema de roles (usuario / administrador)
Modo oscuro
Internacionalización (Español / Inglés)
Notificaciones toast
Gestión de avatar
Configuración personalizada

🧠 Tecnologías utilizadas:

🔙 Backend:

Node.js
Express.js
MySQL
JWT
bcrypt
Cookie Parser
CORS

🎨 Frontend

Vue 3 (Composition API)
Vue Router
Pinia
Axios
Tailwind CSS
Vue I18n
Vue Toastification

☁️ Despliegue
Railway (Backend + Base de datos MySQL)
Vercel (Frontend)

📁 Estructura del proyecto

DevCards/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── views/
    │   ├── router/
    │   ├── stores/
    │   ├── services/
    │   ├── composables/
    │   ├── i18n/
    │   └── main.js

⚙️ Instalación local

1️⃣ Clonar repositorio

git clone https://github.com/tuusuario/devcards.git
cd devcards

🔧 Backend

cd backend
npm install

Variables de entorno

Crear archivo .env

PORT=3000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=

Ejecutar backend

npm run dev

🎨 Frontend

cd frontend
npm install
npm run dev

Variables de entorno

Crear archivo .env

VITE_API_URL=http://localhost:3000/api

🔐 Sistema de autenticación

El sistema utiliza JWT (JSON Web Tokens) con cookies seguras.

Flujo:

El usuario inicia sesión
El backend valida credenciales
Se genera un token JWT
El token se almacena en cookie
Se valida en rutas protegidas mediante middleware

📡 API Endpoints

Auth

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

Cards

GET    /api/cards
POST   /api/cards
PUT    /api/cards/:id
DELETE /api/cards/:id
GET    /api/cards/public

Users

GET    /api/users
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/:id

Settings

GET    /api/settings
PUT    /api/settings

Tags

GET    /api/tags
POST   /api/tags

Admin

GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id

🛡️ Validaciones implementadas

Backend

Validación de email
Contraseñas seguras
Validación de URLs
Sanitización de entradas
Validación de campos obligatorios
Control de permisos por rol

Frontend

Validación reactiva por campo
Feedback visual inmediato
Mensajes de error dinámicos
Prevención de formularios inválidos

🎨 UI / UX

Diseño responsive
Interfaz moderna con Tailwind CSS
Modo oscuro
Soporte bilingüe (ES / EN)
Toast notifications
Navegación intuitiva
Componentes reutilizables

🏗️ Arquitectura

El backend sigue una arquitectura MVC:

Models → acceso a datos
Controllers → lógica de negocio
Routes → definición de endpoints
Middlewares → autenticación y autorización

El frontend aplica separación modular mediante:

Stores globales (Pinia)
Servicios API
Componentes reutilizables
Composables

☁️ Despliegue

Backend y base de datos

Desplegados en Railway.

Frontend

Desplegado en Vercel.

📌 Estado del proyecto

✅ Proyecto finalizado
✅ Funcional en entorno local
✅ Preparado para despliegue en producción

👨‍💻 Autor

Iván Atienza Moya

Proyecto Full Stack desarrollado como práctica profesional con Vue + Node.js + MySQL

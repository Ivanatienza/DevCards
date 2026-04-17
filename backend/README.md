# DevCards Backend:

Backend API REST para la aplicación web DevCards. Permite la autenticación de usuarios, gestión de cards, tags (etiquetas) y configuración del usuario.

## Tecnologías utilizadas:

* Node.js
* Express
* MySQL
* Autenticación JWT (JSON Web Token)
* Bcrypt (hash de contraseñas)
* Docker (levantar backend)

---

# Estructura del proyecto:

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── cardController.js
│   ├── tagController.js
│   ├── userController.js
│   └── settingsController.js
│
├── models/
│   ├── cardModel.js
│   ├── tagModel.js
│   ├── card_tagModel.js
│   ├── userModel.js
│   └── settingsModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── cardRoutes.js
│   ├── tagRoutes.js
│   ├── userRoutes.js
│   └── settingsRoutes.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── app.js
└── server.js
```

---

# Base de datos:

Tablas:

* users
* cards
* tags
* card_tags
* settings

Relaciones:

* cards.user_id → users.id
* card_tags.card_id → cards.id
* card_tags.tag_id → tags.id
* settings.user_id → users.id

---

# Autenticación

Se usa JWT (JSON Web Token)

Header requerido:

```
Authorization: Bearer TOKEN
```

---

# Endpoints:

## Auth:

POST /auth/register
POST /auth/login

---

## Users:

GET /users/profile
PUT /users/profile

---

## Cards:

GET /cards
POST /cards
PUT /cards/:id
DELETE /cards/:id
GET /cards/public

---

## Tags:

GET /tags
POST /tags

---

## Settings:

GET /settings
PUT /settings

---

# Variables de entorno

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=devcards
JWT_SECRET=secret
```

---

# Ejecutar el backend:

Clonar repositorio:

git clone https://github.com/Ivanatienza/DevCards.git
cd backend

Instalar dependencias necesarias:

```
npm install bcrypt express cors mysql2 jsonwebtoken cookie-parser dotenv

Instalar dependencias de desarrollo:

npm install -D nodemon
```

Ejecutar:

```
npm run dev
```

---

# Autor:

Iván Atienza Moya
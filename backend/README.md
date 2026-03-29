🖥️ DevCards Backend API

Se trata de una API REST desarrollada con Node.js y Express para la gestión de tarjetas de desarrollo (DevCards), usuarios, etiquetas y configuraciones.

🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Bcrypt
- Dotenv

---

📁 Estructura del proyecto

![Estructura carpetas backend](backend.png)

---

⚙️ Instalación

1. Clonar el repositorio:

git clone <https://github.com/Ivanatienza/DevCards.git>

2. Acceder al backend:

cd DevCards/DevCards/backend

3. Instalar dependencias:

npm install bcrypt cookie-parser cors dotenv express jsonwebtoken mysql2

4. Crear archivo ".env":

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=devcards

5. Ejecutar el servidor:

npm run dev

---

🗄️ Base de datos

El proyecto utiliza MySQL con las siguientes tablas:

- "users"
- "cards"
- "tags"
- "card_tags"
- "settings"

Relaciones principales:

- Un usuario puede tener muchas tarjetas
- Una tarjeta puede tener múltiples etiquetas
- Relación muchos a muchos entre cards y tags
- Cada usuario tiene su configuración (settings)

---

🔐 Autenticación

La autenticación se realiza mediante JWT.

Endpoints protegidos requieren:

Authorization: Bearer TOKEN

---

📌 Endpoints principales

🔐 Auth

- "POST /api/auth/register" → Registrar usuario
- "POST /api/auth/login" → Login

---

👤 Usuarios

- "GET /api/me" → Obtener perfil del usuario logueado

---

🧾 Cards

- "POST /api/cards" → Crear tarjeta
- "GET /api/public" → Obtener tarjetas públicas
- "GET /api/cards/:id" → Obtener tarjeta por ID
- "PUT /api/cards/:id" → Actualizar tarjeta
- "DELETE /api/cards/:id" → Eliminar tarjeta

⚙️ Settings

- "GET /api/settings" → Obtener configuración del usuario
- "PUT /api/settings" → Actualizar configuración

---

👑 Admin

- "GET /api/admin/users" → Listar usuarios
- "DELETE /api/admin/users/:id" → Eliminar usuario

(Requiere rol administrador)

---

🛡️ Middlewares

- authMiddleware → Verifica JWT
- adminMiddleware → Verifica rol admin

---

🧪 Testing

Los endpoints han sido probados mediante:

- REST Client (VS Code)

---

📌 Funcionalidades principales

- Registro y autenticación de usuarios
- Gestión completa de tarjetas (CRUD)
- Sistema de etiquetas (tags)
- Configuración de usuario (tema e idioma)
- Control de roles (admin / user)

---

📈 Mejoras futuras

- Sistema de favoritos
- Paginación
- Filtros avanzados
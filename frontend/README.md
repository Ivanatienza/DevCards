# DevCards Frontend:

Frontend de la aplicación web DevCards. Permite la autenticación de usuarios, gestión de cards, la consulta y edición del perfil de los mismos, la configuración del usuario, un selector de idioma y una interfaz responsive con Tailwind.

---

# Tecnologías utilizadas:

* Vue 3
* Vite
* Vue Router
* Tailwind CSS
* Axios
* Vue I18n
* JWT Auth

---

# Funcionalidades implementadas:

* Login / Register
* Dashboard con saludo y avatar
* Dropdown del usuario (botones vista settings y logout)
* Editar perfil (nombre, apellidos, email y avatar)
* Settings (tema (claro/oscuro))
* Tarjetas privadas y públicas
* Tags dinámicas
* Selector de idioma (ES/EN (inglés/español))
* Navbar y Footer globales
* Responsive para móviles
* Integración con backend REST API

---

# Estructura del proyecto:

```
src/
│
├── app/
│   ├── router/
│   │   └── index.js
│   └── main.js
│
├── layouts/
│   └── MainLayout.vue
│
├── shared/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.vue
│   │   │   ├── Footer.vue
│   │   │   └── UserDropdown.vue
│   │   │
│   │   └── ui/
│   │       ├── Avatar.vue
│   │       └── LanguageSwitcher.vue
│   │
│   ├── composables/
│   │   ├── useAuth.js
│   │   └── usei18n.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   └── i18n/
│       ├── en.json
│       └── es.json
│
├── features/
│
│   ├── auth/
│   ├── users/
│   ├── cards/
│   ├── tags/
│   └── settings/
│
└── App.vue
```

---

# Rutas:

```
/login
/register
/
/public
/profile
/settings
```

---

# Variables de entorno:

Crear archivo `.env`

```
VITE_API_URL=http://localhost:3000
```

---

# Instalación:

Instalar dependencias

```bash

npm install

```

---

# Ejecutar proyecto:

```bash

npm run dev

```

---

# Build producción:

```bash

npm run build

```

---

# Conexión con backend:

El frontend se conecta a:

```
http://localhost:3000

```

Endpoints usados:

Auth
POST /auth/login
POST /auth/register

Users
GET /users/profile
PUT /users/profile

Cards
GET /cards
POST /cards
PUT /cards/:id
DELETE /cards/:id
GET /cards/public

Tags
GET /tags
POST /tags

Settings
GET /settings
PUT /settings

---

# Autenticación:

Se usa JWT (JSON Web Token) almacenado en:

```
localStorage (almacenamiento en el navegador)

```

Header enviado automáticamente:

```
Authorization: Bearer TOKEN
```

---

# Navbar:

Contenido:

* Logo
* Selector idioma
* Avatar usuario (saludo y foto del usuario)
* Dropdown usuario

Dropdown:

* Perfil
* Settings
* Logout

---


# Dashboard:

Contenido:



# Footer:

Contenido:



---

# Internacionalización:

Idiomas soportados:

* Español
* Inglés

---

# Responsive:

Diseñado con Tailwind:

* Adaptado a móviles
* Tarjetas responsive
* Navbar colapsable
* Dropdown responsive
* Forms responsive

---

# Autor:

Iván Atienza Moya
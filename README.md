# 🛒 Proyecto de Carrito de Compras con Node.js, Express y Handlebars

Este proyecto es una aplicación web construida con Node.js y Express. Incluye funcionalidades como gestión de productos y carritos de compras, autenticación con Passport, conexión con MongoDB, renderizado con Handlebars y comunicación en tiempo real con Socket.IO.

---

## 🚀 Tecnologías y Librerías Usadas

- **Node.js**
- **Express**
- **MongoDB (con Mongoose)**
- **Handlebars / Express-Handlebars**
- **Multer** – carga de archivos
- **Socket.IO** – comunicación en tiempo real
- **SweetAlert2** – notificaciones y alertas
- **Dotenv** – manejo de variables de entorno
- **Nodemon** – reinicio automático en desarrollo
- **Bcrypt** – hash de contraseñas
- **JWT (jsonwebtoken)** – manejo de tokens
- **Express-Session** – manejo de sesiones
- **Connect-Mongo** – almacenamiento de sesiones en MongoDB
- **Passport / Local / JWT** – estrategias de autenticación
- **Cookie-Parser** – manejo de cookies

---

## 📦 Instalación del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/oscaresteban2/entrega-final.git
cd entrega-final
2. Instalar dependencias
bash
Copiar
Editar
npm install
3. Configurar archivo .env
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
Copiar
Editar
URI_MONGODB=mongodb+srv://oscar:1234@cluster0.cscud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8080
SECRET=CoderSecret
4. Ejecutar en modo desarrollo
bash
Copiar
Editar
npm run dev
Utiliza Nodemon para recargar automáticamente el servidor cuando hay cambios.

📁 Scripts disponibles

npm run dev → Inicia el servidor con Nodemon.

npm start → Inicia el servidor en modo producción.

⚠️ Notas importantes
Asegúrate de tener una instancia activa de MongoDB (local o en MongoDB Atlas).

Configura las claves y secretos de GitHub OAuth si utilizas autenticación con GitHub.

Las rutas protegidas utilizan Passport con estrategias Local, JWT y GitHub.

📚 Dependencias instaladas (package.json)

"dependencies": {
  "bcrypt": "^6.0.0",
  "connect-mongo": "^5.1.0",
  "cookie-parser": "^1.4.7",
  "dotenv": "^16.6.1",
  "express": "^4.21.2",
  "express-handlebars": "^8.0.3",
  "express-session": "^1.18.2",
  "handlebars": "^4.7.8",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.17.1",
  "mongoose-paginate-v2": "^1.9.1",
  "multer": "^1.4.5-lts.1",
  "passport": "^0.7.0",
  "passport-github2": "^0.1.12",
  "passport-jwt": "^4.0.1",
  "passport-local": "^1.0.0",
  "socket.io": "^4.8.1",
  "socket.oi": "^0.0.1-security.8",
  "sweetalert2": "^11.22.2"
},
"devDependencies": {
  "nodemon": "^3.1.10"
}
✨ Créditos
Desarrollado por Oscar Peñuela


# ✅ TODO LIST REACT

Aplicación web colaborativa donde dos o más usuarios pueden **crear, buscar, marcar, editar y eliminar tareas**.  
Incluye un sistema de **autenticación con JWT** y persistencia de datos con **MySQL**.

---

## 🏗️ Arquitectura del Proyecto

Este proyecto sigue una arquitectura de tres capas:

```
TODO-LIST-REACT/
├── FRONTEND/     # React + Vite (Despliegue: Netlify/Vercel)
├── backend/      # Express.js (Despliegue: Render)
└── db/           # MySQL (Despliegue: Railway)
```

### Componentes

- **Frontend (React)**: Interfaz de usuario construida con React, Vite y Tailwind CSS
- **Backend (Express)**: API REST con autenticación JWT
- **Base de Datos (MySQL)**: Almacenamiento persistente de usuarios y tareas

---

## 🎯 Objetivo del proyecto

Desarrollar una aplicación web colaborativa de lista de tareas (**TODO LIST REACT**) que permita a los usuarios registrarse, iniciar sesión y gestionar tareas en equipo.  
El sistema debe garantizar que solo los usuarios autenticados puedan crear, editar o eliminar tareas, además de ofrecer funcionalidades de búsqueda, filtrado y control de estados.  
Con este proyecto se busca aplicar conceptos de **React, Express.js, MySQL, autenticación JWT, rutas protegidas y despliegue en la nube**.

---

## 🚀 Tecnologías utilizadas

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Axios](https://axios-http.com/)  
- [React Router DOM](https://reactrouter.com/)  
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) (notificaciones)

### Backend
- [Express.js](https://expressjs.com/)
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [JWT](https://jwt.io/) (JSON Web Tokens)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) (hash de contraseñas)
- [CORS](https://github.com/expressjs/cors)

### Base de Datos
- [MySQL](https://www.mysql.com/)

### Plataformas de Despliegue
- **Frontend**: [Netlify](https://www.netlify.com/) o [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)
- **Base de Datos**: [Railway](https://railway.app/)

---

## 📁 Estructura del Proyecto

```
TODO-LIST-REACT/
├── FRONTEND/
│   ├── src/
│   │   ├── api/          # Configuración de API
│   │   ├── components/   # Componentes React
│   │   ├── context/      # Context API
│   │   ├── hooks/        # Custom hooks
│   │   └── pages/        # Páginas
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── config/           # Configuración de base de datos
│   ├── middleware/       # Middlewares (auth, etc.)
│   ├── routes/           # Rutas de la API
│   ├── server.js         # Servidor principal
│   ├── package.json
│   └── .env.example
│
├── db/
│   ├── schema.sql        # Script de creación de tablas
│   ├── seed.sql          # Datos de ejemplo
│   └── README.md
│
└── README.md
```

---

## 📖 Guía Completa Paso a Paso

**¿Necesitas una guía detallada desde cero hasta el despliegue?** 

👉 **[Ver Guía Completa](./GUIA-COMPLETA.md)** - Incluye todos los pasos para:
- Configuración local
- Despliegue de base de datos en Railway
- Despliegue de backend en Render
- Despliegue de frontend en Netlify
- Solución de problemas comunes

---

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- MySQL (v8 o superior)
- npm o yarn

### 1. Configurar Base de Datos

```bash
# Navegar a la carpeta db
cd db

# Ejecutar el script de creación
mysql -u root -p < schema.sql

# (Opcional) Cargar datos de ejemplo
mysql -u root -p < seed.sql
```

### 2. Configurar Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Copiar archivo de ejemplo de variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de MySQL
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=tu_contraseña
# DB_NAME=todo_list
# JWT_SECRET=tu-secret-key-seguro

# Iniciar servidor en modo desarrollo
npm run dev

# O iniciar en producción
npm start
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar Frontend

```bash
# Navegar a la carpeta FRONTEND
cd FRONTEND

# Instalar dependencias
npm install

# Configurar la URL del backend en src/api/Index.jsx
# Cambiar la baseURL a: http://localhost:3000/api

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

## 📡 Endpoints de la API

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Tareas

- `GET /api/tasks` - Obtener todas las tareas (requiere autenticación)
- `GET /api/tasks/:id` - Obtener una tarea por ID (requiere autenticación)
- `POST /api/tasks` - Crear nueva tarea (requiere autenticación)
- `PUT /api/tasks/:id` - Actualizar tarea (requiere autenticación)
- `DELETE /api/tasks/:id` - Eliminar tarea (requiere autenticación)

### Health Check

- `GET /api/health` - Verificar estado del servidor

---

## 🚢 Despliegue

### Frontend (Netlify) ⭐

**Netlify** es la plataforma recomendada según el diagrama del proyecto.

#### Pasos para desplegar en Netlify:

1. **Preparar el repositorio en GitHub**:
   - Sube tu código a un repositorio de GitHub
   - Asegúrate de que el archivo `FRONTEND/netlify.toml` esté presente

2. **Conectar con Netlify**:
   - Ve a [Netlify](https://www.netlify.com/) e inicia sesión
   - Haz clic en **"Add new site"** → **"Import an existing project"**
   - Selecciona **GitHub** y autoriza a Netlify
   - Elige tu repositorio `TODO-LIST-REACT`

3. **Configurar el Build** (Netlify detectará automáticamente desde `netlify.toml`):
   - **Base directory**: `FRONTEND` (si Netlify no lo detecta automáticamente)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Configurar Variables de Entorno**:
   - Ve a **"Site settings"** → **"Environment variables"**
   - Agrega la variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://tu-backend.onrender.com/api` (reemplaza con tu URL de Render)

5. **Desplegar**:
   - Haz clic en **"Deploy site"**
   - Espera a que termine el build
   - Tu sitio estará disponible en una URL como: `https://tu-sitio.netlify.app`

📖 **Guía detallada**: Ver `FRONTEND/DEPLOY-NETLIFY.md` para instrucciones completas.

#### Alternativa: Vercel

1. **Vercel**:
   - Conecta tu repositorio de GitHub
   - Directorio raíz: `FRONTEND`
   - Comando de build: `npm run build`
   - Directorio de salida: `dist`
   - Agrega la variable de entorno `VITE_API_URL`

### Backend (Render) ⭐

**Render** es la plataforma recomendada según el diagrama del proyecto.

#### Pasos para desplegar en Render:

1. **Preparar Base de Datos en Railway** (PRIMERO):
   - Ve a [Railway](https://railway.app/) e inicia sesión
   - Crea un nuevo proyecto → **"New"** → **"Database"** → **"Add MySQL"**
   - Obtén las credenciales de conexión (host, usuario, contraseña, nombre de BD)
   - Ejecuta el script `db/schema.sql` en la base de datos de Railway

2. **Subir código a GitHub** (si aún no lo has hecho)

3. **Crear Web Service en Render**:
   - Ve a [Render Dashboard](https://dashboard.render.com/)
   - Haz clic en **"New +"** → **"Web Service"**
   - Conecta tu repositorio de GitHub
   - Selecciona tu repositorio `TODO-LIST-REACT`

4. **Configurar el Servicio**:
   - **Name**: `todo-list-backend`
   - **Root Directory**: `backend` ⚠️ **MUY IMPORTANTE**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (suficiente para empezar)

5. **Configurar Variables de Entorno**:
   ```
   PORT=10000
   DB_HOST=tu-host-de-railway.mysql.railway.app
   DB_USER=root
   DB_PASSWORD=tu-contraseña-de-railway
   DB_NAME=railway
   DB_PORT=3306
   JWT_SECRET=tu-secret-key-super-seguro
   ```

6. **Desplegar y Verificar**:
   - Haz clic en **"Create Web Service"**
   - Espera a que termine el build (2-5 minutos)
   - Prueba: `https://tu-backend.onrender.com/api/health`
   - Deberías ver: `{"status":"OK","message":"Server is running"}`

📖 **Guía detallada**: Ver `backend/DEPLOY-RENDER.md` para instrucciones completas paso a paso.

⚠️ **IMPORTANTE**: El backend debe estar desplegado ANTES de configurar el frontend en Netlify, ya que necesitarás la URL del backend para la variable `VITE_API_URL`.

### Base de Datos (Railway)

1. Crea una cuenta en [Railway](https://railway.app/)
2. Crea un nuevo proyecto MySQL
3. Obtén las credenciales de conexión
4. Ejecuta el script `db/schema.sql` en la base de datos
5. Actualiza las variables de entorno del backend con las credenciales de Railway

---

## 🔐 Seguridad

- Las contraseñas se almacenan con hash usando bcrypt
- Autenticación basada en JWT (JSON Web Tokens)
- Rutas protegidas con middleware de autenticación
- CORS configurado para permitir solicitudes del frontend

---

## 📝 Notas

- Asegúrate de configurar correctamente las variables de entorno antes de desplegar
- El JWT_SECRET debe ser una cadena segura y única en producción
- Las credenciales de la base de datos no deben exponerse en el código

---

## 👥 Contribuidores

Este proyecto fue desarrollado como parte de un ejercicio de arquitectura de aplicaciones web.

---

## 📄 Licencia

ISC


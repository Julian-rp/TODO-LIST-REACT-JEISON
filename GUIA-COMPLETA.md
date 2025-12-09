# 🚀 Guía Completa: TODO LIST REACT - Paso a Paso

Esta guía te llevará desde cero hasta tener tu aplicación completamente desplegada en producción.

---

## 📋 Índice

1. [Configuración Local](#1-configuración-local)
2. [Base de Datos en Railway](#2-base-de-datos-en-railway)
3. [Backend en Render](#3-backend-en-render)
4. [Frontend en Netlify](#4-frontend-en-netlify)
5. [Verificación Final](#5-verificación-final)

---

## 1. Configuración Local

### Paso 1.1: Verificar Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (v18 o superior)
- [MySQL](https://www.mysql.com/downloads/) (v8 o superior) - Solo para desarrollo local
- [Git](https://git-scm.com/)
- Un editor de código (VS Code recomendado)

Verifica las instalaciones:
```bash
node --version
npm --version
git --version
mysql --version
```

### Paso 1.2: Configurar Base de Datos Local (Opcional)

Si quieres probar localmente antes de desplegar:

```bash
# 1. Inicia MySQL en tu sistema
# Windows: Busca "Services" y inicia MySQL
# Mac/Linux: sudo service mysql start

# 2. Crea la base de datos
mysql -u root -p

# 3. Dentro de MySQL, ejecuta:
CREATE DATABASE todo_list;
USE todo_list;

# 4. Ejecuta el script de esquema
# Sal de MySQL (exit) y ejecuta:
cd db
mysql -u root -p todo_list < schema.sql
```

### Paso 1.3: Configurar Backend Local

```bash
# 1. Navega a la carpeta backend
cd backend

# 2. Instala las dependencias
npm install

# 3. Crea el archivo .env
# Windows (PowerShell):
copy env.example .env

# Mac/Linux:
cp env.example .env

# 4. Edita el archivo .env con tus credenciales locales:
# PORT=3000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=tu_contraseña_mysql
# DB_NAME=todo_list
# DB_PORT=3306
# JWT_SECRET=clave-secreta-para-desarrollo-local
# DB_SSL=false

# 5. Inicia el servidor
npm run dev
```

El backend debería estar corriendo en `http://localhost:3000`

Prueba el health check: `http://localhost:3000/api/health`

### Paso 1.4: Configurar Frontend Local

```bash
# 1. Abre una nueva terminal
# 2. Navega a la carpeta FRONTEND
cd FRONTEND

# 3. Instala las dependencias
npm install

# 4. Crea el archivo .env
# Windows (PowerShell):
New-Item -Path .env -ItemType File

# Mac/Linux:
touch .env

# 5. Agrega al archivo .env:
# VITE_API_URL=http://localhost:3000/api

# 6. Inicia el servidor de desarrollo
npm run dev
```

El frontend debería estar corriendo en `http://localhost:5173`

### Paso 1.5: Probar Localmente

1. Abre `http://localhost:5173` en tu navegador
2. Crea un usuario nuevo (se registrará automáticamente)
3. Crea algunas tareas
4. Prueba editar, completar y eliminar tareas

✅ **Si todo funciona localmente, estás listo para desplegar!**

---

## 2. Base de Datos en Railway

### Paso 2.1: Crear Cuenta en Railway

1. Ve a [Railway](https://railway.app/)
2. Haz clic en **"Start a New Project"** o **"Login"**
3. Inicia sesión con GitHub (recomendado) o email

### Paso 2.2: Crear Base de Datos MySQL

1. En el dashboard de Railway, haz clic en **"New Project"**
2. Selecciona **"New"** → **"Database"** → **"Add MySQL"**
3. Railway creará automáticamente una instancia de MySQL
4. Espera a que se complete la creación (1-2 minutos)

### Paso 2.3: Obtener Credenciales

1. Haz clic en tu servicio MySQL
2. Ve a la pestaña **"Variables"** o **"Connect"**
3. Anota estas variables (las necesitarás para el backend):

```
MYSQLHOST     → será tu DB_HOST
MYSQLUSER     → será tu DB_USER  
MYSQLPASSWORD → será tu DB_PASSWORD
MYSQLPORT     → será tu DB_PORT (generalmente 3306)
MYSQLDATABASE → será tu DB_NAME (generalmente "railway")
```

**⚠️ IMPORTANTE**: Guarda estas credenciales en un lugar seguro, las necesitarás en el siguiente paso.

### Paso 2.4: Crear las Tablas

Tienes dos opciones:

#### Opción A: Usando Railway Query (Recomendado)

1. En Railway, haz clic en tu servicio MySQL
2. Busca la opción **"Query"** o **"Connect"**
3. Ejecuta este SQL:

```sql
CREATE DATABASE IF NOT EXISTS railway;
USE railway;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(500) NOT NULL,
  author VARCHAR(50) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  editor VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_author (author),
  INDEX idx_completed (completed)
);
```

#### Opción B: Usando un Cliente MySQL

1. Descarga [MySQL Workbench](https://www.mysql.com/products/workbench/) o usa otro cliente
2. Conecta usando las credenciales de Railway
3. Ejecuta el script `db/schema.sql` (ajusta el nombre de la BD a "railway")

✅ **Base de datos lista!**

---

## 3. Backend en Render

### Paso 3.1: Subir Código a GitHub

Si aún no lo has hecho:

```bash
# 1. Asegúrate de estar en la raíz del proyecto
cd C:\Users\User\Documents\FORM-TO-DO

# 2. Inicializa git (si no está inicializado)
git init

# 3. Agrega todos los archivos
git add .

# 4. Crea el primer commit
git commit -m "Initial commit - TODO LIST REACT"

# 5. Crea un repositorio en GitHub
# Ve a https://github.com/new
# Nombre: TODO-LIST-REACT
# No marques "Initialize with README"

# 6. Conecta tu repositorio local con GitHub
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TODO-LIST-REACT.git
git push -u origin main
```

### Paso 3.2: Crear Cuenta en Render

1. Ve a [Render](https://render.com/)
2. Haz clic en **"Get Started for Free"**
3. Inicia sesión con GitHub (recomendado)

### Paso 3.3: Crear Web Service

1. En el dashboard de Render, haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub:
   - Si es la primera vez, autoriza a Render
   - Selecciona tu repositorio `TODO-LIST-REACT`
   - Haz clic en **"Connect"**

### Paso 3.4: Configurar el Servicio

Configura estos campos:

- **Name**: `todo-list-backend` (o el nombre que prefieras)
- **Region**: Elige la región más cercana (ej: `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **MUY IMPORTANTE - NO OLVIDES ESTO**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free` (suficiente para empezar)

### Paso 3.5: Configurar Variables de Entorno

En la sección **"Environment Variables"**, haz clic en **"Add Environment Variable"** y agrega:

#### Variables del Servidor:
```
Key: PORT
Value: 10000
```

#### Variables de Base de Datos (de Railway):
```
Key: DB_HOST
Value: [el MYSQLHOST de Railway]

Key: DB_USER
Value: [el MYSQLUSER de Railway]

Key: DB_PASSWORD
Value: [el MYSQLPASSWORD de Railway]

Key: DB_NAME
Value: railway

Key: DB_PORT
Value: 3306
```

#### Variable JWT Secret:
Genera una clave segura:

```bash
# En tu terminal local:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copia el resultado y agrega:
```
Key: JWT_SECRET
Value: [el resultado del comando anterior]
```

### Paso 3.6: Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir tu backend
3. Espera 2-5 minutos mientras se completa el build
4. Revisa los logs para asegurarte de que no hay errores

### Paso 3.7: Verificar el Despliegue

1. Una vez completado, Render te dará una URL como:
   `https://todo-list-backend.onrender.com`

2. Prueba el health check:
   ```
   https://tu-backend.onrender.com/api/health
   ```

3. Deberías ver:
   ```json
   {
     "status": "OK",
     "message": "Server is running"
   }
   ```

✅ **Backend desplegado!** Guarda esta URL, la necesitarás para el frontend.

---

## 4. Frontend en Netlify

### Paso 4.1: Crear Cuenta en Netlify

1. Ve a [Netlify](https://www.netlify.com/)
2. Haz clic en **"Sign up"**
3. Inicia sesión con GitHub (recomendado)

### Paso 4.2: Conectar Repositorio

1. En el dashboard de Netlify, haz clic en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Elige **"GitHub"** y autoriza a Netlify si es necesario
4. Busca y selecciona tu repositorio `TODO-LIST-REACT`
5. Haz clic en **"Import"**

### Paso 4.3: Configurar el Build

Netlify debería detectar automáticamente la configuración desde `netlify.toml`, pero verifica:

- **Base directory**: `FRONTEND`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Si no se detecta automáticamente, configúralo manualmente.

### Paso 4.4: Configurar Variables de Entorno

1. Antes de desplegar, haz clic en **"Show advanced"** o busca **"Environment variables"**
2. Haz clic en **"New variable"**
3. Agrega:
   ```
   Key: VITE_API_URL
   Value: https://tu-backend.onrender.com/api
   ```
   (Reemplaza `tu-backend.onrender.com` con la URL real de tu backend en Render)

### Paso 4.5: Desplegar

1. Haz clic en **"Deploy site"**
2. Espera a que termine el build (2-5 minutos)
3. Netlify te dará una URL como: `https://amazing-app-123.netlify.app`

### Paso 4.6: Verificar el Despliegue

1. Abre la URL de Netlify en tu navegador
2. Deberías ver la página de login
3. Intenta crear un usuario y una tarea
4. Verifica que todo funcione correctamente

✅ **Frontend desplegado!**

---

## 5. Verificación Final

### Checklist de Verificación

- [ ] Base de datos MySQL creada en Railway
- [ ] Tablas creadas en la base de datos
- [ ] Backend desplegado en Render
- [ ] Health check del backend funciona (`/api/health`)
- [ ] Frontend desplegado en Netlify
- [ ] Variable `VITE_API_URL` configurada en Netlify
- [ ] Puedo crear usuarios en el frontend
- [ ] Puedo crear tareas
- [ ] Puedo editar tareas
- [ ] Puedo completar tareas
- [ ] Puedo eliminar tareas
- [ ] La búsqueda funciona
- [ ] Los filtros funcionan

### Pruebas Finales

1. **Prueba de Registro/Login**:
   - Crea un nuevo usuario desde el frontend
   - Verifica que puedas iniciar sesión

2. **Prueba de Tareas**:
   - Crea varias tareas
   - Edita una tarea
   - Marca una como completada
   - Elimina una tarea

3. **Prueba de Búsqueda y Filtros**:
   - Busca tareas por texto
   - Filtra por "Todo", "Pendiente", "Completado"

4. **Prueba de Persistencia**:
   - Cierra el navegador
   - Vuelve a abrir y verifica que tus tareas sigan ahí

---

## 🐛 Solución de Problemas Comunes

### El backend no se conecta a la base de datos

- Verifica que las credenciales de Railway sean correctas
- Asegúrate de que `DB_NAME` sea `railway` (no `todo_list`)
- Verifica que las tablas estén creadas

### El frontend no se conecta al backend

- Verifica que `VITE_API_URL` esté configurada correctamente en Netlify
- Asegúrate de que la URL termine en `/api`
- Verifica que el backend esté corriendo (prueba el health check)

### Error 404 en las rutas del frontend

- Verifica que el archivo `public/_redirects` exista
- Asegúrate de que `netlify.toml` tenga la configuración de redirects

### El backend se "duerme" en Render

- En el plan Free, Render "duerme" los servicios después de 15 minutos de inactividad
- La primera petición puede tardar ~30 segundos en "despertar"
- Considera usar un servicio de ping para mantenerlo activo, o actualizar a un plan de pago

### Error de CORS

- Verifica que el backend tenga `cors` configurado
- Asegúrate de que la URL del frontend esté permitida en CORS

---

## 📚 Recursos Adicionales

- [Documentación de Railway](https://docs.railway.app/)
- [Documentación de Render](https://render.com/docs)
- [Documentación de Netlify](https://docs.netlify.com/)
- [Guía detallada de Netlify](./FRONTEND/DEPLOY-NETLIFY.md)
- [Guía detallada de Render](./backend/DEPLOY-RENDER.md)

---

## 🎉 ¡Felicitaciones!

Tu aplicación TODO LIST REACT está completamente desplegada y funcionando en producción!

**URLs importantes:**
- Frontend: `https://tu-sitio.netlify.app`
- Backend: `https://tu-backend.onrender.com`
- Base de datos: Railway (accesible desde el dashboard)

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

1. **Backend**:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```
   Render desplegará automáticamente

2. **Frontend**:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```
   Netlify desplegará automáticamente

3. **Base de datos**: Los cambios en esquemas requieren ejecutar SQL manualmente en Railway

---

¡Disfruta de tu aplicación desplegada! 🚀


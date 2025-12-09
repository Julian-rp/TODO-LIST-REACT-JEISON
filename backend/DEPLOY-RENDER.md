# 🚀 Guía de Despliegue del Backend en Render

Esta guía te ayudará a desplegar el backend de TODO LIST REACT en Render.

## 📋 Prerrequisitos

1. Una cuenta en [Render](https://render.com/)
2. Tu proyecto subido a GitHub
3. Una base de datos MySQL desplegada en Railway (o local para pruebas)
4. Las credenciales de la base de datos MySQL

## 🎯 Paso 1: Preparar la Base de Datos en Railway

**IMPORTANTE**: Primero debes tener la base de datos MySQL desplegada en Railway.

### 1.1. Crear MySQL en Railway

1. Ve a [Railway](https://railway.app/) e inicia sesión
2. Haz clic en **"New Project"**
3. Selecciona **"New"** → **"Database"** → **"Add MySQL"**
4. Railway creará automáticamente una instancia de MySQL

### 1.2. Obtener Credenciales de la Base de Datos

1. Haz clic en tu servicio MySQL
2. Ve a la pestaña **"Variables"**
3. Anota las siguientes variables (las necesitarás para el backend):
   - `MYSQLHOST` → será tu `DB_HOST`
   - `MYSQLUSER` → será tu `DB_USER`
   - `MYSQLPASSWORD` → será tu `DB_PASSWORD`
   - `MYSQLPORT` → será el puerto (generalmente 3306)
   - `MYSQLDATABASE` → será tu `DB_NAME`

### 1.3. Crear las Tablas en la Base de Datos

1. En Railway, ve a tu servicio MySQL
2. Haz clic en **"Connect"** o **"Query"**
3. Ejecuta el script `db/schema.sql` que está en tu proyecto:

```sql
CREATE DATABASE IF NOT EXISTS todo_list;
USE todo_list;

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

## 🎯 Paso 2: Subir el Código a GitHub

Si aún no lo has hecho:

```bash
# Asegúrate de estar en la raíz del proyecto
git init
git add .
git commit -m "Backend ready for deployment"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TODO-LIST-REACT.git
git push -u origin main
```

## 🎯 Paso 3: Crear el Web Service en Render

### 3.1. Crear Nuevo Servicio

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub (si es la primera vez, autoriza a Render)
4. Selecciona tu repositorio `TODO-LIST-REACT`

### 3.2. Configurar el Servicio

Configura los siguientes campos:

- **Name**: `todo-list-backend` (o el nombre que prefieras)
- **Region**: Elige la región más cercana a tus usuarios
- **Branch**: `main` (o la rama que uses)
- **Root Directory**: `backend` ⚠️ **MUY IMPORTANTE**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3.3. Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega todas estas variables:

```
PORT=10000
```

**Base de Datos (de Railway)**:
```
DB_HOST=tu-host-de-railway.mysql.railway.app
DB_USER=root
DB_PASSWORD=tu-contraseña-de-railway
DB_NAME=railway
DB_PORT=3306
```

**JWT Secret** (genera uno seguro):
```
JWT_SECRET=tu-secret-key-super-seguro-y-largo-cambiar-en-produccion
```

**CORS** (opcional, para permitir tu frontend):
```
CORS_ORIGIN=https://tu-sitio.netlify.app
```

### 3.4. Plan y Desplegar

1. Selecciona el plan (el **Free** es suficiente para empezar)
2. Haz clic en **"Create Web Service"**
3. Render comenzará a construir y desplegar tu backend

## 🎯 Paso 4: Verificar el Despliegue

### 4.1. Verificar el Build

1. Espera a que termine el build (puede tardar 2-5 minutos)
2. Revisa los logs para asegurarte de que no hay errores
3. Si hay errores, revisa:
   - Que el Root Directory sea `backend`
   - Que todas las variables de entorno estén configuradas
   - Que las credenciales de la base de datos sean correctas

### 4.2. Probar el Endpoint

Una vez desplegado, Render te dará una URL como: `https://todo-list-backend.onrender.com`

Prueba el health check:
```
https://tu-backend.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🎯 Paso 5: Actualizar el Frontend

Una vez que tengas la URL de tu backend en Render:

1. Ve a Netlify (donde desplegaste el frontend)
2. Ve a **"Site settings"** → **"Environment variables"**
3. Actualiza `VITE_API_URL` con la URL de tu backend:
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api
   ```
4. Redespliega el frontend para que tome los cambios

## ⚙️ Configuración Avanzada

### Variables de Entorno Importantes

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor (Render usa 10000) | `10000` |
| `DB_HOST` | Host de MySQL en Railway | `containers-us-west-xxx.railway.app` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `tu-password` |
| `DB_NAME` | Nombre de la base de datos | `railway` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `JWT_SECRET` | Clave secreta para JWT | `clave-super-segura-123` |

### Generar un JWT_SECRET Seguro

Puedes generar uno con Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Configurar CORS para el Frontend

Si tu frontend está en Netlify, agrega:

```
CORS_ORIGIN=https://tu-sitio.netlify.app
```

Y actualiza `backend/server.js` para usar esta variable si es necesario.

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

- Verifica que las credenciales de Railway sean correctas
- Asegúrate de que el `DB_HOST` incluya el puerto si es necesario
- Verifica que la base de datos esté corriendo en Railway

### Error: "Build failed"

- Verifica que el Root Directory sea `backend`
- Revisa que `package.json` tenga el script `start`
- Revisa los logs de build para ver el error específico

### Error: "Module not found"

- Asegúrate de que todas las dependencias estén en `package.json`
- Verifica que el build command sea `npm install`

### El servidor se detiene después de unos minutos

- En el plan Free de Render, los servicios se "duermen" después de 15 minutos de inactividad
- La primera petición puede tardar ~30 segundos en "despertar" el servicio
- Considera usar un servicio de "ping" para mantenerlo activo, o actualizar a un plan de pago

## 📚 Recursos

- [Documentación de Render](https://render.com/docs)
- [Desplegar Node.js en Render](https://render.com/docs/deploy-node-express-app)
- [Variables de entorno en Render](https://render.com/docs/environment-variables)
- [Railway MySQL](https://docs.railway.app/databases/mysql)

## ✅ Checklist de Despliegue

- [ ] Base de datos MySQL creada en Railway
- [ ] Tablas creadas en la base de datos (schema.sql ejecutado)
- [ ] Código subido a GitHub
- [ ] Web Service creado en Render
- [ ] Root Directory configurado como `backend`
- [ ] Variables de entorno configuradas
- [ ] Build completado exitosamente
- [ ] Health check funcionando
- [ ] Frontend actualizado con la URL del backend

---

¡Tu backend debería estar funcionando ahora! 🎉


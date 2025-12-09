# Backend - TODO LIST REACT

API REST construida con Express.js para gestionar usuarios y tareas.

## 🚀 Tecnologías

- Express.js
- MySQL2
- JWT (JSON Web Tokens)
- bcryptjs
- CORS

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copia el archivo `.env.example` a `.env`
2. Configura las variables de entorno:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=todo_list
JWT_SECRET=tu-secret-key-seguro
```

## 🚀 Desarrollo

```bash
npm run dev
```

## 🏗️ Producción

```bash
npm start
```

## 📡 Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Tareas (requieren autenticación)
- `GET /api/tasks` - Obtener todas las tareas
- `GET /api/tasks/:id` - Obtener tarea por ID
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Health Check
- `GET /api/health` - Estado del servidor

## 🚢 Despliegue en Render

### Pasos Rápidos:

1. **Preparar Base de Datos en Railway**:
   - Crea una cuenta en [Railway](https://railway.app/)
   - Crea un nuevo proyecto MySQL
   - Ejecuta el script `db/schema.sql` en la base de datos
   - Anota las credenciales (host, usuario, contraseña, nombre de BD)

2. **Subir código a GitHub** (si aún no lo has hecho)

3. **Crear Web Service en Render**:
   - Ve a [Render](https://render.com/)
   - "New +" → "Web Service"
   - Conecta tu repositorio de GitHub
   - Configura:
     - **Root Directory**: `backend` ⚠️
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Configurar Variables de Entorno**:
   ```
   PORT=10000
   DB_HOST=tu-host-de-railway
   DB_USER=root
   DB_PASSWORD=tu-contraseña
   DB_NAME=railway
   DB_PORT=3306
   JWT_SECRET=tu-secret-key-seguro
   ```

5. **Desplegar y verificar**:
   - Haz clic en "Create Web Service"
   - Espera a que termine el build
   - Prueba: `https://tu-backend.onrender.com/api/health`

📖 **Guía completa**: Ver `DEPLOY-RENDER.md` para instrucciones detalladas paso a paso.


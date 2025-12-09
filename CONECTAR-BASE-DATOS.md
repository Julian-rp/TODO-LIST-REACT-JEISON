# 🔌 Cómo Conectar la Base de Datos MySQL con la Aplicación

## 📋 Flujo de Conexión

```
Frontend (React) → Backend (Express) → Base de Datos (MySQL)
```

El frontend NO se conecta directamente a MySQL. El backend actúa como intermediario.

---

## 🎯 Paso 1: Verificar que la Base de Datos Existe

Primero, asegúrate de que tu base de datos MySQL esté corriendo y tenga las tablas creadas.

### 1.1. Verificar que MySQL está corriendo

```bash
# Windows: Busca "Services" y verifica que MySQL esté "Running"
# O ejecuta en terminal:
mysql --version
```

### 1.2. Crear la Base de Datos (si no la has creado)

```bash
# Conecta a MySQL
mysql -u root -p

# Dentro de MySQL, ejecuta:
CREATE DATABASE IF NOT EXISTS todo_list;
USE todo_list;
```

### 1.3. Crear las Tablas

Tienes dos opciones:

#### Opción A: Desde la terminal (Recomendado)

```bash
# Desde la raíz del proyecto
cd db
mysql -u root -p todo_list < schema.sql
```

#### Opción B: Desde MySQL directamente

```bash
mysql -u root -p

# Luego ejecuta:
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

---

## 🎯 Paso 2: Configurar el Backend

### 2.1. Navegar a la carpeta backend

```bash
cd backend
```

### 2.2. Crear el archivo .env

**Windows (PowerShell):**
```powershell
Copy-Item env.example .env
```

**Windows (CMD):**
```cmd
copy env.example .env
```

**Mac/Linux:**
```bash
cp env.example .env
```

### 2.3. Editar el archivo .env

Abre el archivo `.env` en el editor y configura tus credenciales de MySQL:

```env
# Server
PORT=3000

# Database - CAMBIA ESTOS VALORES CON TUS CREDENCIALES
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=todo_list
DB_PORT=3306

# JWT
JWT_SECRET=clave-secreta-para-desarrollo-cambiar-en-produccion

# SSL (para desarrollo local, siempre false)
DB_SSL=false
```

**⚠️ IMPORTANTE**: Reemplaza:
- `tu_contraseña_mysql` → Tu contraseña real de MySQL
- Si tu usuario no es `root`, cambia `DB_USER`
- Si tu base de datos tiene otro nombre, cambia `DB_NAME`

### 2.4. Instalar dependencias (si no lo has hecho)

```bash
npm install
```

---

## 🎯 Paso 3: Iniciar el Backend

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# O modo producción
npm start
```

### 3.1. Verificar la Conexión

Deberías ver en la consola:
```
✅ Database connected successfully
🚀 Server running on port 3000
```

Si ves un error, verifica:
- Que MySQL esté corriendo
- Que las credenciales en `.env` sean correctas
- Que la base de datos y las tablas existan

### 3.2. Probar el Backend

Abre tu navegador y ve a:
```
http://localhost:3000/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🎯 Paso 4: Configurar el Frontend

### 4.1. Navegar a la carpeta FRONTEND

```bash
# En una nueva terminal
cd FRONTEND
```

### 4.2. Crear el archivo .env

**Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**Windows (CMD):**
```cmd
type nul > .env
```

**Mac/Linux:**
```bash
touch .env
```

### 4.3. Configurar la URL del Backend

Abre el archivo `.env` y agrega:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4.4. Iniciar el Frontend

```bash
npm install  # Si no has instalado las dependencias
npm run dev
```

El frontend debería estar en `http://localhost:5173`

---

## 🎯 Paso 5: Probar la Conexión Completa

1. **Abre el navegador**: `http://localhost:5173`
2. **Crea un usuario**: Ingresa usuario y contraseña (se creará automáticamente)
3. **Crea una tarea**: Agrega una nueva tarea
4. **Verifica en MySQL** que los datos se guardaron:

```bash
mysql -u root -p

USE todo_list;

# Ver usuarios
SELECT * FROM users;

# Ver tareas
SELECT * FROM tasks;
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

**Causas posibles:**
1. MySQL no está corriendo
   - **Solución**: Inicia el servicio MySQL

2. Credenciales incorrectas en `.env`
   - **Solución**: Verifica usuario, contraseña y nombre de base de datos

3. La base de datos no existe
   - **Solución**: Crea la base de datos con `CREATE DATABASE todo_list;`

4. Las tablas no existen
   - **Solución**: Ejecuta `db/schema.sql`

### Error: "Access denied for user"

**Causa**: Usuario o contraseña incorrectos

**Solución**: 
1. Verifica que puedas conectarte con:
   ```bash
   mysql -u root -p
   ```
2. Si funciona, copia exactamente las mismas credenciales al `.env`

### Error: "Unknown database 'todo_list'"

**Causa**: La base de datos no existe

**Solución**: 
```bash
mysql -u root -p
CREATE DATABASE todo_list;
```

### El frontend no se conecta al backend

**Causas posibles:**
1. El backend no está corriendo
   - **Solución**: Inicia el backend con `npm run dev` en la carpeta `backend`

2. La URL en `.env` del frontend es incorrecta
   - **Solución**: Verifica que sea `http://localhost:3000/api`

3. Error de CORS
   - **Solución**: El backend ya tiene CORS configurado, pero verifica que esté corriendo

---

## ✅ Checklist de Verificación

- [ ] MySQL está corriendo
- [ ] Base de datos `todo_list` existe
- [ ] Tablas `users` y `tasks` están creadas
- [ ] Archivo `.env` creado en `backend/`
- [ ] Credenciales correctas en `.env`
- [ ] Backend iniciado y muestra "Database connected successfully"
- [ ] Health check funciona: `http://localhost:3000/api/health`
- [ ] Archivo `.env` creado en `FRONTEND/`
- [ ] `VITE_API_URL` configurado en `.env` del frontend
- [ ] Frontend iniciado
- [ ] Puedo crear usuarios desde el frontend
- [ ] Puedo crear tareas desde el frontend
- [ ] Los datos se guardan en MySQL

---

## 📝 Resumen de Archivos .env

### backend/.env
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=todo_list
DB_PORT=3306
JWT_SECRET=clave-secreta
DB_SSL=false
```

### FRONTEND/.env
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 Siguiente Paso

Una vez que todo funcione localmente, puedes seguir con el despliegue:
- Ver [GUIA-COMPLETA.md](./GUIA-COMPLETA.md) para desplegar en producción

---

¡Listo! Tu aplicación debería estar conectada a la base de datos MySQL. 🎉


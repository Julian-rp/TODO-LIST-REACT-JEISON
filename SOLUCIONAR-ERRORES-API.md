# 🔧 Solucionar Errores 401 y 500 en la API

## 🐛 Errores Actuales

- **Error 401**: `/api/auth/login` - Unauthorized
- **Error 500**: `/api/auth/register` - Internal Server Error

## 🔍 Causas Posibles

### 1. Base de Datos sin Tablas

El error 500 en `/api/auth/register` generalmente significa que:
- Las tablas `users` y `tasks` no existen en Railway
- O hay un error de conexión a la base de datos

### 2. Variables de Entorno no Configuradas

El backend necesita las credenciales de Railway en Render.

---

## ✅ Solución Paso a Paso

### Paso 1: Corregir las Tablas en Railway

**⚠️ ERROR ACTUAL:** `Field 'updated_at' doesn't have a default value`

1. Ve a [Railway Dashboard](https://railway.app/)
2. Haz clic en tu servicio MySQL
3. Ve a la pestaña **"Data"** o **"Query"**
4. Ejecuta este SQL para corregir las tablas:

```sql
-- Si las tablas ya existen, corrige los defaults:
ALTER TABLE users 
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE tasks 
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

**O si las tablas no existen, créalas con:**

```sql
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

> 💡 **Nota:** También puedes usar el archivo `db/fix-schema-railway.sql` que contiene estos comandos.

### Paso 2: Verificar Variables de Entorno en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en tu servicio `todo-list-backend`
3. Ve a **"Environment"**
4. Verifica que estas variables estén configuradas:

```
DB_HOST=maglev.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=KHDTGJLoYVntrRlNFiEZUvTrAGRxvsHw
DB_NAME=railway
DB_PORT=58428
JWT_SECRET=clave-secreta-super-segura-cambiar-en-produccion-12345
DB_SSL=true
```

### Paso 3: Verificar los Logs en Render

1. En Render, ve a **"Logs"**
2. Busca mensajes como:
   - `✅ Database connected successfully` → ✅ Base de datos conectada
   - `❌ Database connection error` → ❌ Error de conexión

### Paso 4: Probar el Backend Directamente

Abre en tu navegador:
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

Si ves esto, el backend está funcionando.

### Paso 5: Probar el Registro de Usuario

Usa Postman, curl, o la consola del navegador:

```javascript
fetch('https://tu-backend.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'test',
    password: '123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

Si funciona, deberías ver un token y datos del usuario.

---

## 🔧 Correcciones Realizadas en el Código

1. ✅ Corregido `user.name` → ahora usa `user.username` del backend
2. ✅ Simplificado el envío de datos al crear tareas
3. ✅ Mejorado el manejo de errores

---

## 📝 Checklist de Verificación

- [ ] Tablas `users` y `tasks` creadas en Railway
- [ ] Variables de entorno configuradas en Render
- [ ] Health check funciona: `https://tu-backend.onrender.com/api/health`
- [ ] Logs en Render muestran: `✅ Database connected successfully`
- [ ] Variable `VITE_API_URL` configurada en Netlify
- [ ] Frontend redesplegado en Netlify

---

## 🚨 Si el Error Persiste

1. **Revisa los logs en Render** para ver el error específico
2. **Verifica que la base de datos esté corriendo** en Railway
3. **Prueba el registro directamente** con curl o Postman
4. **Verifica que las credenciales** en Render sean correctas

---

¡Con estos pasos deberías poder solucionar los errores! 🚀


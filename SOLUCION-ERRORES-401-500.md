# 🔧 Solución para Errores 401 y 500

## 🐛 Errores Actuales

1. **Error 401** en `/api/auth/login` - Unauthorized
2. **Error 500** en `/api/tasks` - Internal Server Error

---

## ✅ Solución 1: Error 500 en Tasks (Corregido)

El error 500 en `/api/tasks` se debía a que el INSERT no incluía `created_at` y `updated_at`. **Ya está corregido en el código.**

**Cambio realizado:**
```javascript
// Antes:
'INSERT INTO tasks (text, author, completed, editor) VALUES (?, ?, ?, ?)'

// Ahora:
'INSERT INTO tasks (text, author, completed, editor, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())'
```

---

## ✅ Solución 2: Error 401 en Login

El error 401 puede deberse a:

### A. Usuario no existe (Primera vez)

Si es la primera vez que intentas iniciar sesión, el código debería intentar registrarte automáticamente. Si el registro falla, verifica:

1. **Las tablas en Railway están correctas:**
   - Ejecuta el SQL de `db/fix-schema-railway.sql` en Railway
   - O verifica que las tablas tengan los defaults correctos

2. **Variables de entorno en Render:**
   - `JWT_SECRET` debe estar configurado
   - Todas las variables de base de datos deben estar correctas

### B. Token inválido o expirado

Si ya te registraste antes pero ahora obtienes 401:

1. **Limpia el localStorage:**
   - Abre DevTools (F12)
   - Ve a "Application" → "Local Storage"
   - Elimina `auth_token` y `auth_user`
   - Intenta registrarte de nuevo

2. **Verifica que el JWT_SECRET sea el mismo:**
   - El token se genera con `JWT_SECRET` en Render
   - Si cambiaste el secret, los tokens antiguos no funcionarán

---

## 🔍 Verificación Paso a Paso

### 1. Verificar que las Tablas Estén Correctas en Railway

Ejecuta este SQL en Railway:

```sql
-- Verificar estructura de users
DESCRIBE users;

-- Verificar estructura de tasks
DESCRIBE tasks;
```

Ambas tablas deben tener:
- `created_at` con `DEFAULT CURRENT_TIMESTAMP`
- `updated_at` con `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`

Si no, ejecuta:

```sql
ALTER TABLE users 
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE tasks 
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

### 2. Verificar Variables de Entorno en Render

En Render → Environment, verifica:

```
DB_HOST=maglev.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=KHDTGJLoYVntrRlNFiEZUvTrAGRxvsHw
DB_NAME=railway
DB_PORT=58428
JWT_SECRET=clave-secreta-super-segura-cambiar-en-produccion-12345
DB_SSL=true
```

### 3. Probar el Backend Directamente

Abre en tu navegador:
```
https://todo-list-react-jeison.onrender.com/api/health
```

Deberías ver: `{"status":"OK","message":"Server is running"}`

### 4. Probar Registro con curl o Postman

```bash
curl -X POST https://todo-list-react-jeison.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123"}'
```

O desde la consola del navegador en tu frontend:

```javascript
fetch('https://todo-list-react-jeison.onrender.com/api/auth/register', {
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

---

## 📝 Checklist de Verificación

- [ ] Tablas `users` y `tasks` corregidas en Railway (con defaults)
- [ ] Variables de entorno configuradas en Render
- [ ] Backend redesplegado después de los cambios
- [ ] Health check funciona: `/api/health`
- [ ] Registro funciona directamente (curl/Postman)
- [ ] Frontend redesplegado en Netlify con `VITE_API_URL` configurada
- [ ] localStorage limpiado si hay tokens antiguos

---

## 🚨 Si el Error Persiste

1. **Revisa los logs en Render:**
   - Ve a Render → Logs
   - Busca errores específicos
   - Comparte el error exacto si necesitas ayuda

2. **Revisa la consola del navegador:**
   - Abre DevTools (F12)
   - Ve a "Network"
   - Haz clic en la petición que falla
   - Revisa la respuesta del servidor

3. **Verifica CORS:**
   - El backend debe permitir el origen de Netlify
   - Revisa los logs en Render para errores de CORS

---

¡Con estos pasos deberías poder solucionar los errores! 🚀


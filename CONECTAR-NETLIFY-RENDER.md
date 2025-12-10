# 🔗 Conectar Netlify (Frontend) con Render (Backend)

Guía completa paso a paso para conectar tu frontend en Netlify con tu backend en Render.

---

## 📋 Prerrequisitos

- ✅ Backend desplegado en Render y funcionando
- ✅ Frontend desplegado en Netlify (o listo para desplegar)
- ✅ URL del backend en Render (ej: `https://todo-list-react-jeison.onrender.com`)

---

## 🎯 Paso 1: Obtener la URL de tu Backend en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en tu servicio `todo-list-backend`
3. Copia la URL que aparece en la parte superior (ej: `https://todo-list-react-jeison.onrender.com`)
4. **IMPORTANTE**: Agrega `/api` al final para la variable de entorno:
   - URL completa: `https://todo-list-react-jeison.onrender.com/api`

---

## 🎯 Paso 2: Configurar Variable de Entorno en Netlify

### 2.1. Ir a Environment Variables

1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Selecciona tu sitio (el frontend)
3. Ve a **"Site settings"** (Configuración del sitio)
4. En el menú lateral, haz clic en **"Environment variables"**

### 2.2. Agregar la Variable

1. Haz clic en **"Add a variable"** o **"Add variable"**
2. Configura:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tu-backend.onrender.com/api`
   
   **Ejemplo:**
   ```
   Key: VITE_API_URL
   Value: https://todo-list-react-jeison.onrender.com/api
   ```
   
   ⚠️ **IMPORTANTE**: 
   - La URL debe terminar en `/api`
   - No debe tener barra al final: `/api` ✅ (correcto), `/api/` ❌ (incorrecto)
   - Debe usar `https://` (no `http://`)

3. Haz clic en **"Save"** o **"Add variable"**

### 2.3. Redesplegar

1. Después de agregar la variable, Netlify debería redesplegar automáticamente
2. Si no, ve a **"Deploys"** y haz clic en **"Trigger deploy"** → **"Deploy site"**
3. Espera a que termine el build

---

## 🎯 Paso 3: Configurar CORS en Render (Opcional pero Recomendado)

Para mayor seguridad, configura CORS en el backend para permitir solo tu dominio de Netlify.

### 3.1. Obtener la URL de Netlify

1. En Netlify, tu sitio tiene una URL como: `https://tu-sitio.netlify.app`
2. Copia esta URL completa (sin `/` al final)

### 3.2. Agregar Variable en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en tu servicio `todo-list-backend`
3. Ve a **"Environment"** en el menú lateral
4. Agrega esta variable:
   ```
   Key: CORS_ORIGIN
   Value: https://tu-sitio.netlify.app
   ```
5. Haz clic en **"Save Changes"**
6. Render redesplegará automáticamente

---

## 🎯 Paso 4: Verificar la Conexión

### 4.1. Probar el Backend

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

### 4.2. Probar el Frontend

1. Abre tu sitio en Netlify: `https://tu-sitio.netlify.app`
2. Abre la consola del navegador (F12)
3. Intenta crear un usuario o una tarea
4. Verifica que no haya errores de CORS en la consola

### 4.3. Verificar en la Consola del Navegador

Si ves errores como:
- `CORS policy: No 'Access-Control-Allow-Origin' header`
- `Failed to fetch`
- `Network Error`

Significa que CORS no está configurado correctamente. Revisa el Paso 3.

---

## ✅ Checklist de Verificación

- [ ] Backend desplegado en Render y funcionando
- [ ] Health check del backend funciona: `/api/health`
- [ ] Variable `VITE_API_URL` configurada en Netlify
- [ ] Variable `CORS_ORIGIN` configurada en Render (opcional pero recomendado)
- [ ] Frontend redesplegado en Netlify
- [ ] Puedo crear usuarios desde el frontend
- [ ] Puedo crear tareas desde el frontend
- [ ] No hay errores de CORS en la consola del navegador

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch" o "Network Error"

**Causas posibles:**
1. La URL del backend es incorrecta
   - **Solución**: Verifica que `VITE_API_URL` termine en `/api`
   - Verifica que la URL del backend sea correcta

2. El backend está "dormido" (plan Free de Render)
   - **Solución**: Espera ~30 segundos y vuelve a intentar
   - La primera petición puede tardar en "despertar" el servicio

3. Error de CORS
   - **Solución**: Configura `CORS_ORIGIN` en Render con la URL de Netlify

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Solución:**
1. Agrega `CORS_ORIGIN` en Render con la URL de Netlify
2. O verifica que `cors()` esté configurado en `backend/server.js`

### El frontend no se actualiza después de cambiar la variable

**Solución:**
1. Ve a Netlify → Deploys
2. Haz clic en "Trigger deploy" → "Deploy site"
3. Espera a que termine el build

### El backend no responde

**Solución:**
1. Verifica que el backend esté "Live" en Render
2. Prueba el health check: `https://tu-backend.onrender.com/api/health`
3. Revisa los logs en Render para ver errores

---

## 📝 Resumen de URLs y Variables

### Netlify (Frontend)
- **URL del sitio**: `https://tu-sitio.netlify.app`
- **Variable de entorno**: 
  ```
  VITE_API_URL=https://tu-backend.onrender.com/api
  ```

### Render (Backend)
- **URL del backend**: `https://tu-backend.onrender.com`
- **Health check**: `https://tu-backend.onrender.com/api/health`
- **Variables de entorno**:
  ```
  PORT=10000 (o el que Render asigne)
  DB_HOST=maglev.proxy.rlwy.net
  DB_USER=root
  DB_PASSWORD=KHDTGJLoYVntrRlNFiEZUvTrAGRxvsHw
  DB_NAME=railway
  DB_PORT=58428
  JWT_SECRET=clave-secreta-super-segura
  DB_SSL=true
  CORS_ORIGIN=https://tu-sitio.netlify.app (opcional)
  DATABASE_URL=mysql://root:KHDTGJLoYVntrRlNFiEZUvTrAGRxvsHw@maglev.proxy.rlwy.net:58428/railway
  ```

---

## 🎉 ¡Listo!

Una vez configurado todo, tu aplicación debería funcionar completamente:
- Frontend en Netlify ✅
- Backend en Render ✅
- Base de datos en Railway ✅
- Todo conectado y funcionando ✅

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

1. **Backend**: 
   ```bash
   git add .
   git commit -m "Descripción"
   git push
   ```
   Render desplegará automáticamente

2. **Frontend**:
   ```bash
   git add .
   git commit -m "Descripción"
   git push
   ```
   Netlify desplegará automáticamente

Las variables de entorno se mantienen, así que no necesitas reconfigurarlas.

---

¡Tu aplicación está completamente conectada! 🚀


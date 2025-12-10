# ⚙️ Configurar VITE_API_URL en Netlify

## 🚨 Problema Actual

El frontend está intentando conectarse a `localhost:3000` en lugar de Render. Esto se debe a que la variable de entorno `VITE_API_URL` no está configurada en Netlify.

**Error en consola:**
```
ERR_CONNECTION_REFUSED localhost:3000/api/auth/login
```

---

## ✅ Solución: Configurar Variable de Entorno

### Paso 1: Obtener la URL de tu Backend en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en tu servicio `todo-list-backend`
3. Copia la URL que aparece (ej: `https://todo-list-react-jeison.onrender.com`)
4. **Agrega `/api` al final:**
   ```
   https://todo-list-react-jeison.onrender.com/api
   ```

### Paso 2: Configurar en Netlify

1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Selecciona tu sitio (el frontend)
3. Ve a **"Site settings"** → **"Environment variables"**
4. Haz clic en **"Add a variable"**
5. Configura:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://todo-list-react-jeison.onrender.com/api`
   
   ⚠️ **IMPORTANTE:**
   - La URL debe terminar en `/api` (sin barra final)
   - Debe usar `https://` (no `http://`)
   - Reemplaza `todo-list-react-jeison.onrender.com` con tu URL real

6. Haz clic en **"Save"**

### Paso 3: Redesplegar el Frontend

**IMPORTANTE:** Después de agregar la variable, debes redesplegar:

1. En Netlify, ve a **"Deploys"**
2. Haz clic en **"Trigger deploy"** → **"Deploy site"**
3. O simplemente haz un push a tu repositorio (si tienes auto-deploy activado)

---

## 🔍 Verificar que Funciona

### Opción 1: Verificar en el Código Desplegado

1. Ve a tu sitio en Netlify
2. Abre las DevTools (F12)
3. Ve a la pestaña **"Network"**
4. Intenta hacer login
5. Verifica que las peticiones vayan a:
   ```
   https://todo-list-react-jeison.onrender.com/api/auth/login
   ```
   (NO a `localhost:3000`)

### Opción 2: Verificar en la Consola

Abre la consola del navegador y ejecuta:

```javascript
console.log(import.meta.env.VITE_API_URL);
```

Deberías ver tu URL de Render, no `undefined`.

---

## 📝 Checklist

- [ ] Variable `VITE_API_URL` agregada en Netlify
- [ ] Valor correcto: `https://tu-backend.onrender.com/api`
- [ ] Frontend redesplegado después de agregar la variable
- [ ] Verificado que las peticiones van a Render (no a localhost)

---

## 🚨 Si Aún No Funciona

1. **Verifica que el backend esté funcionando:**
   ```
   https://todo-list-react-jeison.onrender.com/api/health
   ```
   Deberías ver: `{"status":"OK","message":"Server is running"}`

2. **Verifica CORS en Render:**
   - El backend debe permitir el origen de Netlify
   - Revisa los logs en Render para errores de CORS

3. **Limpia la caché del navegador:**
   - Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

4. **Verifica que la variable esté en el build:**
   - Las variables `VITE_*` se inyectan en tiempo de build
   - Si agregaste la variable después del último deploy, debes redesplegar

---

¡Con estos pasos deberías poder conectar Netlify con Render! 🚀


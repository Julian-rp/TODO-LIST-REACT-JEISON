# ⚡ Resumen Rápido - TODO LIST REACT

Guía rápida de referencia para el despliegue.

## 🎯 Orden de Despliegue

```
1. Base de Datos (Railway) → 2. Backend (Render) → 3. Frontend (Netlify)
```

---

## 📊 Checklist Rápido

### ✅ Base de Datos (Railway)
- [ ] Cuenta creada en [railway.app](https://railway.app/)
- [ ] Proyecto MySQL creado
- [ ] Credenciales guardadas (MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE)
- [ ] Tablas creadas (ejecutar `db/schema.sql`)

### ✅ Backend (Render)
- [ ] Código subido a GitHub
- [ ] Cuenta creada en [render.com](https://render.com/)
- [ ] Web Service creado
- [ ] Root Directory: `backend` ⚠️
- [ ] Variables de entorno configuradas:
  - `PORT=10000`
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
  - `JWT_SECRET`
- [ ] Health check funciona: `https://tu-backend.onrender.com/api/health`

### ✅ Frontend (Netlify)
- [ ] Cuenta creada en [netlify.com](https://www.netlify.com/)
- [ ] Repositorio conectado
- [ ] Base directory: `FRONTEND`
- [ ] Variable de entorno: `VITE_API_URL=https://tu-backend.onrender.com/api`
- [ ] Sitio desplegado y funcionando

---

## 🔑 Variables de Entorno Clave

### Backend (Render)
```
PORT=10000
DB_HOST=[de Railway]
DB_USER=[de Railway]
DB_PASSWORD=[de Railway]
DB_NAME=railway
DB_PORT=3306
JWT_SECRET=[generar con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"]
```

### Frontend (Netlify)
```
VITE_API_URL=https://tu-backend.onrender.com/api
```

---

## 🔗 URLs Importantes

- **Railway Dashboard**: https://railway.app/
- **Render Dashboard**: https://dashboard.render.com/
- **Netlify Dashboard**: https://app.netlify.com/
- **GitHub**: https://github.com/

---

## 🚨 Errores Comunes

| Error | Solución |
|-------|----------|
| Backend no conecta a BD | Verificar credenciales, asegurar que `DB_NAME=railway` |
| Frontend no conecta a backend | Verificar `VITE_API_URL` en Netlify |
| 404 en rutas | Verificar `public/_redirects` y `netlify.toml` |
| Backend "dormido" | Normal en plan Free, primera petición tarda ~30s |

---

## 📚 Documentación Completa

- **Guía completa**: [GUIA-COMPLETA.md](./GUIA-COMPLETA.md)
- **Netlify detallado**: [FRONTEND/DEPLOY-NETLIFY.md](./FRONTEND/DEPLOY-NETLIFY.md)
- **Render detallado**: [backend/DEPLOY-RENDER.md](./backend/DEPLOY-RENDER.md)

---

## 💡 Comandos Útiles

```bash
# Generar JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Subir cambios a GitHub
git add .
git commit -m "Descripción"
git push

# Probar backend localmente
cd backend
npm run dev

# Probar frontend localmente
cd FRONTEND
npm run dev
```

---

¡Éxito con tu despliegue! 🚀


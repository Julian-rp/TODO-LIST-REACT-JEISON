# ✅ Frontend - TODO LIST REACT

Frontend de la aplicación web colaborativa donde dos o más usuarios pueden **crear, buscar, marcar, editar y eliminar tareas**.  
Incluye un sistema de **autenticación con JWT** y conexión a API REST backend.

---

## 🎯 Objetivo del proyecto

Interfaz de usuario construida con React para gestionar tareas en equipo.  
El sistema garantiza que solo los usuarios autenticados puedan crear, editar o eliminar tareas, además de ofrecer funcionalidades de búsqueda, filtrado y control de estados.  
Con este proyecto se busca aplicar conceptos de **React, manejo de estado, rutas protegidas, autenticación JWT, consumo de APIs REST y uso de estilos con Tailwind CSS**.

---

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Axios](https://axios-http.com/)  
- [React Router DOM](https://reactrouter.com/)  
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) (notificaciones)

---

## 📦 Instalación

```bash
npm install
```

## 🚀 Desarrollo

```bash
npm run dev
```

## 🏗️ Build para Producción

```bash
npm run build
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_API_URL=http://localhost:3000/api
```

Para producción, cambia la URL a la de tu backend desplegado en Render.

## 🚢 Despliegue en Netlify

### Pasos Rápidos:

1. **Sube tu código a GitHub**
2. **Conecta con Netlify**:
   - Ve a [Netlify](https://www.netlify.com/)
   - "Add new site" → "Import an existing project"
   - Selecciona GitHub y tu repositorio
3. **Configura**:
   - Base directory: `FRONTEND`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Variables de entorno**:
   - Agrega `VITE_API_URL` con la URL de tu backend en Render
5. **¡Despliega!**

📖 **Guía completa**: Ver `DEPLOY-NETLIFY.md` para instrucciones detalladas paso a paso.

### Archivos de Configuración

- `netlify.toml` - Configuración de build y redirects para Netlify
- `public/_redirects` - Redirecciones para React Router (SPA)

## 🚢 Alternativa: Despliegue en Vercel

1. Conecta tu repositorio de GitHub
2. Directorio raíz: `FRONTEND`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Agrega la variable de entorno `VITE_API_URL`

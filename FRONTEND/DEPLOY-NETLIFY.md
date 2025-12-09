# 🚀 Guía de Despliegue en Netlify

Esta guía te ayudará a desplegar el frontend de TODO LIST REACT en Netlify.

## 📋 Prerrequisitos

1. Una cuenta en [Netlify](https://www.netlify.com/)
2. Tu proyecto subido a GitHub (o GitLab/Bitbucket)
3. El backend desplegado en Render (para obtener la URL de la API)

## 🎯 Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir tu código a GitHub

1. Inicia sesión en [GitHub](https://github.com/)
2. Crea un nuevo repositorio llamado `TODO-LIST-REACT`
3. Sube tu código:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TODO-LIST-REACT.git
git push -u origin main
```

### Paso 2: Conectar con Netlify

1. Inicia sesión en [Netlify](https://app.netlify.com/)
2. Haz clic en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** y autoriza a Netlify
4. Elige tu repositorio `TODO-LIST-REACT`

### Paso 3: Configurar el Build

Netlify detectará automáticamente la configuración del archivo `netlify.toml`, pero verifica:

- **Base directory**: `FRONTEND`
- **Build command**: `npm run build`
- **Publish directory**: `FRONTEND/dist`

### Paso 4: Configurar Variables de Entorno

1. En la configuración del sitio, ve a **"Site settings"** → **"Environment variables"**
2. Agrega la variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tu-backend.onrender.com/api` (reemplaza con tu URL de Render)

### Paso 5: Desplegar

1. Haz clic en **"Deploy site"**
2. Espera a que termine el build (puede tardar unos minutos)
3. ¡Tu sitio estará disponible en una URL como: `https://tu-sitio.netlify.app`!

## 🎯 Opción 2: Despliegue Manual (Drag & Drop)

### Paso 1: Construir el proyecto localmente

```bash
cd FRONTEND
npm install
npm run build
```

### Paso 2: Subir a Netlify

1. Inicia sesión en [Netlify](https://app.netlify.com/)
2. Ve a **"Sites"**
3. Arrastra y suelta la carpeta `FRONTEND/dist` en el área de despliegue
4. ¡Listo! Tu sitio se desplegará automáticamente

**Nota**: Con este método, necesitarás volver a desplegar manualmente cada vez que hagas cambios.

## ⚙️ Configuración Adicional

### Dominio Personalizado

1. Ve a **"Site settings"** → **"Domain management"**
2. Haz clic en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu dominio

### Variables de Entorno por Entorno

Puedes configurar diferentes variables para producción, preview y desarrollo:

- **Production**: Variables para el sitio principal
- **Deploy previews**: Variables para cada pull request
- **Branch deploys**: Variables para ramas específicas

## 🔄 Actualizaciones Automáticas

Con la Opción 1 (GitHub), cada vez que hagas `git push` a la rama principal, Netlify:
1. Detectará los cambios automáticamente
2. Ejecutará el build
3. Desplegará la nueva versión

## 🐛 Solución de Problemas

### Error: "Build failed"

- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Netlify para ver el error específico
- Asegúrate de que el comando `npm run build` funcione localmente

### Error: "Page not found" en rutas

- Verifica que el archivo `public/_redirects` esté presente
- Asegúrate de que `netlify.toml` tenga la configuración de redirects

### La API no funciona

- Verifica que la variable `VITE_API_URL` esté configurada correctamente
- Asegúrate de que el backend esté desplegado y accesible
- Revisa la consola del navegador para ver errores de CORS

## 📚 Recursos

- [Documentación de Netlify](https://docs.netlify.com/)
- [Guía de despliegue de React en Netlify](https://docs.netlify.com/integrations/frameworks/react/)
- [Variables de entorno en Netlify](https://docs.netlify.com/environment-variables/overview/)


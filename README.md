# TODO List - React + Express + MySQL

Aplicación de lista de tareas colaborativa con autenticación.

## 🚀 Tecnologías

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Base de Datos**: MySQL
- **Despliegue**: Netlify (Frontend) + Render (Backend) + Railway (MySQL)

## 📦 Instalación

### Frontend
```bash
cd FRONTEND
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 🔧 Variables de Entorno

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=todo_list
DB_PORT=3306
JWT_SECRET=tu-secret-key
DB_SSL=false
```

## 📝 Uso

1. Registra un usuario o inicia sesión
2. Crea, edita y elimina tareas
3. Marca tareas como completadas
4. Busca y filtra tareas


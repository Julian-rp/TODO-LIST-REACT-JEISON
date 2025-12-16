#  TODO List Fullstack – React + Express + MySQL

**Actividad Final Integradora:** Todo List Fullstack con Despliegue en la Nube y CI/CD

Aplicación web **Full Stack** para la gestión de tareas (CRUD) desarrollada como simulación de un entorno profesional real, incluyendo **desarrollo, pruebas, despliegue en la nube y documentación técnica**.

---

##  Descripción General

La aplicación permite a los usuarios gestionar una lista de tareas de manera eficiente. El sistema cuenta con un frontend desarrollado en React y un backend en Express que expone una API REST conectada a una base de datos MySQL. Todo el proyecto se encuentra desplegado en la nube y cuenta con un flujo básico de **CI/CD mediante GitHub Actions**.

### Funcionalidades principales

* Crear tareas con título obligatorio
* Listar tareas
* Editar y actualizar tareas
* Marcar tareas como completadas o pendientes
* Eliminar tareas
* Manejo básico de errores y validaciones

---

##  Arquitectura del Proyecto

Arquitectura **Cliente – Servidor** con separación clara de responsabilidades:

```
Usuario
  ↓
Frontend (React - Vercel)
  ↓ API REST
Backend (Express - Render)
  ↓
Base de Datos (MySQL - Railway)
```

Estructura del repositorio (monorepo):

```
/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── config/
│   └── package.json
│
├── db/
├── .github/workflows/ci.yml
├── README.md
├── ARQUITECTURA.md
└── API.md
```

---

##  Tecnologías Utilizadas

###  Frontend

* React
* Vite
* JavaScript
* CSS / Tailwind CSS
* Axios
* React Hooks (useState, useEffect)

###  Backend

* Node.js
* Express.js
* API REST
* CORS
* Dotenv

###  Base de Datos

* MySQL (Railway)

###  Despliegue

* **Frontend:** Vercel
* **Backend:** Render
* **Base de datos:** Railway

###  CI/CD

* GitHub Actions

---

##  Instalación y Ejecución Local

###  Requisitos Previos

* Node.js v18+
* npm
* MySQL

---

###  Frontend

```bash
cd frontend
npm install
npm run dev
```

Ejecuta en:

```
http://localhost:5173
```

---

###  Backend

```bash
cd backend
npm install
npm run dev
```

Ejecuta en:

```
http://localhost:3000
```

---

##  Variables de Entorno

###  Frontend (.env)

```env
VITE_API_URL=https://tu-backend.onrender.com/api
```

---

###  Backend (.env)

```env
PORT=3000
DB_HOST=railway-host
DB_USER=railway-user
DB_PASSWORD=railway-password
DB_NAME=railway-db
DB_PORT=3306
```

---

##  Base de Datos

La base de datos se encuentra alojada en **Railway** y contiene una tabla `todos` con los siguientes campos:

* id
* title
* description
* status
* created_at

---

##  Endpoints de la API

| Método | Endpoint       | Descripción      |
| ------ | -------------- | ---------------- |
| GET    | /api/todos     | Listar tareas    |
| POST   | /api/todos     | Crear tarea      |
| PUT    | /api/todos/:id | Actualizar tarea |
| DELETE | /api/todos/:id | Eliminar tarea   |

---

##  Despliegue en la Nube

###  Frontend – Vercel

* Repositorio conectado a Vercel
* Build command: `npm run build`
* Output directory: `dist`
* Variable de entorno configurada: `VITE_API_URL`

### Backend – Render

* Servicio Web Node.js
* Variables de entorno configuradas
* CORS habilitado para permitir acceso desde Vercel

###  Base de Datos – Railway

* Instancia MySQL
* Credenciales usadas en Render

---

##  CI/CD con GitHub Actions

El proyecto incluye un workflow ubicado en:

```
.github/workflows/ci.yml
```

### Acciones del pipeline:

* Se ejecuta en cada `push` y `pull_request`
* Instala dependencias del frontend
* Ejecuta el build del frontend
* El pipeline falla si el build no es exitoso

---

##  Uso de la Aplicación

1. Acceder a la URL del frontend en Vercel
2. Crear nuevas tareas
3. Editar o eliminar tareas existentes
4. Marcar tareas como completadas o pendientes

---

##  Documentación Adicional

* `ARQUITECTURA.md`: Diagrama y explicación de la arquitectura
* `API.md`: Documentación de endpoints

---

##  Autores

JULIAN RIVERA
MICHAEL PULIDO

---

##  Licencia

Proyecto con fines educativos.

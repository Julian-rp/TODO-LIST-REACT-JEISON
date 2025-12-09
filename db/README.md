# Base de Datos - TODO LIST REACT

## Configuración de MySQL

Esta carpeta contiene los scripts SQL para configurar la base de datos MySQL del proyecto.

## Estructura

- `schema.sql` - Script para crear la base de datos y las tablas
- `seed.sql` - Script con datos de ejemplo para desarrollo (nota: las contraseñas deben ser hasheadas)
- `create-seed.js` - Script Node.js para crear usuarios y tareas de ejemplo con contraseñas hasheadas correctamente

## Instalación

1. Asegúrate de tener MySQL instalado y corriendo
2. Ejecuta el script de esquema:
   ```bash
   mysql -u root -p < schema.sql
   ```
3. (Opcional) Para crear datos de ejemplo con contraseñas hasheadas correctamente:
   ```bash
   cd db
   npm install bcryptjs mysql2 dotenv
   # Configura las variables de entorno o edita create-seed.js
   node create-seed.js
   ```
   
   Esto creará usuarios de ejemplo:
   - Username: `Michael`, Password: `password123`
   - Username: `julian`, Password: `password123`

## Despliegue en Railway

1. Crea una cuenta en [Railway](https://railway.app/)
2. Crea un nuevo proyecto MySQL
3. Obtén las credenciales de conexión (host, usuario, contraseña, nombre de base de datos)
4. Configura las variables de entorno en el backend con estas credenciales
5. Ejecuta el script `schema.sql` en la base de datos de Railway

## Variables de Entorno

Configura estas variables en el backend:

```
DB_HOST=tu-host-de-railway
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=todo_list
```


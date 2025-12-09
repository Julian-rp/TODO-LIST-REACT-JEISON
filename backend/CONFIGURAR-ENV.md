# 🔧 Configurar archivo .env

## Pasos para crear el archivo .env

1. Ve a la carpeta `backend`
2. Crea un archivo llamado `.env` (sin extensión)
3. Copia y pega este contenido:

```env
# Server
PORT=10000

# Database - Railway MySQL
DB_HOST=maglev.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=KHDTGJLoYVntrRlNFiEZUvTrAGRxvsHw
DB_NAME=railway
DB_PORT=58428

# JWT
JWT_SECRET=clave-secreta-super-segura-cambiar-en-produccion-12345

# SSL (para Railway, generalmente true)
DB_SSL=true

# Connection String para Prisma (opcional)
DATABASE_URL=mysql://root:KHDTGJLoYVntrRlNFiEZUvTrAGRxvsHw@maglev.proxy.rlwy.net:58428/railway
```

## Para usar con Prisma

Si vas a usar Prisma, la variable `DATABASE_URL` ya está configurada. Puedes usar:

```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

## Verificar conexión

Después de crear el `.env`, prueba la conexión:

```bash
cd backend
npm run dev
```

Deberías ver: `✅ Database connected successfully`


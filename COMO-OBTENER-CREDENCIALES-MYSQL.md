# 🔍 Cómo Obtener las Credenciales de MySQL

Guía para encontrar cada valor necesario para configurar tu `.env`

---

## 📋 Valores que Necesitas

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA_MYSQL
DB_NAME=todo_list
DB_PORT=3306
JWT_SECRET=clave-secreta-para-desarrollo-12345
DB_SSL=false
```

---

## 🔑 Cómo Obtener Cada Valor

### 1. PORT=3000
**Este NO es de MySQL**, es el puerto donde correrá tu backend.
- **Valor**: `3000` (puedes dejarlo así o cambiarlo)
- **No necesitas buscarlo**, es un valor que tú eliges

### 2. DB_HOST=localhost
**Para desarrollo local, siempre es `localhost`**
- **Valor**: `localhost` (si MySQL está en tu computadora)
- **No necesitas buscarlo**, usa `localhost` para desarrollo local

### 3. DB_USER=root
**Es el usuario de MySQL que usas para conectarte**

#### Cómo verificar:
```bash
# Intenta conectarte a MySQL
mysql -u root -p
```

Si puedes conectarte con `root`, ese es tu usuario. Si usas otro usuario (como `tu_nombre`), ese es tu `DB_USER`.

**Valores comunes:**
- `root` (usuario por defecto)
- Tu nombre de usuario de Windows/Mac
- Un usuario que hayas creado

### 4. DB_PASSWORD=TU_CONTRASEÑA_MYSQL
**Es la contraseña que usas para conectarte a MySQL**

#### Cómo encontrarla:
1. **Si la recuerdas**: Úsala directamente
2. **Si no la recuerdas**: 
   - Intenta conectarte: `mysql -u root -p`
   - Si te pide contraseña y la sabes, esa es
   - Si no la sabes, necesitas resetearla (ver abajo)

#### Si instalaste MySQL con XAMPP/WAMP:
- **XAMPP**: Generalmente la contraseña está **vacía** (déjala en blanco)
- **WAMP**: Generalmente la contraseña está **vacía** (déjala en blanco)

#### Si instalaste MySQL standalone:
- Es la contraseña que configuraste durante la instalación

### 5. DB_NAME=todo_list
**Es el nombre de tu base de datos**

#### Cómo verificar qué bases de datos tienes:
```bash
mysql -u root -p

# Dentro de MySQL, ejecuta:
SHOW DATABASES;
```

Verás una lista como:
```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| todo_list          |  ← Esta es tu base de datos
+--------------------+
```

**Si no existe `todo_list`**, créala:
```sql
CREATE DATABASE todo_list;
```

### 6. DB_PORT=3306
**Es el puerto donde MySQL escucha conexiones**

#### Cómo verificar:
- **Por defecto**: `3306` (casi siempre es este)
- **Para verificar**:
  ```bash
  # Windows
  netstat -an | findstr 3306
  
  # Mac/Linux
  netstat -an | grep 3306
  ```

Si ves algo como `0.0.0.0:3306`, ese es tu puerto.

**En 99% de los casos es `3306`**, así que puedes dejarlo así.

### 7. JWT_SECRET=clave-secreta-para-desarrollo-12345
**Este NO es de MySQL**, es una clave secreta para tokens JWT.

#### Cómo generar uno seguro:
```bash
# En tu terminal, ejecuta:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Esto generará una clave aleatoria y segura. Cópiala y úsala.

**O simplemente usa**: `clave-secreta-para-desarrollo-12345` (solo para desarrollo local)

### 8. DB_SSL=false
**Para desarrollo local, siempre es `false`**
- **Valor**: `false` (no necesitas cambiarlo)

---

## 🎯 Método Rápido: Probar la Conexión

La mejor forma de verificar tus credenciales es intentar conectarte:

```bash
mysql -u root -p
```

Si te pide contraseña:
- **Si la sabes**: Esa es tu `DB_PASSWORD`
- **Si no la sabes o está vacía**: Presiona Enter (contraseña vacía)

Si puedes conectarte, ya tienes:
- ✅ `DB_USER` = `root` (o el usuario que usaste)
- ✅ `DB_PASSWORD` = La contraseña que ingresaste (o vacía)

---

## 📝 Ejemplo de .env Completo

Basado en una instalación típica de MySQL:

### Si instalaste con XAMPP/WAMP (contraseña vacía):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_list
DB_PORT=3306
JWT_SECRET=clave-secreta-para-desarrollo-12345
DB_SSL=false
```

### Si instalaste MySQL standalone (con contraseña):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mi_contraseña_123
DB_NAME=todo_list
DB_PORT=3306
JWT_SECRET=clave-secreta-para-desarrollo-12345
DB_SSL=false
```

---

## 🔧 Si No Recuerdas tu Contraseña de MySQL

### Windows (XAMPP):
1. Abre el panel de control de XAMPP
2. MySQL generalmente no tiene contraseña por defecto
3. Intenta dejar `DB_PASSWORD` vacío

### Windows (MySQL Standalone):
1. Detén el servicio MySQL
2. Inicia MySQL en modo seguro
3. O busca en la configuración de MySQL

### Mac/Linux:
```bash
# Resetear contraseña de root
sudo mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nueva_contraseña';
```

---

## ✅ Verificación Final

Después de configurar tu `.env`, prueba la conexión:

```bash
cd backend
npm run dev
```

Deberías ver:
```
✅ Database connected successfully
🚀 Server running on port 3000
```

Si ves un error, verifica:
1. Que MySQL esté corriendo
2. Que las credenciales sean correctas
3. Que la base de datos exista

---

## 🆘 Ayuda Rápida

**¿No sabes tu contraseña?**
- Intenta dejarla vacía: `DB_PASSWORD=`
- O prueba: `root`, `password`, `123456` (contraseñas comunes)

**¿No puedes conectarte a MySQL?**
- Verifica que el servicio MySQL esté corriendo
- En Windows: Busca "Services" y verifica que MySQL esté "Running"

**¿No existe la base de datos?**
- Créala: `CREATE DATABASE todo_list;`

---

¡Con estos pasos deberías poder configurar tu `.env` correctamente! 🎉


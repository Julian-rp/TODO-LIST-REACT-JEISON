// Script para crear usuarios de ejemplo con contraseñas hasheadas correctamente
// Ejecutar con: node create-seed.js

import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_list',
});

async function createSeedData() {
  try {
    // Hash de contraseñas
    const password = 'password123';
    const hashedPassword1 = await bcrypt.hash(password, 10);
    const hashedPassword2 = await bcrypt.hash(password, 10);

    // Insertar usuarios
    await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE username=username',
      ['Michael', hashedPassword1]
    );
    
    await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE username=username',
      ['julian', hashedPassword2]
    );

    console.log('✅ Usuarios creados exitosamente');
    console.log('Username: Michael, Password: password123');
    console.log('Username: julian, Password: password123');

    // Insertar tareas de ejemplo
    const tasks = [
      ['Jugar futbol', 'Michael', true, null],
      ['Hacer la comida', 'Michael', false, null],
      ['Hacer oficio', 'Michael', false, null],
      ['Sacar al perro', 'Michael', false, null],
      ['Organizar la cama', 'julian', false, 'julian'],
      ['Ver partido de futbol', 'julian', false, null],
      ['Sacar la basura', 'julian', false, null],
      ['comprar computador', 'Michael', false, null],
    ];

    for (const [text, author, completed, editor] of tasks) {
      await db.execute(
        'INSERT INTO tasks (text, author, completed, editor) VALUES (?, ?, ?, ?)',
        [text, author, completed, editor]
      );
    }

    console.log('✅ Tareas de ejemplo creadas exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createSeedData();


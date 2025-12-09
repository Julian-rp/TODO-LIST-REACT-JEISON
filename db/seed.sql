-- Seed data for development
USE todo_list;

-- NOTA: Las contraseñas deben ser hasheadas usando bcrypt antes de insertarlas
-- Para desarrollo, puedes usar un script Node.js o crear usuarios a través de la API
-- Ejemplo de hash para 'password123': $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Insert sample users (las contraseñas deben ser hasheadas con bcrypt)
-- Por ahora, estos usuarios deben crearse a través de la API de registro
-- O puedes usar un script Node.js para generar los hashes correctos

-- Insert sample tasks (sin usuarios primero, estos se crearán con la API)
-- Las tareas se pueden crear después de que los usuarios se registren

-- Insert sample tasks
INSERT INTO tasks (text, author, completed, editor) VALUES
('Jugar futbol', 'Michael', TRUE, NULL),
('Hacer la comida', 'Michael', FALSE, NULL),
('Hacer oficio', 'Michael', FALSE, NULL),
('Sacar al perro', 'Michael', FALSE, NULL),
('Organizar la cama', 'julian', FALSE, 'julian'),
('Ver partido de futbol', 'julian', FALSE, NULL),
('Sacar la basura', 'julian', FALSE, NULL),
('comprar computador', 'Michael', FALSE, NULL)
ON DUPLICATE KEY UPDATE text=text;


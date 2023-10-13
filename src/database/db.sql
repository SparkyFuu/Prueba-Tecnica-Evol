-- Tabla para clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    rut TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL
);

-- Tabla para medidores
CREATE TABLE medidores (
    id SERIAL PRIMARY KEY,
    codigo TEXT UNIQUE,
    nombre TEXT NOT NULL,
    fecha_creacion DATE,
    descripcion TEXT
);

-- Tabla de relación entre clientes y medidores
CREATE TABLE cliente_medidor (
    id SERIAL PRIMARY KEY,
    cliente_rut TEXT,
    medidor_id INT,
    FOREIGN KEY (cliente_rut) REFERENCES clientes(rut) ON DELETE CASCADE,
    FOREIGN KEY (medidor_id) REFERENCES medidores(id) ON DELETE CASCADE
);

# Configuración de Credenciales de Base de Datos PostgreSQL

Este archivo README te guiará a través del proceso de configuración de las credenciales de la base de datos PostgreSQL en tu proyecto. 

## Paso 1: Crear el archivo .env

1. En la raíz de tu proyecto, crea un archivo llamado `.env`. Este archivo se utiliza para almacenar las variables de entorno, incluyendo las credenciales de la base de datos.

   ```shell
   touch .env
## Paso 2: Configuración de las Credenciales

2. Abre el archivo `.env` con un editor de texto o código.

3. Dentro del archivo `.env`, define las siguientes variables de entorno para configurar las credenciales de tu base de datos PostgreSQL:

DB_HOST=nombre_de_host
DB_PORT=numero_de_puerto
DB_NAME=nombre_de_la_base_de_datos
DB_USER=nombre_de_usuario
DB_PASSWORD=contraseña


Asegúrate de reemplazar los valores con la información real de tu base de datos. Aquí hay una breve descripción de cada variable:

- `DB_HOST`: El nombre de host o la dirección IP del servidor de la base de datos.
- `DB_PORT`: El número de puerto en el que la base de datos está escuchando (generalmente 5432 para PostgreSQL).
- `DB_NAME`: El nombre de la base de datos que deseas utilizar.
- `DB_USER`: El nombre de usuario de la base de datos que tiene los permisos necesarios.
- `DB_PASSWORD`: La contraseña correspondiente al usuario de la base de datos.

4. Guarda el archivo `.env` después de ingresar las credenciales.

5. Crea las tablas en tu base de datos

para esto te dejo las tablas a crear en el archivo database

```
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
```

# Instalación de Dependencias

Para comenzar con tu proyecto y asegurarte de que todo funcione correctamente, necesitarás tener las siguientes bibliotecas como dependencias en tu proyecto. Asegúrate de que tu archivo `package.json` contenga las siguientes secciones

### Dependencias

```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "morgan": "^1.10.0",
  "pg": "^8.11.3"
}
```

### Dependencias de desarrollo

"devDependencies": {
  "nodemon": "^3.0.1"
}

Estas son las bibliotecas esenciales que se utilizan en este proyecto

cors: Middleware que permite habilitar CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde otros dominios.

dotenv: Biblioteca para cargar variables de entorno desde un archivo .env, lo cual es esencial para almacenar configuraciones sensibles.

express: El marco de aplicación web que facilita la creación de rutas, controladores y la gestión de solicitudes HTTP.

morgan: Middleware para el registro de solicitudes HTTP, útil para el seguimiento y la depuración.

pg: El controlador de PostgreSQL para Node.js, que permite la conexión y las operaciones con la base de datos PostgreSQL.


# Iniciar API y Frontend

Para poner en marcha tu aplicación, sigue estos pasos:

## Iniciar la API

1. Abre la terminal.

2. Navega a la carpeta principal de tu proyecto, en este caso, "evol-services":

```shell
cd evol-services
```

Ejecuta el siguiente comando para iniciar la API:

npm run dev

```shell
cd npm run dev
```

Este comando iniciará el servidor de la API y lo mantendrá en ejecución. Asegúrate de que las dependencias estén instaladas antes de ejecutar este comando.


#Iniciar el Frontend
Abre una nueva terminal (puede ser en una pestaña separada o en una nueva ventana de la terminal).

Navega a la carpeta del client del proyecto:

```shell
cd client
```

Ejecuta el siguiente comando para iniciar el frontend:

```shell
npm start
```

Esto iniciará el servidor de desarrollo del frontend y abrirá tu aplicación en tu navegador web predeterminado. La aplicación se recargará automáticamente cada vez que realices cambios en el código.

Una vez que hayas iniciado ambos servidores (la API y el frontend), tu aplicación estará lista 


# Página Web con PostgreSQL, React, Node.js y Material-UI

Este proyecto es una página web que ha sido desarrollada utilizando diversas tecnologías y bibliotecas clave. A continuación, se proporciona una breve descripción de las herramientas utilizadas en la creación de esta página web.

## Tecnologías y bibliotecas utilizadas

- **PostgreSQL**: PostgreSQL es un sistema de gestión de bases de datos relacional. En este proyecto, se ha utilizado como la base de datos para almacenar y administrar la información de la aplicación.

- **React**: React es una biblioteca de JavaScript para construir interfaces de usuario. Se ha utilizado para desarrollar el frontend de la página web, lo que permite crear una interfaz de usuario dinámica e interactiva.

- **Node.js**: Node.js es un entorno de tiempo de ejecución de JavaScript que permite ejecutar código JavaScript en el lado del servidor. Se ha utilizado con Express.js para crear el backend de la aplicación, gestionando las solicitudes del cliente y la comunicación con la base de datos.

- **Material-UI**: Material-UI es una biblioteca de componentes de interfaz de usuario basada en el diseño de Material Design. Ha sido utilizada para diseñar y estilizar la página web, proporcionando una apariencia moderna y atractiva.


# Rutas de API

En la carpeta `routes`, encontrarás todas las rutas que se utilizan para acceder a las sentencias SQL en la base de datos. Aquí se detallan algunas de las rutas disponibles junto con una breve descripción de lo que hacen.

## Obtener todas las tareas

- **Descripción**: Esta ruta está diseñada para recuperar todas las tareas almacenadas en la base de datos.
- **Método HTTP**: GET
- **Ruta**: `/tasks`
- **Controlador**: `getALLtask`

## Obtener una tarea por ID

- **Descripción**: Esta ruta permite la recuperación de una tarea específica en función de su ID.
- **Método HTTP**: GET
- **Ruta**: `/tasks/:id`
- **Controlador**: `getTask`

# Controladores

En la carpeta `controllers`, encontrarás los controladores relacionados con las tareas, los cuales son responsables de gestionar las consultas SQL hacia la base de datos. A continuación, se proporciona un ejemplo de uno de estos controladores, junto con una descripción detallada de su funcionalidad.

## Obtener una tarea por ID

- **Descripción**: Este controlador se encarga de recuperar una tarea específica en función de su ID. Realiza una consulta a la base de datos utilizando SQL y devuelve el resultado al frontend.
- **Método HTTP**: GET
- **Función**: `getTask` (obtener los clientes)
- **Ejemplo de uso**:
    ```javascript
    const getTask = async (req, res, next) => {
        try {
            const { id } = req.params;

            const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id])

            if (result.rows.length === 0)
                return res.status(404).json({
                    message: "Tarea no encontrada",
                });

            res.json(result.rows[0]);
        } catch (error) {
            next(error)
        }
    }
    ```

# Configuración y `index.js`

## Configuración de la Base de Datos

En el archivo `config.js`, se encuentran los archivos que establecen la configuración para la conexión a la base de datos. A continuación, se presenta un ejemplo de cómo se establecen los datos de conexión en un archivo de configuración:

```javascript
const { config } = require('dotenv');
config();

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}
```
# Archivo index.js del Backend

El archivo `index.js` en la carpeta principal del backend es el punto de entrada para la aplicación y en donde se estipula el puerto de este mismo. A continuación, se presenta un ejemplo de cómo se configura y ejecuta la aplicación:

```javascript
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/tasks.routes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use(taskRoutes);

// Controlador de errores
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

// Iniciar el servidor
app.listen(4000);
console.log('Servidor en el puerto 4000')
```
# Frontend

En el frontend de la aplicación, se encuentran diversos componentes que permiten la interacción y navegación en la página web. A continuación, se describen los componentes y su funcionalidad:

## Rutas

Las rutas de la aplicación se definen en el archivo `app.js`, lo que permite la navegación a través de diferentes secciones de la página.

## Componentes

En la carpeta `components`, se encuentran varios componentes esenciales para la funcionalidad de la aplicación:

- **Navbar**: Este componente proporciona una barra de navegación que permite a los usuarios moverse fácilmente por la página.

- **EditClient.js**: Permite la edición de datos de los clientes. Los usuarios pueden modificar la información de los clientes utilizando esta interfaz.

- **EditMedidor.js**: Similar a `EditClient.js`, este componente está diseñado para editar la información de los medidores.

- **NewMedidor.js**: Este componente permite a los usuarios registrar nuevos medidores en la base de datos.

- **TaskForm.js**: Proporciona un formulario para ingresar información sobre un nuevo cliente. Los datos ingresados se almacenan en la base de datos.

- **TaskList.js**: Este componente se utiliza para listar y mostrar todos los clientes registrados. Ofrece una vista de todos los clientes almacenados.

## Estilización

Se ha aplicado estilización a todos los componentes utilizando Material-UI, lo que proporciona una apariencia moderna y atractiva a la página web.

Estos componentes y su estilización con Material-UI ayudan a crear una experiencia de usuario atractiva y funcional en el frontend de la aplicación.



# Viaje del Cliente

La aplicación ha sido diseñada para brindar a los usuarios una experiencia fluida y eficiente al interactuar con la gestión de clientes y medidores. A continuación, se describe el flujo de trabajo y las funcionalidades clave:

## Ingreso de un Nuevo Cliente

1. El primer paso en el proceso es el ingreso de un nuevo cliente. El formulario correspondiente incluye validaciones para garantizar la precisión de los datos ingresados.

## Ingreso de Medidores

2. Una vez que se ha registrado un cliente, los usuarios pueden ingresar medidores asociados a ese cliente. Cada cliente tiene la capacidad de registrar hasta un máximo de 3 medidores. Si se intenta ingresar un cuarto medidor, se mostrará un mensaje de error ya que el límite de 3 medidores se ha alcanzado.

## Actualización de Datos

3. Los usuarios tienen la flexibilidad de actualizar tanto los datos del cliente como los datos de los medidores registrados. Esto permite mantener la información actualizada y precisa en todo momento.

## Eliminación de Datos

4. Los datos de los clientes y medidores pueden eliminarse si es necesario. Esto brinda la posibilidad de gestionar la información de manera efectiva y eliminar registros obsoletos.

## Pantalla Principal

5. Todos los datos de los clientes y medidores se listan en la pantalla principal del programa. Los usuarios pueden acceder fácilmente a esta vista para ver un resumen completo de la información.

## Regreso a la Interfaz Principal

6. Para regresar a la interfaz principal desde cualquier pantalla, los usuarios simplemente deben hacer clic en el nombre del proyecto ubicado en la esquina superior izquierda de la aplicación.

Este flujo de trabajo permite a los usuarios gestionar clientes y medidores de manera eficaz, garantizando que los datos estén actualizados y accesibles en todo momento.

# Tecnologías Utilizadas

El desarrollo de este proyecto se ha beneficiado de diversas tecnologías y recursos que han contribuido a su implementación y éxito. A continuación, se enumeran algunas de las tecnologías y fuentes de información clave utilizadas:

- **Node.js**: Node.js ha sido la base del backend de la aplicación, proporcionando un entorno de tiempo de ejecución de JavaScript en el servidor que permite gestionar las solicitudes y operaciones de base de datos de manera eficiente.

- **React**: React ha sido la tecnología fundamental para la creación del frontend de la aplicación, permitiendo el desarrollo de una interfaz de usuario dinámica e interactiva.

- **ChatGPT**: Se ha hecho uso de ChatGPT, una potente tecnología de procesamiento de lenguaje natural, para generar texto y asistir en la creación de contenido y respuestas.

- **Stack Overflow**: La comunidad de desarrolladores en Stack Overflow ha sido una fuente invaluable de soluciones y respuestas a desafíos técnicos y preguntas relacionadas con la programación.

- **Documentación de Librerías**: La documentación oficial de las bibliotecas y frameworks utilizados en el proyecto ha sido una guía esencial para comprender su funcionamiento y utilizar sus características de manera efectiva.

Estas tecnologías y recursos han contribuido significativamente al desarrollo y funcionamiento exitoso de la aplicación.


# Manejo de Errores

El proyecto implementa un sistema de manejo de errores eficiente y centralizado, en el que las funciones asincrónicas gestionan las excepciones utilizando bloques `try...catch` y luego pasan los errores al siguiente middleware mediante la función `next(error)`. El manejo real de los errores se lleva a cabo en un middleware de manejo de errores global o en la función `next` del middleware.

A continuación, se presenta un ejemplo de cómo se manejan los errores en una función específica del proyecto:

```javascript
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rut, nombre, direccion } = req.body;

        const result = await pool.query(
            'UPDATE clientes SET  rut = $1, nombre = $2, direccion = $3 WHERE id = $4 RETURNING *',
            [rut, nombre, direccion, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Tarea no encontrada",
            });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}
```
Este enfoque garantiza que cualquier excepción inesperada se maneje de manera adecuada, lo que contribuye a la robustez y estabilidad de la aplicación. Además, facilita la identificación y resolución de problemas, mejorando la experiencia tanto del desarrollador como del usuario final.

# Para Concluir

La finalización de este proyecto relativamente simple en un período de tiempo limitado ha sido un logro significativo. Se espera que el proyecto satisfaga las expectativas y cumpla con los objetivos propuestos. Cada etapa del proceso, desde la planificación hasta la implementación, ha sido una oportunidad para aprender y mejorar.

Atentamente,

Alejandro Valenzuela

# Página Web Personal

Si deseas conocer más acerca de mí y mi trabajo, te invito a visitar mi página web personal:

[alejandrovgallardo.com](https://alejandrovgallardo.com)










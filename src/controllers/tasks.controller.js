const pool = require('../db');


const getALLtask = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM clientes')

        res.json(allTasks.rows)
    } catch (error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not foun",
            });

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const getRut = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT rut FROM clientes WHERE id = $1', [id])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not foun",
            });

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const { rut, nombre, direccion } = req.body

    try {
        const result = await pool.query('INSERT INTO clientes (rut , nombre, direccion) VALUES ($1, $2, $3) RETURNING *', [
            rut,
            nombre,
            direccion,
        ])
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }

}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }
};

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
                message: "Task not found",
            });
        }


        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}



// ------------------------------------------------------


const getALLmedidores = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM medidores')

        res.json(allTasks.rows)
    } catch (error) {
        next(error)
    }
}

const getmedidores = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM medidores WHERE id = $1', [id])

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not foun",
            });

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

const createmedidores = async (req, res, next) => {
    const { rut, codigo, nombre, fecha_creacion, descripcion } = req.body

    try {

        const countQuery = 'SELECT COUNT(*) FROM cliente_medidor WHERE cliente_rut = $1';
        const countResult = await pool.query(countQuery, [rut]);
        const medidorCount = parseInt(countResult.rows[0].count);


        if (medidorCount >= 3) {
            return res.status(400).json({ message: 'El cliente ya tiene 3 medidores asociados. No se pueden agregar más.' });
        }


        const result = await pool.query('INSERT INTO medidores (codigo, nombre, fecha_creacion, descripcion) VALUES ($1, $2, $3, $4) RETURNING *', [
            codigo,
            nombre,
            fecha_creacion,
            descripcion,
        ]);
        const idMedidor = result.rows[0].id;


        const result2 = await pool.query('INSERT INTO cliente_medidor (cliente_rut, medidor_id) VALUES ($1, $2) RETURNING *', [
            rut,
            idMedidor,
        ]);

        res.json(result2.rows[0]);
    } catch (error) {
        next(error);
    }
}


const deletemedidores = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM medidores WHERE id = $1", [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }
};

const updatemedidores = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { codigo, nombre, fecha_creacion, descripcion } = req.body;

        const result = await pool.query(
            'UPDATE medidores SET  codigo = $1, nombre = $2, fecha_creacion = $3, descripcion = $4 WHERE id = $5 RETURNING *',
            [codigo, nombre, fecha_creacion, descripcion, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found",
            });
        }


        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const associateClientAndMeter = async (req, res, next) => {
    try {
        const { id, cliente_rut, medidor_id } = req.body;

        const result = await pool.query('INSERT INTO cliente_medidor (id, cliente_rut, medidor_id) VALUES ($1, $2, $3) RETURNING *', [
            id,
            cliente_rut,
            medidor_id,
        ]);

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getALLtask,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    getALLmedidores,
    getmedidores,
    createmedidores,
    deletemedidores,
    updatemedidores,
    associateClientAndMeter,
    getRut
}
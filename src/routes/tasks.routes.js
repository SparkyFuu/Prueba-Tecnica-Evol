const { Router } = require('express');
const { 
    getALLtask, getTask, createTask, deleteTask, updateTask, 
    getALLmedidores, getmedidores, createmedidores, deletemedidores, updatemedidores,
    associateClientAndMeter, // Agregar esta función para asociar clientes y medidores
    getRut
} = require('../controllers/tasks.controller')

const router = Router();

// Rutas para clientes
router.get('/tasks', getALLtask)
router.get('/tasks/:id', getTask)
router.get('/tasks/rut/:id', getRut)
router.post('/tasks', createTask)
router.delete('/tasks/:id', deleteTask)
router.put('/tasks/:id', updateTask)

// Rutas para medidores
router.get('/medidores', getALLmedidores)
router.get('/medidores/:id', getmedidores)
router.post('/medidores', createmedidores)
router.delete('/medidores/:id', deletemedidores)
router.put('/medidores/:id', updatemedidores)

// Ruta para asociar cliente y medidor
router.post('/associate', associateClientAndMeter);

module.exports = router;

import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function NewMedidor() {
    const [task, setTask] = useState({
        rut: '',
        codigo: '',
        nombre: '',
        fecha_creacion: '',
        descripcion: '',
    });

    const [medidor, setMedidor] = useState({
        codigo: '',
        nombre: '',
        fecha_creacion: '',
        descripcion: '',
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validación adicional antes de enviar
        if (!validateRut(task.rut) || !validateCodigo(medidor.codigo)) {
            setLoading(false);
            return;
        }

        const aux = { rut: task.rut, ...medidor};
        const response = await fetch('http://localhost:4000/medidores', {
            method: 'POST',
            body: JSON.stringify(aux),
            headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false);

        if (response.status === 400) {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
        } else {
            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre' && !/^[a-zA-Z\s]*$/.test(value)) {
            return;
        }

        setMedidor({ ...medidor, [name]: value });
    };

    const validateRut = (rut) => {
        const rutRegex = /^\d{1,2}.\d{3}.\d{3}[-][0-9kK]{1}$/;
        return rutRegex.test(rut);
    };

    const validateCodigo = (codigo) => {
        const codigoRegex = /^[a-zA-Z0-9]*$/;
        return codigoRegex.test(codigo);
    };

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:4000/tasks/${params.id}`);
        const data = await res.json();
        setTask({
            rut: data.rut,
            nombre: data.nombre,
            direccion: data.direccion,
        });
    };

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        }
    }, [params.id]);

    return (
        <Grid container direction='column' alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
                    <Typography variant='5' textAlign='center' color='white'>
                        Agregar
                    </Typography>
                    <CardContent>
                        {errorMessage && (
                            <Typography variant="body2" color="error">
                                {errorMessage}
                            </Typography>
                        )}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name='rut'
                                value={task.rut}
                                variant='filled'
                                label='Rut'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                error={!validateRut(task.rut)}
                                helperText={!validateRut(task.rut) ? 'RUT no válido' : ''}
                            />
                            <TextField
                                name='codigo'
                                value={medidor.codigo}
                                variant='filled'
                                label='Código'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                error={!validateCodigo(medidor.codigo)}
                                helperText={!validateCodigo(medidor.codigo) ? 'Código no válido' : ''}
                            />
                            <TextField
                                name='nombre'
                                value={medidor.nombre}
                                variant='filled'
                                label='Nombre'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                name='fecha_creacion'
                                value={medidor.fecha_creacion}
                                type='date'
                                variant='filled'
                                label='Fecha de Creación'
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <TextField
                                name='descripcion'
                                value={medidor.descripcion}
                                variant='filled'
                                label='Descripción'
                                multiline
                                rows={4}
                                sx={{ display: 'block', margin: '.5rem 0' }}
                                onChange={handleChange}
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                            />
                            <Button variant='contained' color='primary' type='submit' disabled={!validateCodigo(medidor.codigo) || !validateRut(task.rut) || !medidor.nombre || !medidor.fecha_creacion}>
                                {loading ? <CircularProgress
                                    color='inherit'
                                    size={24}
                                /> : 'Guardar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

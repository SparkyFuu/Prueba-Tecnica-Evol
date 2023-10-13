import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';

export default function EditClient() {
  const [task, setTask] = useState({
    rut: '',
    nombre: '',
    direccion: '',
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nameError, setNameError] = useState('');
  const [rutError, setRutError] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación adicional antes de enviar
    if (nameError || rutError) {
      setLoading(false);
      return;
    }

    
    if (editing) {
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
    } else {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setLoading(false);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nombre' && /\d/.test(value)) {
      setNameError('El nombre no puede contener números');
    } else {
      setNameError('');
    }

    if (name === 'rut') {
      if (!validateRut(value)) {
        setRutError('El RUT no es válido');
      } else {
        setRutError('');
      }
    }

    setTask({ ...task, [name]: value });
  };

  const validateRut = (rut) => {
    // Aquí puedes implementar la lógica de validación del RUT
    // Devuelve true si es válido y false si no lo es.
    // Puedes utilizar una expresión regular o una biblioteca externa para esta validación.
    // Por ejemplo, aquí se utiliza una expresión regular simple para fines de demostración:

    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
    return rutRegex.test(rut);
  };

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${params.id}`);
    const data = await res.json();
    setTask({ rut: data.rut, nombre: data.nombre, direccion: data.direccion });
    setEditing(true);
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
          <Typography variant='h5' textAlign='center' color='white'>
            {editing ? 'Editar Cliente' : 'Agregar Cliente/Medidor'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name='rut'
                value={task.rut}
                variant='filled'
                label='Rut "99.999.999-9"'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' }}}
                InputLabelProps={{ style: { color: 'white' }}}
                error={Boolean(rutError)}
                helperText={rutError}
              />
              <TextField
                name='nombre'
                value={task.nombre}
                variant='filled'
                label='Nombre'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' }}}
                InputLabelProps={{ style: { color: 'white' }}}
                error={Boolean(nameError)}
                helperText={nameError}
              />
              <TextField
                name='direccion'
                value={task.direccion}
                variant='filled'
                label='Dirección'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' }}}
                InputLabelProps={{ style: { color: 'white' }}}
              />
              <Button variant='contained' color='primary' type='submit' disabled={!task.rut || !task.nombre || !task.direccion || Boolean(nameError) || Boolean(rutError)}>
                {loading ? <CircularProgress color='inherit' size={24} /> : 'Guardar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

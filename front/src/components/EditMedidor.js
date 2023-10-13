import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditMedidor() {
  const [task, setTask] = useState({
    codigo: '',
    nombre: '',
    fecha_creacion: '',
    descripcion: '',
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación adicional antes de enviar
    if (!validateCodigo(task.codigo) || /\d/.test(task.nombre)) {
      setLoading(false);
      return;
    }

    if (editing) {
      await fetch(`http://localhost:4000/medidores/${params.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } else {
      await fetch('http://localhost:4000/medidores', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setLoading(false);
    navigate('/');
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/medidores/${params.id}`);
    const data = await res.json();
    setTask({
      codigo: data.codigo,
      nombre: data.nombre,
      fecha_creacion: data.fecha_creacion,
      descripcion: data.descripcion,
    });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const validateCodigo = (codigo) => {
    // Implementa aquí la validación del código según las reglas específicas
    // Puedes utilizar una expresión regular o reglas de validación personalizadas.
    // Por ejemplo, aquí se utiliza una expresión regular que permite alfanuméricos:

    const codigoRegex = /^[a-zA-Z0-9]*$/;
    return codigoRegex.test(codigo);
  };

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant='h5' textAlign='center' color='white'>
            {editing ? "Editar Cliente/Medidor" : "Agregar Cliente/Medidor"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name='codigo'
                value={task.codigo}
                variant='filled'
                label='Código'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' }}}
                error={!validateCodigo(task.codigo)}
                helperText={!validateCodigo(task.codigo) ? 'Código no válido' : ''}
              />

              <TextField
                name='nombre'
                value={task.nombre}
                variant='filled'
                label='Nombre'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' }}}
                error={/\d/.test(task.nombre)}
                helperText={/\d/.test(task.nombre) ? 'El nombre no puede contener números' : ''}
              />

              <TextField
                name='fecha_creacion'
                value={task.fecha_creacion}
                variant='filled'
                label='Fecha de Creación'
                type='date'
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' }}}
              />

              <TextField
                name='descripcion'
                value={task.descripcion}
                variant='filled'
                label='Descripcion'
                multiline
                rows={4}
                sx={{ display: 'block', margin: '.5rem 0' }}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' }}}
              />

              <Button variant='contained' color='primary' type='submit' disabled={!validateCodigo(task.codigo) || /\d/.test(task.nombre)}>
                {loading ? <CircularProgress color='inherit' size={24} /> : 'Guardar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

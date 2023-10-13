import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
    const [clientes, setClientes] = useState([]);
    const [medidores, setMedidores] = useState([]);
    const navigate = useNavigate();

    const loadClientes = async () => {
        const response = await fetch("http://localhost:4000/tasks");
        const data = await response.json();
        setClientes(data);
    };

    const loadMedidores = async () => {
        const response = await fetch("http://localhost:4000/medidores");
        const data = await response.json();
        setMedidores(data);
    };

    const handleDelete = async (id, isCliente) => {
        try {
            await fetch(`http://localhost:4000/${isCliente ? 'tasks' : 'medidores'}/${id}`, {
                method: "DELETE",
            });

            if (isCliente) {
                setClientes(clientes.filter(cliente => cliente.id !== id));
            } else {
                setMedidores(medidores.filter(medidor => medidor.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadClientes();
        loadMedidores();
    }, []);

    return (
        <>
            <h1>Clientes</h1>
            {clientes.map((cliente) => (
                <Card
                    style={{
                        marginBottom: '.7rem',
                        backgroundColor: '#1e272e',
                    }}
                    key={cliente.id}
                >
                    <CardContent
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{ color: 'white' }}>
                            <Typography>ID: {cliente.id}</Typography>
                            <Typography>RUT: {cliente.rut}</Typography>
                            <Typography>Nombre: {cliente.nombre}</Typography>
                            <Typography>Dirección: {cliente.direccion}</Typography>
                            {/* Agregar campos adicionales para clientes si es necesario */}
                        </div>
                        <div>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={() => navigate(`clientes/${cliente.id}/edit`)}
                                style={{
                                    marginBottom: '0.5rem',
                                    width: '100%', // Ajusta el ancho al 100%
                                    textAlign: 'right', // Alinea a la derecha
                                }}
                            >
                                EDIT
                            </Button>
                            <Button
                                variant='contained'
                                color='warning'
                                onClick={() => handleDelete(cliente.id, true)}
                                style={{
                                    marginBottom: '0.5rem',
                                    width: '100%',
                                    textAlign: 'right',
                                }}
                            >
                                DELETE
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => navigate(`/tasks/newmedidor/${cliente.id}`)}
                                style={{
                                    width: '100%',
                                    textAlign: 'right',
                                }}
                            >
                                Nuevo Medidor
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
    
            <h1>Medidores</h1>
            {medidores.map((medidor) => (
                <Card
                    style={{
                        marginBottom: '.7rem',
                        backgroundColor: '#1e272e',
                    }}
                    key={medidor.id}
                >
                    <CardContent
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{ color: 'white' }}>
                            <Typography>ID: {medidor.id}</Typography>
                            <Typography>Codigo: {medidor.codigo}</Typography>
                            <Typography>Medidor: {medidor.nombre}</Typography>
                            <Typography>Fecha de Creación: {medidor.fecha_creacion}</Typography>
                            <Typography>Descripcion: {medidor.descripcion}</Typography>
                            {/* Agregar campos adicionales para medidores si es necesario */}
                        </div>
                        <div>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={() => navigate(`medidores/${medidor.id}/edit`)}
                                style={{
                                    marginBottom: '0.5rem',
                                    width: '100%',
                                    textAlign: 'right',
                                }}
                            >
                                EDIT
                            </Button>
                            <Button
                                variant='contained'
                                color='warning'
                                onClick={() => handleDelete(medidor.id, false)}
                                style={{
                                    marginBottom: '0.5rem',
                                    width: '100%',
                                    textAlign: 'right',
                                }}
                            >
                                DELETE
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
    
}

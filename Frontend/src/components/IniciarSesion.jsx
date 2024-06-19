import React from 'react';
import { useState } from 'react';
import { Input, Button, Card, CardBody } from '@nextui-org/react';

import db from '../services/db';
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from 'react-redux';
import { updateString } from "../app/slides/example"
import { updateLogin } from "../app/slides/example2"

export default function APP() {


    const value = useSelector((state) => state.example.value);
    const login = useSelector((state) => state.example2.value);

    const dispatch = useDispatch();

    const handleUpdate = (valor) => {
        dispatch(updateString(valor));
    };
    const handleUpdateLogin = (valor) => {
        dispatch(updateLogin(valor));
    };

    const [person, setPerson] = useState({
        nombre: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson({
            ...person,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await db.login(person)

        if (resp) {

            handleUpdateLogin("login")
            handleUpdate("login")
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Exito!",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Credenciales incorrectas",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                }
            });
        }
    };

    return (
        <div style={{ marginTop: "10%", padding: "10px" }}>

            <Card >
                <CardBody>
                    <div >
                        <div className="flex justify-center mb-6">
                            <img
                                src="https://i.ibb.co/tLSbv32/OIG4-1.jpg"
                                alt="Profile Photo"
                                width="80"
                                height="80"
                                className="rounded-full"
                                style={{ aspectRatio: '80/80', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-center">Bienvenido</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    Ingresa tus credenciales para acceder a tu cuenta.
                                </p>
                            </div>
                            <div className="space-y-2">

                                <Input
                                    type="user"
                                    label="Usuario"
                                    id="nombre"
                                    name='nombre'
                                    placeholder="Ingresa tu usuario"
                                    labelPlacement="outside"
                                    value={person.usuario}
                                    onChange={handleChange}
                                    startContent={
                                        <span className="material-icons-outlined" style={{ color: "#454545", paddingRight: "10px" }}>
                                            account_circle
                                        </span>
                                    }
                                    style={{ background: "#f4f4f5" }}
                                />
                            </div>
                            <div className="space-y-2" style={{ marginTop: "40px" }}>
                                <Input
                                    type="password"
                                    label="Contraseña"
                                    placeholder="Ingresa tu contraseña"
                                    labelPlacement="outside"
                                    id='contrasena'
                                    name='contrasena'
                                    value={person.contrasena}
                                    onChange={handleChange}
                                    startContent={
                                        <span className="material-icons-outlined" style={{ color: "#454545", paddingRight: "10px" }}>
                                            lock
                                        </span>
                                    }
                                    style={{ background: "#f4f4f5" }}
                                />
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Button
                                    onClick={handleSubmit}
                                    className='bg-primario' style={{ color: "white" }}>
                                    Iniciar Sesión
                                </Button>
                            </div>

                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
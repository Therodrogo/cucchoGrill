import React from 'react';
import { Input, Button, Card, CardBody } from '@nextui-org/react';

export default function APP() {
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
                                    placeholder="Ingresa tu usuario"
                                    labelPlacement="outside"
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
                                    startContent={
                                        <span className="material-icons-outlined" style={{ color: "#454545", paddingRight: "10px" }}>
                                            lock
                                        </span>
                                    }
                                    style={{ background: "#f4f4f5" }}
                                />
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Button className='bg-primario' style={{ color: "white" }}>
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
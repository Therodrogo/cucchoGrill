import React, { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import QrScanner from 'qr-scanner';
import { Button, Card, CardBody } from '@nextui-org/react';
import { updateString } from '../app/slides/example';
import { useDispatch } from 'react-redux';

const QRCodeScanner = () => {
    const videoRef = useRef(null);
    const [scanner, setScanner] = useState(null);
    const dispatch = useDispatch();

    const handleUpdate = (valor) => {
        dispatch(updateString(valor));
    };

    useEffect(() => {
        if (scanner) {
            scanner.start(videoRef.current);
        }
        return () => {
            if (scanner) {
                scanner.stop();
            }
        };
    }, [scanner]);

    useEffect(() => {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.permissions) {
            requestCameraPermission();
        } else {
            // Si no estamos en un entorno Cordova, solicitamos permisos de navegador
            requestBrowserCameraPermission();
        }
    }, []);

    const requestCameraPermission = () => {
        const permissions = window.cordova.plugins.permissions;
        permissions.checkPermission(permissions.CAMERA, (status) => {
            if (!status.hasPermission) {
                permissions.requestPermission(permissions.CAMERA, (status) => {
                    if (status.hasPermission) {
                        encenderCamara();
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Permiso de cámara denegado",
                            text: "Por favor, concede el permiso de la cámara para escanear el código QR.",
                            showConfirmButton: true,
                        });
                    }
                });
            } else {
                encenderCamara();
            }
        });
    };

    const requestBrowserCameraPermission = async () => {
        try {
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                console.log(navigator.camera);
            }
            encenderCamara();
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Permiso de cámara denegado",
                text: "Por favor, concede el permiso de la cámara para escanear el código QR.",
                showConfirmButton: true,
            });
        }
    };

    const encenderCamara = () => {
        const qrScanner = new QrScanner(
            videoRef.current,
            result => {
                Swal.fire('QR Code', `Contenido: ${result}`, 'success');
                const match = result.match(/^(\D+)\s(\d+)\s(.+)$/);
                if (match) {
                    const primeraParte = match[1].trim();
                    const numero = match[2];
                    const segundaParte = match[3];
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Escaneado con éxito",
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                        }
                    });
                    setScanner(null);
                    handleUpdate("pedido");
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "QR incorrecto",
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                        }
                    });
                }
            },
            error => {
                console.error(error);
            }
        );
        setScanner(qrScanner);
    };

    const cerrarCamara = () => {
        if (scanner) {
            scanner.stop();
            setScanner(null);
        }
    };

    return (
        <div style={{ width: "100%", height: "100%", background: "#1F1120" }}>
            <div style={{ display: "flex", justifyContent: "center", width: "100vw", marginBottom: "10px" }}>
                <img style={{ width: "50%" }} src="https://i.ibb.co/ZHj7P7s/parte-arriba.png" alt="" />
            </div>
            <h1 style={{ color: "#DDBD8C", fontSize: "1.5em" }} className="text-center text-white">Escanea el código QR</h1>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <video style={{ borderRadius: "12px", height: "40%", width: "70%" }} ref={videoRef}></video>
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100vw", marginTop: "10px" }}>
                <img style={{ width: "50%" }} src="https://i.ibb.co/9cSHCf1/parte-abajo.png" alt="" />
            </div>
        </div>
    );
};

export default QRCodeScanner;

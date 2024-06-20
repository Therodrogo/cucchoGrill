import React, { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import QrScanner from 'qr-scanner';
import { Button, Card, CardBody } from '@nextui-org/react';

const QRCodeScanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [scanner, setScanner] = useState(null);

    const [orden, setOrden] = useState("")

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
        encenderCamara()
    }, [])


    const encenderCamara = () => {
        const qrScanner = new QrScanner(
            videoRef.current,
            result => {
                Swal.fire('QR Code', `Contenido: ${result}`, 'success');

                const match = result.match(/^(\D+)\s(\d+)\s(.+)$/);

                if (match) {
                    const primeraParte = match[1].trim(); // "Mesa"
                    const numero = match[2]; // "1"
                    const segundaParte = match[3]; // "CucchoGrill"
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Escanero con exito",
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                        }
                    });
                    setScanner(null)


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
        <div>
            <h5 className="text-center">Escanear código QR</h5>
            <Card style={{ marginLeft: "20px", marginRight: "20px" }}>
                <CardBody>
                    <video style={{ borderRadius: "12px" }} ref={videoRef}></video>
                </CardBody>
            </Card>
        </div>
    );
};

export default QRCodeScanner;

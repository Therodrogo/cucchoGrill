import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = () => {

    const [scanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        })

        scanner.render(success, error)

        function success(result) {
            scanner.clear();
            setScanResult(result)
        }
        function error(err) {
            console.warn(err)
        }
    },[])


    return (
        <div >
            <h2>Escáner de QR</h2>
            {scanResult
            ?<div>Success: <a href={"http://"+scanResult}>{scanResult}</a></div>
            : <div id="reader"></div>
            }
           
            
        </div>
    );
};

export default QrScanner;

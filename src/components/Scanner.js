import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import QrCode from 'qrcode';

const Scanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showScanner, setShowScanner] = useState(true);
    const [a, setA] = useState(true);
    const generateQrCode = async () => {
        try {
            const response = await QrCode.toDataURL(text);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    };
    const scanQrCode = () => {
        setA(true);
        setShowScanner(true)
    }
    const onScanSuccess = (result) => {
        setShowScanner(false);
        setScanResult(result);
    };
    useEffect(() => {
        if (showScanner) {
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            });
            scanner.render(onScanSuccess, (err) => console.warn(err));
            return () => scanner.clear();
        }
    }, [showScanner]);
    return (
        <div className="text-light">
            <h1 className='mb-2 text-center'>Generate and Scan your QR Code Here</h1>
            <h4 style={{ display: "inline" }}>Welcome</h4>
            <div className="row mt-2 mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Enter your content here to generate QR code" onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="col">
                    <button type="button" className='btn btn-success' onClick={() => generateQrCode()}>Generate</button>
                    <button type="button" className='ms-1 btn btn-success' onClick={() => scanQrCode()}>Scan</button>
                </div>
            </div>
            <div className='text-center'>
                {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="img" /> <br />Click Here to download the QR Code</a>) : null}
            </div>
            {scanResult && (<div>Scanned Code is: <a href={"http://" + scanResult}>{scanResult}</a></div>)}
            {a && (<div className="mt-4">
                <div id="reader"></div>
            </div>)}
        </div>
    );
};

export default Scanner;

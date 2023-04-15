import React from 'react';
import QRCode from "react-qr-code";

function Mobile() {

    const token = fetch("http://localhost:8000/token").then(res => res.text()) || "No token"
    if (token === "No token") {
        return (
            <div>
                <h1>Mobile Login</h1>
                <p>Can't start server</p>
            </div>
        );
    }
    return (
        <div>
            <h1>Mobile Login</h1>

            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
                <QRCode
                    size={256}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={token}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    );
}

export default Mobile;
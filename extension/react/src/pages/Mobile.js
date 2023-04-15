import React, {useEffect, useState} from 'react';
import QRCode from "react-qr-code";

function Mobile() {

    // useState to store token
    const [token, setToken] = useState()

    // fetch token from server, response is sent in res.send() format
    fetch("http://localhost:8000/token")
    .then(res => res.text())
    .then(res => setToken(res))

    // wait for the token to be fetched
    useEffect(() => {
        console.log("token fetched")
        console.log(token)
    }, [token])

    return (
        <div>
            <h1>Mobile Login</h1>

            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
                {token? <QRCode
                    size={256}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={token}
                    viewBox={`0 0 256 256`}
                />: <p>Loading...</p> }
            </div>
        </div>
    );
}

export default Mobile;
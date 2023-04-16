import React, {useEffect, useState} from 'react';
import QRCode from "react-qr-code";
import {Container} from "react-bootstrap";
import io from 'socket.io-client';


const socket = io.connect('http://localhost:8000');

function Mobile() {

    // useState to store token
    const [token, setToken] = useState()

    // socket.on('receive', data => {
    //     const {comm, key} = data;
    //     //key is the key to be pressed
    // })

    const fetchToken = () => {
        fetch("http://localhost:8000/token")
            .then(res => res.text())
            .then(res => {
                setToken(res)
                socket.emit('connect_device', {room: res})
            })
    }

    // wait for the token to be fetched
    useEffect(() => {
        if (!token) {
            fetchToken()
        }
        console.log("token fetched")
        console.log(token)
    }, [token])


    return (
        <div>
            <Container className={"center "}>
                <h1>Connect Phone</h1>

                <div style={{height: "auto", margin: "0 auto", maxWidth: 128, width: "100%"}}>
                    {token ? <QRCode
                        size={512}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        value={token}
                        viewBox={`0 0 512 512`}
                    /> : <p>Loading...</p>}
                </div>
            </Container>
        </div>
    );
}

export default Mobile;
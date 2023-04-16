import React, {useState} from 'react';
import {Button} from "react-bootstrap";

function Home() {

    const style = {
        margin: "10px auto",
    }

    const centre = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }

    // TODO: Check if mobile is connected or not
    const [status, setStatus] = useState("not connected");
    return (
        <div style={centre}>
            <h1>MobiStick</h1>
            <div><p>Current Status: <code>{status}</code></p></div>
            {status !== "connected" ? <div style={style}>
                <Button variant="primary" href="/mobile">Connect Mobile</Button>
            </div>: null }

            <div style={style}>
                <Button variant="primary">Start Service</Button>
            </div>
        </div>
    );
}

export default Home;
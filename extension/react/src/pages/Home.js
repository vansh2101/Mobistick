import React from 'react';
import {Button} from "react-bootstrap";

function Home() {
    return (
        <div>
            <h1>MobiStick</h1>
            <Button variant="primary" href="/mobile">Connect Mobile</Button>

            <Button variant="primary">Start Service</Button>
        </div>
    );
}

export default Home;
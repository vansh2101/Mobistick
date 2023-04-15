// router
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Mobile from './pages/Mobile';

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/mobile' element={<Mobile/>}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;

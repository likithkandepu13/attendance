import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Calc1 from './Calc1';
import Calc2 from './Calc2';
import Calc3 from './calc3';
import Home from './home';
import ResponsiveAppBar from './SampleNavBar';

const NavBar = () => {
    return (
        <div className="navbar2">
            <ResponsiveAppBar />
            <Routes>
            <Route path="/" element={<Home/>} /> {/* Redirect from "/" to "/home" */}
                <Route path="/attendance" element={<Home/>} /> {/* Redirect from "/" to "/home" */}
                <Route path="/home" element={<Home />} />
                <Route path="/total" element={<Calc1 />} />
                <Route path="/calbyltps" element={<Calc2 />} />
                <Route path="/calc3" element={<Calc3 />} />
            </Routes>
            <br />
            <br />
        </div>
    );
}

export default NavBar;

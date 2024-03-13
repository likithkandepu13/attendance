import React from 'react';
import Calc1 from './Calc1';
import { Link, Route, Routes } from 'react-router-dom';
import Calc2 from './Calc2';
// import './navbar2.css'
import Calc3 from './calc3';
import Home from './home';
import ResponsiveAppBar from './SampleNavBar';

const NavBar = () => {
    return (
        <div className="navbar2">
       
            <ResponsiveAppBar/>
            <Routes>
                <Route path='/home'element={<Home/>} />
                <Route path='/total'element={<Calc1/>} />
                <Route path='/calbyltps' element={<Calc2/>} />
                <Route path='/calc3' element={<Calc3/>} />
            </Routes>
            <br/>
            <br/>
            
        </div>
    );
}

export default NavBar;

import React from 'react';
import Calc1 from './Calc1';
import { Link, Route, Routes } from 'react-router-dom';
import Calc2 from './Calc2';
import './navbar2.css'
import Calc3 from './calc3';
import Home from './home';

const NavBar = () => {
    return (
        <div className="navbar2">
            <ul>
                <li><Link to='/home' >Home </Link></li>
                <li><Link to='/calbyltps' >Calculate Total Attendance by L-T-P-S</Link></li>
                <li><Link to='/total' >Calculate Your Attendance When Absent </Link></li>
                <li><Link to='/calc3' >Calculate Your Attendance </Link></li>
                
            </ul>
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

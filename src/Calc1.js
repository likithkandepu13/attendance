import React, { useState } from 'react';
import './navbar.css';

const Calc1 = () => {
    const [tclass1, setClass1] = useState('');
    const [tclass2, setTClass2] = useState('');
    const [attendancePercentage, setAttendancePercentage] = useState();
    const [pap, setPap] = useState();
    const [classes1, setClasses] = useState('');

    const class1set = (event) => {
        setClass1(event.target.value);
    };

    const class2set = (event) => {
        setTClass2(event.target.value);
    };

    const calci = () => {
        const sum = (parseInt(tclass2) / parseInt(tclass1)) * 100;
        setAttendancePercentage(Math.round(sum));
    };

    const nofclasses = (event) => {
        setClasses(event.target.value);
    };

    const newatp = () => {
        const sum = ((parseInt(tclass2) - parseInt(classes1)) / parseInt(tclass1)) * 100;
        setPap(Math.round(sum));
    };

    let alertMessage = null;
    if (parseInt(tclass1) < parseInt(tclass2)) {
        alertMessage = <div style={{color:"red"}}> (Total classes is Less than the attended)</div>;
    }
    let alertMessage1 = null;
    if (parseInt(tclass2) < parseInt(classes1)) {
        alertMessage1 = <div style={{color:"red"}}> (Absent classes is Less than the attended)</div>;
    }

    return (
        <div className="navbar">
            <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}> Absent Calculator</h1>
            <label htmlFor="tclass1">Please enter the total number of classes :</label>
            <input type="number" value={tclass1} onChange={class1set} id="tclass1" />
            <br />
            <label htmlFor="tclass2">Please enter the number of classes you have attended :</label>
            <input type="number" value={tclass2} onChange={class2set} id="tclass2" />
            <br />
            {alertMessage}
            <button onClick={calci}>Submit</button>
            <br />
            <h3>Attendance percentage:</h3>
            <h2>
                <span id="attendancePercentage" style={{ color: attendancePercentage < 85 ? 'red' : 'green' }}>
                    {attendancePercentage}
                </span>
            </h2>
            <i>After submitting the above details, if you are going to be absent for future classes, then enter the number of classes you will be absent to calculate the percentage drop.</i>
            <br />
            <br/>
            
            <label htmlFor="classes1">Enter no of classes(Hours) you are going to be absent :</label>
            
            <input type="number" value={classes1} onChange={nofclasses} id="classes1" />
            <br />
            {alertMessage1}
            <button onClick={newatp}>Submit</button>
            <br />
            <h3>
                Updated Attendance after Absence :{' '}
            </h3>
            <h2 style={{ color: pap >= 85 ? 'green' : 'red' }}>
                <span id="pap">{pap}</span>
                
            </h2>
            <br />
            <i className="copyright">© 2024, 2200030837, Likith Kandepu</i>
        </div>
    );
};

export default Calc1;

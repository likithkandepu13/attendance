import React, { useState } from 'react';
import './navbar.css'


const Calc1 = () => {
    const [tclass1,setclass1] = useState('')
    const [tclass2,settclass2] = useState('')
    const [attendancePercentage, setAttendancePercentage] = useState()
    const [ap,setap] = useState('')
    const [pap,setpap] = useState()
    const [classes1,setclasees] = useState('')

    const class1set = (event) => {
        setclass1(event.target.value)
    }
    const class2set = (event) => {
        settclass2(event.target.value)
    }
    const calci =() => {
        const sum = (parseInt(tclass2)/parseInt(tclass1))*100

        setAttendancePercentage(Math.round(sum));
    }
    const setapfun =(event)=>
    {
        setap(event.target.value)
    }
    const  nofclasses = (event) =>
    {
        setclasees(event.target.value)
    }
    const newatp = () =>
    {
        const sum = (parseInt(tclass2- classes1)/parseInt(tclass1 ))*100

        setpap(Math.round(sum));
    }
    const newatp2 = () =>
    {
        
    }
    return (
        <div class="navbar">
    <h1 style={{textAlign: "center", fontFamily: "Arial, sans-serif"}}>KLU Attendance Calculator</h1>
    <label for="tclass1">
Please enter the total number of classes: :</label>
    <input type="text" value={tclass1} onChange={class1set} id="tclass1"/><br/>

    <label for="tclass2">Please enter the number of classes you have attended: :</label>
    <input type="text" value={tclass2} onChange={class2set} id="tclass2"/><br/>

    <button onClick={calci}>Submit</button><br/>
    <h3>Attendance percentage: </h3>
    {
         <h2><span id="attendancePercentage" style={{color: attendancePercentage < 85 ? "red" : "green"}}>
         {attendancePercentage}
       </span></h2>
    }

    <i>After submitting the above details, if you are going to be absent for future classes, then enter the number of classes you will be absent to calculate the percentage drop.</i><br/>

    {/* <label for="ap">Enter current attendance percentage:</label>
    <input type="text" value={ap} onChange={setapfun} id="ap"/> */}
    <br/>
    <label for="classes1">Enter no of classes(Hours) you are going to be absent :</label>
    <input type="text" value={classes1}  onChange={nofclasses} id="classes1"/><br/>

    <button onClick={newatp}>Submit</button><br/>

    <h3>
Updated Attendance after Absence:: </h3>
    {
        
        pap >= 85 ?
       <h2 style={{color:"green"}}> <span id="pap">{pap}</span> </h2>:
        <h2 style={{color:"red"}}><span id="pap">{pap}</span> </h2>
    }
    <br/>
    <i class="copyright">© 2024, 2200030837, Likith Kandepu</i>

</div>


    )

    
}

export default Calc1;

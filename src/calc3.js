import React, { useState } from 'react';
import './navbar.css'


const Calc3 = () => {
    const [tclass1,setclass1] = useState('')
    const [tclass2,settclass2] = useState('')
    const [attendancePercentage, setAttendancePercentage] = useState()



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
    
    let alertMessage = null;
    if (parseInt(tclass1) < parseInt(tclass2)) {
        alertMessage = <div style={{color:"red"}}> (Total classes is Less than the attended)</div>;
    }

 

 
    return (
        <div class="navbar">
    <h1 style={{textAlign: "center", fontFamily: "Arial, sans-serif"}}>Attendance Calculator</h1>
    <label for="tclass1">Enter Total no of classes :</label>
    <input type="number" value={tclass1} onChange={class1set} id="tclass1"/><br/>

    <label for="tclass2">Enter no of classes you have attended :</label>
    <input type="number" value={tclass2} onChange={class2set} id="tclass2"/><br/>
    {alertMessage}

    <button onClick={calci}>Submit</button><br/>
    <h3>Attendance percentage: </h3>
    {
         <h2><span id="attendancePercentage" style={{color: attendancePercentage < 85 ? "red" : "green"}}>
         {attendancePercentage}
       </span></h2>
    }

  
    <br/>
    <i class="copyright">© 2024, 2200030837, Likith Kandepu</i>

</div>


    )

    
}

export default Calc3;

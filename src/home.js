import React from 'react';
import './navbar.css'

const Home = () => {
    return (
        <div class="navbar">
                 <div class="navbar">
    <h1 style={{textAlign: "center", fontFamily: "Arial, sans-serif"}}>KLU Attendance Calculator</h1>
    <i style={{color:"red",fontSize:"15"}} for="tclass1">

    <b>Note* </b>This web application is designed for practice purposes and may occasionally display inaccuracies. We kindly ask that you refrain from misusing it.</i>
    

    <h3>Calculate Total Attendance </h3>
   

    <i>
Select "Calculate Total Attendance by L-T-P-S" to initiate the computation of aggregate attendance encompassing lectures, tutorials, practicals, and seminars.</i><br/>
<h3>Calculate Your Attendance When Absent </h3>
   

   <i>

   To calculate your attendance when absent, simply click on "Calculate Your Attendance When Absent.".</i><br/>

    <br/>
    <i>If you find any bugs in the application, kindly reach me in the issues in my github profile </i>


    <i class="copyright">© 2024, 2200030837, Likith Kandepu</i>

</div>
        </div>
    );
}

export default Home;

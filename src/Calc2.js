import React, { useState } from 'react';
import './calc2.css'

const Calc2 = () => {
    const lectureWeight = 100;
    const skillWeight = 25;
    const labWeight = 50;
    const tutorialWeight = 25;
    let totalWeight = lectureWeight + skillWeight + labWeight + tutorialWeight;

    const [lect, setLect] = useState('');
    const [tut, setTut] = useState('');
    const [pract, setPract] = useState('');
    const [skill, setSkill] = useState('');
    const [attendancePercentage, setAttendancePercentage] = useState();

    const handleLectureChange = (event) => {
        setLect(event.target.value);
    }

    const handleTutorialChange = (event) => {
        setTut(event.target.value);
    }

    const handlePracticalChange = (event) => {
        setPract(event.target.value);
    }

    const handleSkillChange = (event) => {
        setSkill(event.target.value);
    }

    const calculateTotal = () => {
        let totalScore = 0;
        if(lect==='')
        {
            totalWeight-=lectureWeight
        }
        if(tut==='')
        {
            totalWeight-=tutorialWeight
        }
        if(pract==='')
        {
            totalWeight-=labWeight
        }
        if(skill==='')
        {
            totalWeight-=skillWeight
        }

        if (lect !== '') {
            totalScore += parseInt(lect) * (lectureWeight / 100);
        }
        if (skill !== '') {
            totalScore += parseInt(skill) * (skillWeight / 100);
        }
        if (pract !== '') {
            totalScore += parseInt(pract) * (labWeight / 100);
        }
        if (tut !== '') {
            totalScore += parseInt(tut) * (tutorialWeight / 100);
        }

        const calculatedAttendancePercentage = (totalScore / totalWeight) * 100;
        setAttendancePercentage(calculatedAttendancePercentage.toFixed(2));
    }

    return (
        
              <div class="navbar">
                <h1 style={{textAlign: "center", fontFamily: "Arial, sans-serif"}}>KLU Attendance Calculator</h1>
              <h4 style={{textAlign: "center", fontFamily: "Arial, sans-serif"}}>
Please input the following details to obtain your overall attendance for a specific subject.</h4>
<i>
(If no component is present, please leave it)</i><br/><br/>
            
              <label>
Please enter the lecture component :</label>
                <input  type="text" id='lect' value={lect} onChange={handleLectureChange} />
                 <label>
Please enter the tutorial component: :</label>
                 <input type="text" id='tut'  value={tut} onChange={handleTutorialChange} />
                <label>
Please enter the practical component: :</label>
                <input  type="text" id='pract'  value={pract} onChange={handlePracticalChange} />
                 <label>
Please enter the skilling component: :</label>
                 <input  type="text" id='skill'  value={skill} onChange={handleSkillChange} />
          
                 <button onClick={calculateTotal}>Submit</button>
              <h3>Attendance percentage: </h3>
              {
                   <h2><span id="attendancePercentage" style={{color: attendancePercentage < 85 ? "red" : "green"}}>
                   {attendancePercentage}
                 </span></h2>
              }
          
              
              <br/>
              <i class="copyright">© 2024, 2200030837, Likith Kandepu</i>
          
          </div>
      
    );
}

export default Calc2;

import React, { useState } from 'react';
import './calc2.css';

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
    const [attendancePercentage, setAttendancePercentage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

        if (lect !== '' && (parseInt(lect) < 1 || parseInt(lect) > 100)) {
            setErrorMessage('Please enter a number between 1 and 100 for lecture component.');
            return;
        }

        if (tut !== '' && (parseInt(tut) < 1 || parseInt(tut) > 100)) {
            setErrorMessage('Please enter a number between 1 and 100 for tutorial component.');
            return;
        }

        if (pract !== '' && (parseInt(pract) < 1 || parseInt(pract) > 100)) {
            setErrorMessage('Please enter a number between 1 and 100 for practical component.');
            return;
        }

        if (skill !== '' && (parseInt(skill) < 1 || parseInt(skill) > 100)) {
            setErrorMessage('Please enter a number between 1 and 100 for skilling component.');
            return;
        }
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
        setErrorMessage('');
    }

    return (
        <div className="navbar">
            <h1 style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>L-T-P-S Calculator</h1>
            <h4 style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
                Please input the following details to obtain your overall attendance for a specific subject.
            </h4>
            <i>(If no component is present, please leave it)</i><br /><br />

            <label>Please enter the lecture component :</label>
            <input type="number" value={lect} onChange={handleLectureChange} />
            <label>Please enter the tutorial component :</label>
            <input type="number" value={tut} onChange={handleTutorialChange} />
            <label>Please enter the practical component :</label>
            <input type="number" value={pract} onChange={handlePracticalChange} />
            <label>Please enter the skilling component :</label>
            <input type="number" value={skill} onChange={handleSkillChange} />

            <button onClick={calculateTotal}>Submit</button>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <h3>Attendance percentage: </h3>
            <h2>
                <span style={{ color: attendancePercentage < 85 ? "red" : "green" }}>
                    {attendancePercentage}
                </span>
            </h2>

            <br />
            <i className="copyright">© 2024, 2200030837, Likith Kandepu</i>
        </div>
    );
}

export default Calc2;

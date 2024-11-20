import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './calc2.css';

const Calc1 = () => {
    const [totalClasses, setTotalClasses] = useState('');
    const [attendedClasses, setAttendedClasses] = useState('');
    const [absentClasses, setAbsentClasses] = useState('');
    const [currentPercentage, setCurrentPercentage] = useState(null);
    const [updatedPercentage, setUpdatedPercentage] = useState(null);
    const [classesNeeded85, setClassesNeeded85] = useState(null);
    const [classesNeeded65, setClassesNeeded65] = useState(null);
    const [error, setError] = useState('');

    const calculateClassesNeeded = (current, total, targetPercentage) => {
        const currentAttended = parseInt(current);
        const totalClasses = parseInt(total);
        let classesNeeded = 0;
        let tempTotal = totalClasses;
        let tempPercentage = (currentAttended / tempTotal) * 100;

        while (tempPercentage < targetPercentage && classesNeeded < 100) {
            classesNeeded++;
            tempTotal++;
            tempPercentage = ((currentAttended + classesNeeded) / tempTotal) * 100;
        }

        return classesNeeded;
    };

    const calculateAttendance = () => {
        if (!totalClasses || !attendedClasses) {
            setError('Please enter both total and attended classes');
            return;
        }

        const total = parseInt(totalClasses);
        const attended = parseInt(attendedClasses);

        if (attended > total) {
            setError('Attended classes cannot be more than total classes');
            return;
        }

        setError('');
        const percentage = (attended / total) * 100;
        setCurrentPercentage(Math.round(percentage));
        
        setClassesNeeded85(calculateClassesNeeded(attended, total, 85));
        setClassesNeeded65(calculateClassesNeeded(attended, total, 65));
    };

    const calculateUpdatedAttendance = () => {
        if (!absentClasses) return;

        const total = parseInt(totalClasses);
        const attended = parseInt(attendedClasses);
        const absent = parseInt(absentClasses);

        if (absent > attended) {
            setError('Absent classes cannot be more than attended classes');
            return;
        }

        setError('');
        const newPercentage = (attended / (total + absent)) * 100;
        setUpdatedPercentage(Math.round(newPercentage));
    };

    const getPercentageClass = (percentage) => {
        if (percentage >= 85) return 'percentage-high';
        if (percentage >= 65) return 'percentage-medium';
        return 'percentage-low';
    };

    return (
        <motion.div 
            className="calculator-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="header">
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Absence Impact Calculator
                </motion.h1>
            </div>

            <div className="input-grid">
                <div className="input-group">
                    <label>Total Classes</label>
                    <input
                        type="number"
                        value={totalClasses}
                        onChange={(e) => setTotalClasses(e.target.value)}
                        placeholder="Enter total classes"
                    />
                </div>

                <div className="input-group">
                    <label>Attended Classes</label>
                    <input
                        type="number"
                        value={attendedClasses}
                        onChange={(e) => setAttendedClasses(e.target.value)}
                        placeholder="Enter attended classes"
                    />
                </div>

                <div className="button-group">
                    <button className="calculate-btn" onClick={calculateAttendance}>
                        Calculate Current Attendance
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {currentPercentage !== null && (
                <motion.div 
                    className="results-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={`percentage-display ${getPercentageClass(currentPercentage)}`}>
                        Current Attendance: {currentPercentage}%
                    </div>

                    <div className="recommendation-card">
                        <h3>Attendance Goals</h3>
                        {currentPercentage < 85 && (
                            <div className="recommendation-text">
                                To reach 85%: Need to attend {classesNeeded85} more classes
                            </div>
                        )}
                        {currentPercentage < 65 && (
                            <div className="recommendation-text">
                                To reach 65%: Need to attend {classesNeeded65} more classes
                            </div>
                        )}
                    </div>

                    <div className="input-group" style={{ marginTop: '2rem' }}>
                        <label>Planning to Skip Classes?</label>
                        <input
                            type="number"
                            value={absentClasses}
                            onChange={(e) => {
                                setAbsentClasses(e.target.value);
                                calculateUpdatedAttendance();
                            }}
                            placeholder="Enter classes you'll miss"
                        />
                    </div>

                    {updatedPercentage !== null && (
                        <div className={`percentage-display ${getPercentageClass(updatedPercentage)}`}>
                            Projected Attendance: {updatedPercentage}%
                        </div>
                    )}
                </motion.div>
            )}

            <div className="copyright">
                © 2024, 2200030837, Likith Kandepu
            </div>
        </motion.div>
    );
};

export default Calc1;
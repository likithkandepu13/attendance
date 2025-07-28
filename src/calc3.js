import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { FaUndo } from 'react-icons/fa';
import './calc2.css';

const Calc3 = () => {
    const [totalClasses, setTotalClasses] = useState('');
    const [attendedClasses, setAttendedClasses] = useState('');
    const [attendancePercentage, setAttendancePercentage] = useState(null);
    const [classesNeeded85, setClassesNeeded85] = useState(null);
    const [classesNeeded65, setClassesNeeded65] = useState(null);
    const [error, setError] = useState('');

    const bind = useDrag(({ movement: [mx], direction: [dx], velocity: [vx], tap }) => {
        if (tap) return;
        
        if (Math.abs(mx) > 50 || Math.abs(vx) > 0.5) {
            if (dx > 0) {
                resetForm();
            }
        }
    }, {
        axis: 'x',
        rubberband: true,
        threshold: 5
    });

    const resetForm = () => {
        setTotalClasses('');
        setAttendedClasses('');
        setAttendancePercentage(null);
        setClassesNeeded85(null);
        setClassesNeeded65(null);
        setError('');
    };

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
        setAttendancePercentage(Math.round(percentage));
        
        setClassesNeeded85(calculateClassesNeeded(attended, total, 85));
        setClassesNeeded65(calculateClassesNeeded(attended, total, 65));

        // Scroll to results after a short delay to allow state updates
        setTimeout(() => {
            const resultsContainer = document.querySelector('.results-container');
            if (resultsContainer) {
                resultsContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 100);
    };

    const getPercentageClass = (percentage) => {
        if (percentage >= 85) return 'percentage-high';
        if (percentage >= 65) return 'percentage-medium';
        return 'percentage-low';
    };

    const getAttendanceStatus = (percentage) => {
        if (percentage >= 85) return 'Excellent! Keep it up! 🌟';
        if (percentage >= 65) return 'Good, but room for improvement! 📈';
        return 'Needs immediate attention! ⚠️';
    };

    return (
        <motion.div 
            className="calculator-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            {...bind()}
        >
            <div className="header">
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Simple Attendance Calculator
                </motion.h1>
            </div>

            <div className="input-grid">
                <motion.div 
                    className="input-group"
                    whileHover={{ scale: 1.02 }}
                >
                    <label>Total Number of Classes</label>
                    <input
                        type="number"
                        value={totalClasses}
                        onChange={(e) => setTotalClasses(e.target.value)}
                        placeholder="Enter total classes"
                    />
                </motion.div>

                <motion.div 
                    className="input-group"
                    whileHover={{ scale: 1.02 }}
                >
                    <label>Classes Attended</label>
                    <input
                        type="number"
                        value={attendedClasses}
                        onChange={(e) => setAttendedClasses(e.target.value)}
                        placeholder="Enter attended classes"
                    />
                </motion.div>

                <div className="button-group">
                    <motion.button 
                        className="calculate-btn" 
                        onClick={calculateAttendance}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Calculate Attendance
                    </motion.button>
                    <motion.button 
                        className="reset-btn" 
                        onClick={resetForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaUndo /> Reset
                    </motion.button>
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

            {attendancePercentage !== null && (
                <motion.div 
                    className="results-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={`percentage-display ${getPercentageClass(attendancePercentage)}`}>
                        {attendancePercentage}%
                    </div>

                    <div className="recommendation-card">
                        <h3>Status</h3>
                        <div className="recommendation-text">
                            {getAttendanceStatus(attendancePercentage)}
                        </div>
                    </div>

                    {attendancePercentage < 85 && (
                        <div className="recommendation-card">
                            <h3>Improvement Plan</h3>
                            <div className="recommendation-text">
                                <p>To reach 85% attendance: Need to attend {classesNeeded85} more classes</p>
                                {attendancePercentage < 65 && (
                                    <p>To reach minimum 65% attendance: Need to attend {classesNeeded65} more classes</p>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}

            {/* ERP Quick Access Section */}
            <motion.div 
                className="erp-quick-access"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="erp-header">
                    <h3>📊 KL University ERP - Quick Access</h3>
                    <p>Access your attendance data from the official KL University ERP system</p>
                </div>
                
                <div className="erp-content">
                    <div className="erp-info">
                        <div className="erp-icon">🎓</div>
                        <div className="erp-text">
                            <h4>How to use:</h4>
                            <ol>
                                <li>Click "Open KLU ERP" below</li>
                                <li>Login to your student account</li>
                                <li>Navigate to Attendance section</li>
                                <li>Copy your attendance percentages</li>
                                <li>Return here and enter the data</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div className="erp-actions">
                        <a 
                            href="https://erp.kluniversity.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="erp-primary-btn"
                        >
                            🔗 Open KLU ERP
                        </a>
                        <div className="erp-secondary-actions">
                            <button 
                                className="erp-secondary-btn"
                                onClick={() => {
                                    const newWindow = window.open('https://erp.kluniversity.in', '_blank');
                                    if (newWindow) {
                                        newWindow.focus();
                                    }
                                }}
                            >
                                📱 Open in New Window
                            </button>
                            <button 
                                className="erp-secondary-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText('https://erp.kluniversity.in');
                                    alert('ERP URL copied to clipboard! 📋');
                                }}
                            >
                                📋 Copy URL
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="erp-footer">
                    <p>💡 <strong>Pro Tip:</strong> Keep the ERP tab open while using this calculator for quick reference</p>
                </div>
            </motion.div>

            <div className="copyright">
                © 2024, 2200030837, Likith Kandepu
            </div>
        </motion.div>
    );
};

export default Calc3;
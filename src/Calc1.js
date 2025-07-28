import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { FaUndo, FaCalculator, FaChartLine } from 'react-icons/fa';
import './calc2.css';

const Calc1 = () => {
    const [totalClasses, setTotalClasses] = useState('');
    const [attendedClasses, setAttendedClasses] = useState('');
    const [projectedAbsences, setProjectedAbsences] = useState('');
    const [currentPercentage, setCurrentPercentage] = useState(null);
    const [projectedPercentage, setProjectedPercentage] = useState(null);
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

    // Watch for changes in projected absences and trigger calculation
    useEffect(() => {
        if (currentPercentage !== null && totalClasses && attendedClasses && projectedAbsences) {
            const absences = parseInt(projectedAbsences);
            if (absences > 0) {
                calculateProjectedAttendance();
            } else {
                setProjectedPercentage(null);
            }
        }
    }, [projectedAbsences, currentPercentage, totalClasses, attendedClasses]);

    const resetForm = () => {
        setTotalClasses('');
        setAttendedClasses('');
        setProjectedAbsences('');
        setCurrentPercentage(null);
        setProjectedPercentage(null);
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
        setCurrentPercentage(Math.round(percentage));
        
        setClassesNeeded85(calculateClassesNeeded(attended, total, 85));
        setClassesNeeded65(calculateClassesNeeded(attended, total, 65));

        // Always calculate projected attendance if projected absences are entered
        if (projectedAbsences && projectedAbsences > 0) {
            calculateProjectedAttendance();
        } else {
            setProjectedPercentage(null);
        }

        // Scroll to results after a short delay to allow state updates
        setTimeout(() => {
            const resultsSection = document.querySelector('.results-section');
            if (resultsSection) {
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 100);
    };

    const calculateProjectedAttendance = () => {
        const total = parseInt(totalClasses);
        const attended = parseInt(attendedClasses);
        const absences = parseInt(projectedAbsences);

        // Validate inputs
        if (!total || !attended || !absences) {
            setProjectedPercentage(null);
            return;
        }

        if (absences > attended) {
            setError('Projected absences cannot be more than attended classes');
            setProjectedPercentage(null);
            return;
        }

        if (absences < 0) {
            setError('Projected absences cannot be negative');
            setProjectedPercentage(null);
            return;
        }

        setError(''); // Clear any previous errors
        const projected = ((attended - absences) / total) * 100;
        const roundedProjected = Math.round(projected);
        setProjectedPercentage(roundedProjected);
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
            {...bind()}
        >
            <div className="header">
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaCalculator className="header-icon" /> Attendance Calculator
                </motion.h1>
                <p className="header-subtitle">Track and project your attendance easily</p>
            </div>

            <div className="calculator-grid">
                <motion.div 
                    className="input-section"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="input-group">
                        <label>Total Classes</label>
                        <input
                            type="number"
                            value={totalClasses}
                            onChange={(e) => setTotalClasses(e.target.value)}
                            placeholder="Enter total classes"
                            min="0"
                        />
                    </div>

                    <div className="input-group">
                        <label>Attended Classes</label>
                        <input
                            type="number"
                            value={attendedClasses}
                            onChange={(e) => setAttendedClasses(e.target.value)}
                            placeholder="Enter attended classes"
                            min="0"
                        />
                    </div>

                    <div className="input-group">
                        <label>Projected Absences</label>
                        <input
                            type="number"
                            value={projectedAbsences}
                            onChange={(e) => setProjectedAbsences(e.target.value)}
                            placeholder="Enter planned absences"
                            min="0"
                        />
                    </div>
                </motion.div>

                <div className="button-group">
                    <motion.button 
                        className="calculate-btn"
                        onClick={calculateAttendance}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaChartLine /> Calculate
                    </motion.button>
                    <motion.button 
                        className="reset-btn"
                        onClick={resetForm}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaUndo /> Reset
                    </motion.button>
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
                        className="results-section"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`percentage-display ${getPercentageClass(currentPercentage)}`}>
                            Current Attendance: {currentPercentage}%
                        </div>

                        {projectedPercentage !== null && (
                            <motion.div 
                                className={`percentage-display ${getPercentageClass(projectedPercentage)} projected`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="projected-label">📊 Projected Attendance (with {projectedAbsences} absences):</div>
                                <div className="projected-value">{projectedPercentage}%</div>
                            </motion.div>
                        )}

                        <div className="recommendation-card">
                            <h3>Status & Recommendations</h3>
                            <div className="recommendation-text">
                                {currentPercentage >= 85 ? (
                                    "Excellent attendance! Keep it up! 🌟"
                                ) : currentPercentage >= 65 ? (
                                    "Good attendance, but room for improvement! 📈"
                                ) : (
                                    "Attendance needs attention! ⚠️"
                                )}
                            </div>
                        </div>

                        {currentPercentage < 85 && (
                            <div className="improvement-card">
                                <h3>Required Classes</h3>
                                <div className="improvement-text">
                                    <p>For 85%: Need {classesNeeded85} more classes</p>
                                    {currentPercentage < 65 && (
                                        <p>For 65%: Need {classesNeeded65} more classes</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

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

export default Calc1;
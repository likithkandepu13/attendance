import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { FaDownload, FaTrophy, FaUndo, FaHistory, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Confetti from 'react-confetti';
import jsPDF from 'jspdf';
import './calc2.css';

const Calc2 = () => {
    const [subject, setSubject] = useState('');
    const [lect, setLect] = useState('');
    const [tut, setTut] = useState('');
    const [pract, setPract] = useState('');
    const [skill, setSkill] = useState('');
    const [attendancePercentage, setAttendancePercentage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [currentHistoryPage, setCurrentHistoryPage] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const weights = {
        lecture: 100,
        tutorial: 25,
        practical: 50,
        skilling: 25
    };

    const ITEMS_PER_PAGE = windowSize.width > 768 ? 6 : 3;
    const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);

    const getConfettiConfig = (percentage) => {
        const baseConfig = {
            width: windowSize.width,
            height: windowSize.height,
            recycle: false,
            numberOfPieces: Math.min(200, windowSize.width / 4),
            gravity: 0.3,
            initialVelocityY: { min: -10, max: 0 },
            initialVelocityX: { min: -5, max: 5 },
        };

        if (percentage >= 85) {
            return {
                ...baseConfig,
                colors: ['#15803d', '#22c55e', '#4ade80', '#86efac', '#gold'],
                confettiSource: { x: windowSize.width / 2, y: windowSize.height / 2 },
            };
        } else if (percentage >= 75) {
            return {
                ...baseConfig,
                colors: ['#b45309', '#d97706', '#fbbf24', '#fde68a'],
                numberOfPieces: Math.min(150, windowSize.width / 5),
            };
        } else {
            return {
                ...baseConfig,
                colors: ['#a51c24', '#dc2626', '#f87171', '#fecaca'],
                numberOfPieces: Math.min(100, windowSize.width / 6),
            };
        }
    };

    const bind = useDrag(({ movement: [mx], direction: [dx], velocity: [vx], tap }) => {
        if (tap) return;
        
        const swipeThreshold = windowSize.width * 0.15;
        const velocityThreshold = 0.5;
        
        if (Math.abs(mx) > swipeThreshold || Math.abs(vx) > velocityThreshold) {
            if (dx > 0 && currentHistoryPage > 0) {
                setCurrentHistoryPage(p => p - 1);
            } else if (dx < 0 && currentHistoryPage < totalPages - 1) {
                setCurrentHistoryPage(p => p + 1);
            }
        }
    }, {
        axis: 'x',
        rubberband: true,
        threshold: 5
    });

    const getAttendanceStatus = (percentage) => {
        if (percentage >= 85) return 'Excellent';
        if (percentage >= 75) return 'Good';
        if (percentage >= 65) return 'Average';
        return 'Needs Improvement';
    };

    const getComponentAnalysis = (components) => {
        const analysis = [];
        const enteredComponents = {
            Lecture: lect !== '' ? parseFloat(lect) : null,
            Tutorial: tut !== '' ? parseFloat(tut) : null,
            Practical: pract !== '' ? parseFloat(pract) : null,
            Skilling: skill !== '' ? parseFloat(skill) : null
        };

        Object.entries(enteredComponents).forEach(([component, value]) => {
            if (value !== null) {
                if (value >= 85) {
                    analysis.push(`${component}: Excellent (${value}%) ${Array(3).fill('⭐').join('')}`);
                } else if (value >= 75) {
                    analysis.push(`${component}: Good (${value}%) ${Array(2).fill('⭐').join('')}`);
                } else {
                    analysis.push(`${component}: Needs improvement (${value}%) ⭐`);
                }
            }
        });

        return analysis;
    };

    const getRecommendation = (percentage, components) => {
        let recommendations = [];
        
        if (percentage < 85) {
            const improvement = (85 - percentage).toFixed(2);
            recommendations.push(`Need ${improvement}% improvement to reach excellence`);
            recommendations.push(`Focus on consistent attendance to improve by ${(improvement / 30).toFixed(1)}% per week`);
        }

        const enteredComponents = [];
        if (lect !== '') enteredComponents.push({ name: 'Lecture', value: parseFloat(lect) });
        if (tut !== '') enteredComponents.push({ name: 'Tutorial', value: parseFloat(tut) });
        if (pract !== '') enteredComponents.push({ name: 'Practical', value: parseFloat(pract) });
        if (skill !== '') enteredComponents.push({ name: 'Skilling', value: parseFloat(skill) });

        enteredComponents.sort((a, b) => a.value - b.value);

        enteredComponents.forEach(comp => {
            if (comp.value < 75) {
                recommendations.push(`${comp.name} attendance is critical at ${comp.value}% - needs immediate attention`);
                recommendations.push(`Aim to attend next 5 ${comp.name} sessions consistently`);
            }
        });

        return recommendations;
    };

    const handleInputChange = (setter) => (event) => {
        const value = event.target.value;
        if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
            setter(value);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a value between 0 and 100');
        }
    };

    const resetForm = () => {
        setSubject('');
        setLect('');
        setTut('');
        setPract('');
        setSkill('');
        setAttendancePercentage('');
        setErrorMessage('');
        setAnalysis(null);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(24);
        doc.setTextColor(165, 28, 36);
        doc.text('Attendance Report', 20, 20);
        
        // Subject and Overall Attendance
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        if (subject) {
            doc.text(`Subject: ${subject}`, 20, 40);
        }
        doc.text(`Overall Attendance: ${attendancePercentage}%`, 20, 50);
        doc.text(`Status: ${analysis.status}`, 20, 60);
        
        // Component Analysis
        doc.setFontSize(16);
        doc.setTextColor(165, 28, 36);
        doc.text('Component Analysis:', 20, 80);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        analysis.componentAnalysis.forEach((item, index) => {
            doc.text(`• ${item}`, 25, 95 + (index * 10));
        });
        
        // Recommendations
        doc.setFontSize(16);
        doc.setTextColor(165, 28, 36);
        doc.text('Recommendations:', 20, 140);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        analysis.recommendations.forEach((item, index) => {
            doc.text(`• ${item}`, 25, 155 + (index * 10));
        });
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('Generated by L-T-P-S Calculator Pro', 20, 280);
        doc.text(new Date().toLocaleString(), 20, 285);
        
        doc.save('attendance-report.pdf');
    };

    const calculateTotal = () => {
        let totalWeight = 0;
        let totalScore = 0;

        const components = [
            { value: lect, weight: weights.lecture },
            { value: tut, weight: weights.tutorial },
            { value: pract, weight: weights.practical },
            { value: skill, weight: weights.skilling }
        ];

        let hasValidInput = false;
        components.forEach(comp => {
            if (comp.value !== '') {
                hasValidInput = true;
                if (parseFloat(comp.value) < 0 || parseFloat(comp.value) > 100) {
                    setErrorMessage('Please enter valid percentages between 0 and 100');
                    return;
                }
                totalWeight += comp.weight;
                totalScore += parseFloat(comp.value) * (comp.weight / 100);
            }
        });

        if (!hasValidInput) {
            setErrorMessage('Please enter at least one component');
            return;
        }

        const calculatedPercentage = (totalScore / totalWeight) * 100;
        const roundedPercentage = calculatedPercentage.toFixed(2);

        setAttendancePercentage(roundedPercentage);
        setErrorMessage('');
        
        const componentValues = {
            lect: parseFloat(lect) || 0,
            tut: parseFloat(tut) || 0,
            pract: parseFloat(pract) || 0,
            skill: parseFloat(skill) || 0
        };

        const newAnalysis = {
            status: getAttendanceStatus(calculatedPercentage),
            componentAnalysis: getComponentAnalysis(componentValues),
            recommendations: getRecommendation(calculatedPercentage, componentValues)
        };

        setAnalysis(newAnalysis);

        setHistory(prev => [{
            subject,
            percentage: roundedPercentage,
            timestamp: new Date().toLocaleString(),
            components: componentValues,
            status: newAnalysis.status
        }, ...prev]);
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
                    L-T-P-S Calculator Pro
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Advanced Academic Performance Analytics
                </motion.p>
                <div className="header-buttons">
                    <motion.button 
                        className="history-toggle-btn"
                        onClick={() => setShowHistory(!showHistory)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaHistory /> {showHistory ? 'Hide History' : 'Show History'}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {showHistory && history.length > 0 && (
                    <motion.div 
                        className="history-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>Calculation History</h2>
                        <div className="history-navigation">
                            <button 
                                className="history-nav-btn"
                                onClick={() => setCurrentHistoryPage(p => Math.max(0, p - 1))}
                                disabled={currentHistoryPage === 0}
                            >
                                <FaChevronLeft />
                            </button>
                            <span>{currentHistoryPage + 1} / {totalPages}</span>
                            <button 
                                className="history-nav-btn"
                                onClick={() => setCurrentHistoryPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={currentHistoryPage === totalPages - 1}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        <div className="history-list" {...bind()}>
                            {history
                                .slice(currentHistoryPage * ITEMS_PER_PAGE, (currentHistoryPage + 1) * ITEMS_PER_PAGE)
                                .map((entry, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="history-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="history-header">
                                            <span className="history-subject">
                                                {entry.subject || 'Unnamed Subject'}
                                            </span>
                                            <span className="history-timestamp">{entry.timestamp}</span>
                                        </div>
                                        <div className="history-percentage">
                                            <FaStar style={{ color: '#fbbf24', marginRight: '8px' }} />
                                            {entry.percentage}%
                                        </div>
                                        <div className="history-components">
                                            {Object.entries(entry.components).map(([key, value]) => (
                                                value ? (
                                                    <motion.span 
                                                        key={key}
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}%
                                                    </motion.span>
                                                ) : null
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="input-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="input-group">
                    <label>Subject Name (Optional)</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter subject name"
                    />
                </div>
                {[
                    { label: 'Lecture Component (%)', value: lect, setter: setLect, weight: weights.lecture },
                    { label: 'Tutorial Component (%)', value: tut, setter: setTut, weight: weights.tutorial },
                    { label: 'Practical Component (%)', value: pract, setter: setPract, weight: weights.practical },
                    { label: 'Skilling Component (%)', value: skill, setter: setSkill, weight: weights.skilling }
                ].map((input, index) => (
                    <motion.div 
                        key={index} 
                        className="input-group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                    >
                        <label>{input.label}</label>
                        <input
                            type="number"
                            value={input.value}
                            onChange={handleInputChange(input.setter)}
                            placeholder="Enter percentage"
                        />
                        <motion.span 
                            className="weight-badge"
                            whileHover={{ scale: 1.1 }}
                        >
                            {input.weight}%
                        </motion.span>
                    </motion.div>
                ))}
            </motion.div>

            <div className="button-group">
                <motion.button 
                    className="calculate-btn" 
                    onClick={calculateTotal}
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

            <AnimatePresence>
                {errorMessage && (
                    <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {attendancePercentage && analysis && (
                    <motion.div 
                        className="results-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Confetti
                            {...getConfettiConfig(parseFloat(attendancePercentage))}
                        />

                        <motion.div 
                            className={`attendance-display ${
                                parseFloat(attendancePercentage) >= 85 ? 'attendance-excellent' :
                                parseFloat(attendancePercentage) >= 75 ? 'attendance-good' :
                                'attendance-warning'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <FaTrophy style={{ marginRight: '10px' }} />
                            {subject && <span className="subject-name">{subject}: </span>}
                            {attendancePercentage}%
                        </motion.div>

                        <motion.div 
                            className="analysis-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div 
                                className="analysis-card"
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3>Overall Status</h3>
                                <p>{analysis.status}</p>
                            </motion.div>
                            <motion.div 
                                className="analysis-card"
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3>Component Analysis</h3>
                                <ul>
                                    {analysis.componentAnalysis.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div 
                                className="analysis-card"
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3>Recommendations</h3>
                                <ul>
                                    {analysis.recommendations.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {item}
                                        </motion.li>
                                 ))}
                                </ul>
                            </motion.div>
                        </motion.div>

                        <motion.button 
                            className="download-btn" 
                            onClick={generatePDF}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaDownload /> Download Report
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="copyright"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                © 2024, 2200030837, Likith Kandepu
            </motion.div>
        </motion.div>
    );
};

export default Calc2;
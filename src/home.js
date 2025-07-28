import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './navbar.css';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('daily');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showRainWarning, setShowRainWarning] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [timerTime, setTimerTime] = useState(25);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerDisplay, setTimerDisplay] = useState('25:00');
    const [timerMode, setTimerMode] = useState('work'); // 'work' or 'break'

    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight * 100}`;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Automatically load weather when component mounts
        getKLUWeather();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Timer functionality
    useEffect(() => {
        let interval = null;
        if (isTimerRunning && timerTime > 0) {
            interval = setInterval(() => {
                setTimerTime(prevTime => {
                    const newTime = prevTime - 1;
                    const minutes = Math.floor(newTime / 60);
                    const seconds = newTime % 60;
                    setTimerDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                    
                    if (newTime <= 0) {
                        setIsTimerRunning(false);
                        // Switch between work and break modes
                        if (timerMode === 'work') {
                            setTimerMode('break');
                            setTimerTime(5 * 60); // 5 minute break
                            setTimerDisplay('05:00');
                        } else {
                            setTimerMode('work');
                            setTimerTime(25 * 60); // 25 minute work
                            setTimerDisplay('25:00');
                        }
                        // Play notification sound or show notification
                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification(timerMode === 'work' ? 'Break Time!' : 'Work Time!', {
                                body: timerMode === 'work' ? 'Time to take a 5-minute break!' : 'Time to focus for 25 minutes!',
                                icon: '/favicon.ico'
                            });
                        }
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timerMode]);

    const startTimer = (minutes) => {
        setTimerTime(minutes * 60);
        setTimerDisplay(`${minutes.toString().padStart(2, '0')}:00`);
        setTimerMode('work');
        setIsTimerRunning(true);
        setShowTimerModal(true);
    };

    const pauseTimer = () => {
        setIsTimerRunning(false);
    };

    const resumeTimer = () => {
        setIsTimerRunning(true);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        setTimerTime(25 * 60);
        setTimerDisplay('25:00');
        setTimerMode('work');
    };

    const stopTimer = () => {
        setIsTimerRunning(false);
        setShowTimerModal(false);
        resetTimer();
    };

    // Simulate weather data for KL University, Vijayawada
    const getKLUWeather = () => {
        const weatherConditions = [
            { condition: '☀️ Sunny', temp: 32, rainChance: 0, description: 'Clear skies' },
            { condition: '🌤️ Partly Cloudy', temp: 30, rainChance: 10, description: 'Light clouds' },
            { condition: '⛅ Cloudy', temp: 28, rainChance: 30, description: 'Overcast conditions' },
            { condition: '🌧️ Rainy', temp: 25, rainChance: 80, description: 'Heavy rainfall expected' },
            { condition: '⛈️ Thunderstorm', temp: 24, rainChance: 90, description: 'Thunder and lightning' }
        ];
        
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        setCurrentWeather(randomWeather);
        
        // Show rain warning if rain chance is high
        if (randomWeather.rainChance > 50) {
            setShowRainWarning(true);
            // Auto-hide warning after 10 seconds
            setTimeout(() => setShowRainWarning(false), 10000);
        }
        
        return randomWeather;
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const stats = {
        daily: [
            { label: 'Average Attendance', value: '85%' },
            { label: 'Classes Today', value: '6' },
            { label: 'Present Today', value: '5' }
        ],
        weekly: [
            { label: 'Week Progress', value: '90%' },
            { label: 'Total Classes', value: '25' },
            { label: 'Attendance Rate', value: '88%' }
        ],
        monthly: [
            { label: 'Monthly Target', value: '95%' },
            { label: 'Current Status', value: '87%' },
            { label: 'Classes Left', value: '45' }
        ]
    };

    const saveNote = () => {
        if (noteText.trim()) {
            const notes = JSON.parse(localStorage.getItem('quickNotes') || '[]');
            notes.push({ 
                text: noteText, 
                date: new Date().toLocaleString(),
                id: Date.now()
            });
            localStorage.setItem('quickNotes', JSON.stringify(notes));
            setNoteText('');
            setShowNotesModal(false);
            alert(`Note saved successfully! 📝\nTotal notes: ${notes.length}`);
        }
    };

    return (
        <motion.div 
            className="hero-container"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Rain Warning Banner */}
            {showRainWarning && (
                <motion.div 
                    className="rain-warning-banner"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                >
                    <span className="rain-warning-icon">🌧️</span>
                    <span className="rain-warning-text">
                        ⚠️ Rain expected at KL University! Don't forget to bring your umbrella! ☔
                    </span>
                    <button 
                        className="rain-warning-close"
                        onClick={() => setShowRainWarning(false)}
                    >
                        ×
                    </button>
                </motion.div>
            )}

            {/* Progress Bar */}
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

            <div className="hero-content">
                <motion.header className="hero-header" variants={itemVariants}>
                    <h1 className="hero-title">KLU Attendance Calculator</h1>
                    <p className="hero-subtitle">
                        Transform your academic journey with our intelligent attendance tracking system. 
                        Stay on top of your attendance requirements with real-time insights and smart predictions.
                    </p>
                    <p className="copyright">
                            © 2024 KLU Attendance Calculator | Crafted with ❤️ by Likith Kandepu (2200030837)
                        </p>
                    <div className="hero-cta">
                        <Link to="/calbyltps" className="primary-button">
                            Calculate Now
                            <span className="button-icon">→</span>
                        </Link>
                        <Link to="/total" className="secondary-button">
                            View Statistics
                            <span className="button-icon">📊</span>
                        </Link>
                    </div>
                </motion.header>

                <motion.div className="stats-container" variants={itemVariants}>
                    <div className="stats-header">
                        <h2 className="stats-title">Attendance Overview</h2>
                        <div className="stats-tabs">
                            {['daily', 'weekly', 'monthly'].map(tab => (
                                <button
                                    key={tab}
                                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="stats-grid">
                        {stats[activeTab].map((stat, index) => (
                            <motion.div 
                                key={index}
                                className="stat-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="notice-banner" variants={itemVariants}>
                    <span className="notice-icon">💡</span>
                    <div className="notice-content">
                        <h3 className="notice-title">Stay on Track!</h3>
                        <p className="notice-text">
                            Maintain a minimum of 75% attendance to ensure eligibility for examinations and not to get detained. 
                            Use our calculator to stay ahead of your requirements.
                        </p>
                    </div>
                </motion.div>

                <motion.div className="features-grid" variants={itemVariants}>
                    <div className="feature-card">
                        <span className="feature-icon">📊</span>
                        <h3 className="feature-title">Smart L-T-P-S Calculator</h3>
                        <p className="feature-description">
                            Calculate attendance across Lectures, Tutorials, Practicals, and Seminars with precision.
                        </p>
                        <Link to="/calbyltps" className="feature-button">Calculate Now</Link>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">🎯</span>
                        <h3 className="feature-title">Attendance Predictor</h3>
                        <p className="feature-description">
                            Get instant predictions on required classes to meet your target percentage.
                        </p>
                        <Link to="/total" className="feature-button">Plan Ahead</Link>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">📈</span>
                        <h3 className="feature-title">Real-time Analytics</h3>
                        <p className="feature-description">
                            Track your progress with detailed analytics and visual insights.
                        </p>
                        <Link to="/calc3" className="feature-button">View Analytics</Link>
                    </div>
                </motion.div>

                {/* New Features Section */}
                <motion.div className="new-features-section" variants={itemVariants}>
                    <h2 className="section-title">Student Tools & Resources</h2>
                    <div className="new-features-grid">
                        {/* Study Timer */}
                        <div className="new-feature-card">
                            <span className="new-feature-icon">⏰</span>
                            <h3 className="new-feature-title">Study Timer</h3>
                            <p className="new-feature-description">
                                Pomodoro technique timer for focused study sessions. 25min work, 5min break.
                            </p>
                            <button 
                                className="new-feature-button"
                                onClick={() => startTimer(25)}
                            >
                                Start Timer
                            </button>
                        </div>

                        {/* Exam Schedule */}
                        <div className="new-feature-card">
                            <span className="new-feature-icon">📅</span>
                            <h3 className="new-feature-title">Exam Tracker</h3>
                            <p className="new-feature-description">
                                Track upcoming exams and set study reminders for better preparation.
                            </p>
                            <button 
                                className="new-feature-button"
                                onClick={() => {
                                    const exam = prompt('Enter exam name:', '');
                                    const date = prompt('Enter exam date (DD/MM/YYYY):', '');
                                    if (exam && date) {
                                        alert(`Exam "${exam}" scheduled for ${date}! 📅`);
                                    }
                                }}
                            >
                                Add Exam
                            </button>
                        </div>

                        {/* Study Resources */}
                        <div className="new-feature-card">
                            <span className="new-feature-icon">📚</span>
                            <h3 className="new-feature-title">Study Resources</h3>
                            <p className="new-feature-description">
                                Quick access to academic resources, online libraries, and study materials.
                            </p>
                            <div className="resource-links">
                                <a 
                                    href="https://www.khanacademy.org" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    Khan Academy
                                </a>
                                <a 
                                    href="https://www.coursera.org" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    Coursera
                                </a>
                                <a 
                                    href="https://www.youtube.com/education" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    YouTube Edu
                                </a>
                            </div>
                        </div>

                        {/* Weather Widget */}
                        <div className="new-feature-card">
                            <span className="new-feature-icon">🌤️</span>
                            <h3 className="new-feature-title">KLU Campus Weather</h3>
                            <p className="new-feature-description">
                                Current weather conditions at KL University, Vijayawada.
                            </p>
                            <div className="weather-display">
                                {currentWeather ? (
                                    <>
                                        <div className="weather-main">
                                            <span className="weather-icon">{currentWeather.condition}</span>
                                            <span className="weather-temp">{currentWeather.temp}°C</span>
                                        </div>
                                        <div className="weather-details">
                                            <p className="weather-desc">{currentWeather.description}</p>
                                            <p className="weather-rain">Rain chance: {currentWeather.rainChance}%</p>
                                            {currentWeather.rainChance > 50 && (
                                                <p className="weather-warning">⚠️ Bring umbrella!</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="weather-loading">
                                        <span className="loading-spinner">⏳</span>
                                        <p>Loading weather...</p>
                                    </div>
                                )}
                            </div>
                            <button 
                                className="new-feature-button"
                                onClick={getKLUWeather}
                                style={{ marginTop: '1rem' }}
                            >
                                Refresh Weather
                            </button>
                        </div>

                        {/* Quick Notes */}
                        <div className="new-feature-card">
                            <span className="new-feature-icon">📝</span>
                            <h3 className="new-feature-title">Quick Notes</h3>
                            <p className="new-feature-description">
                                Jot down important reminders, to-dos, or study notes quickly.
                            </p>
                            <button 
                                className="new-feature-button"
                                onClick={() => setShowNotesModal(true)}
                            >
                                Add Note
                            </button>
                        </div>

                        {/* Academic Calendar */}
                        <div className="new-feature-card">
                            <span className="new-feature-icon">📅</span>
                            <h3 className="new-feature-title">Academic Calendar</h3>
                            <p className="new-feature-description">
                                Access KL University's official academic calendar for 2025-26. View important dates, holidays, and exam schedules.
                            </p>
                            <div className="calendar-actions">
                                <a 
                                    href="https://www.kluniversity.in/site/pdfs/Academic-calendars//College-of-Engineering/2025-26//COLLEGE%20OF%20ENGINEERING/II%20III%20IV%20Year%20B.TECH.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="new-feature-button calendar-button"
                                >
                                    View Calendar
                                </a>
                                <button 
                                    className="new-feature-button secondary-calendar-button"
                                    onClick={() => {
                                        const currentDate = new Date();
                                        const currentMonth = currentDate.getMonth() + 1;
                                        const currentYear = currentDate.getFullYear();
                                        
                                        let semester = '';
                                        if (currentMonth >= 7 && currentMonth <= 12) {
                                            semester = 'ODD Semester (July - December)';
                                        } else {
                                            semester = 'EVEN Semester (January - June)';
                                        }
                                        
                                        alert(`Current Academic Period:\n${semester}\nAcademic Year: ${currentYear}-${currentYear + 1}\n\nClick "View Calendar" to access the full academic calendar.`);
                                    }}
                                >
                                    Current Period
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Notes Modal */}
                {showNotesModal && (
                    <motion.div 
                        className="notes-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowNotesModal(false)}
                    >
                        <motion.div 
                            className="notes-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="notes-modal-header">
                                <h3>Add Quick Note</h3>
                                <button 
                                    className="notes-modal-close"
                                    onClick={() => setShowNotesModal(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="notes-modal-content">
                                <label htmlFor="noteInput" className="note-label">
                                    Write your note here:
                                </label>
                                <textarea
                                    id="noteInput"
                                    className="note-textarea"
                                    placeholder="Enter your note here..."
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    rows={8}
                                />
                            </div>
                            <div className="notes-modal-actions">
                                <button 
                                    className="notes-modal-cancel"
                                    onClick={() => setShowNotesModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="notes-modal-save"
                                    onClick={saveNote}
                                    disabled={!noteText.trim()}
                                >
                                    Save Note
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Timer Modal */}
                {showTimerModal && (
                    <motion.div 
                        className="timer-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowTimerModal(false)}
                    >
                        <motion.div 
                            className="timer-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="timer-header">
                                <h3>{timerMode === 'work' ? 'Work Time' : 'Break Time'}</h3>
                                <button 
                                    className="timer-close"
                                    onClick={stopTimer}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="timer-display">
                                <span>{timerDisplay}</span>
                            </div>
                            <div className="timer-controls">
                                <button 
                                    className="timer-control-button"
                                    onClick={pauseTimer}
                                >
                                    Pause
                                </button>
                                <button 
                                    className="timer-control-button"
                                    onClick={resumeTimer}
                                >
                                    Resume
                                </button>
                                <button 
                                    className="timer-control-button"
                                    onClick={resetTimer}
                                >
                                    Reset
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <motion.div className="quick-actions" variants={itemVariants}>
                    <h3 className="quick-actions-title">Quick Actions</h3>
                    <div className="quick-actions-grid">
                        <Link to="/calbyltps" className="quick-action-card">
                            <span className="quick-action-icon">⚡</span>
                            <span className="quick-action-text">Quick Calculate</span>
                        </Link>
                        <Link to="/total" className="quick-action-card">
                            <span className="quick-action-icon">📅</span>
                            <span className="quick-action-text">Today's Schedule</span>
                        </Link>
                        <Link to="/calc3" className="quick-action-card">
                            <span className="quick-action-icon">📋</span>
                            <span className="quick-action-text">Subject Overview</span>
                        </Link>
                        <Link to="/total" className="quick-action-card">
                            <span className="quick-action-icon">🎮</span>
                            <span className="quick-action-text">Quick Access</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Improved Grateful Recognition Section */}
                <motion.div className="simple-recognition" variants={itemVariants}>
                    <div className="recognition-container">
                        <div className="recognition-image-large">
                            <img 
                                src={process.env.PUBLIC_URL + '/rec.jpg'} 
                                alt="KL University Recognition Certificate"
                                className="recognition-img-large"
                                onLoad={() => console.log('Image loaded successfully')}
                                onError={(e) => {
                                    console.error('Image failed to load:', e.target.src);
                                    e.target.style.display = 'none';
                                    // Show a placeholder if image fails
                                    const placeholder = document.createElement('div');
                                    placeholder.innerHTML = `
                                        <div style="
                                            width: 100%; 
                                            height: 400px; 
                                            background: #f8f9fa; 
                                            border: 2px dashed #dee2e6; 
                                            border-radius: 12px; 
                                            display: flex; 
                                            align-items: center; 
                                            justify-content: center; 
                                            color: #6c757d;
                                            font-size: 1.5rem;
                                        ">
                                            🏆 Recognition Certificate
                                        </div>
                                    `;
                                    e.target.parentNode.appendChild(placeholder.firstChild);
                                }}
                            />
                        </div>
                        <div className="recognition-content-below">
                            <h3 className="recognition-title-large">🏆 Grateful Recognition</h3>
                            <p className="recognition-text-large">
                                I extend my heartfelt thanks to <strong>KL University</strong> and the <strong>CSE Department</strong> for acknowledging my initiative. Your recognition motivates me to continue building solutions that simplify student lives.
                            </p>
                            <div className="recognition-details-large">
                                <div className="detail-item-large">
                                    <span className="detail-icon-large">🎓</span>
                                    <span className="detail-text-large">Computer Science & Engineering</span>
                                </div>
                                <div className="detail-item-large">
                                    <span className="detail-icon-large">🏛️</span>
                                    <span className="detail-text-large">KL University, Vijayawada</span>
                                </div>
                                <div className="detail-item-large">
                                    <span className="detail-icon-large">💻</span>
                                    <span className="detail-text-large">Student ID: 2200030837</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.footer className="page-footer" variants={itemVariants}>
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4 className="footer-title">Quick Links</h4>
                            <div className="footer-links">
                                <Link to="/calbyltps" className="footer-link">Calculator</Link>
                                <Link to="/total" className="footer-link">Statistics</Link>
                                <Link to="/calc3" className="footer-link">Analytics</Link>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h4 className="footer-title">Support</h4>
                            <div className="footer-links">
                                <a href="#" className="footer-link">User Guide</a>
                                <a href="#" className="footer-link">FAQs</a>
                                <a href="#" className="footer-link">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="copyright">
                            © 2024 KLU Attendance Calculator | Crafted with ❤️ by Likith Kandepu (2200030837)
                        </p>
                    </div>
                </motion.footer>
            </div>
        </motion.div>
    );
}

export default Home;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './navbar.css';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('daily');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight * 100}`;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <motion.div 
            className="hero-container"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
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
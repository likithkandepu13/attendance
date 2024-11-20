import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaTrophy, FaChartLine, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';

const Results = ({ attendance, analysis, history, chartData, chartOptions }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Attendance Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Overall Attendance: ${attendance}%`, 20, 40);
    doc.text(`Status: ${analysis.status}`, 20, 50);
    doc.text(`Grade: ${analysis.grade}`, 20, 60);
    doc.text(`Recommendation: ${analysis.recommendation}`, 20, 70);
    doc.save('attendance-report.pdf');
  };

  return (
    <motion.div
      className="results-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {parseFloat(attendance) >= 85 && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="attendance-summary">
        <motion.div 
          className={`attendance-display ${parseFloat(attendance) >= 85 ? 'attendance-excellent' : 
            parseFloat(attendance) >= 75 ? 'attendance-good' : 'attendance-warning'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaTrophy className="trophy-icon" />
          <span className="percentage">{attendance}%</span>
        </motion.div>
      </div>

      <div className="analysis-grid">
        {Object.entries(analysis).map(([key, value]) => (
          key !== 'recommendation' && key !== 'isAtRisk' && (
            <motion.div
              key={key}
              className="analysis-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <p>{value}</p>
            </motion.div>
          )
        ))}
      </div>

      <motion.div 
        className="chart-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3><FaChartLine /> Attendance Trend</h3>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      <div className="actions">
        <motion.button
          className="download-btn"
          onClick={generatePDF}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload /> Download Report
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Results;
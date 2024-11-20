import React from 'react';
import { motion } from 'framer-motion';

const InputForm = ({ inputs, handleInputChange, calculateTotal }) => {
  const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="input-section">
      <div className="input-grid">
        {inputs.map((input, index) => (
          <motion.div 
            key={input.name}
            className="input-group"
            variants={inputVariants}
            whileHover="hover"
          >
            <label>{input.label}</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={input.value}
                onChange={(e) => handleInputChange(input.setter)(e)}
                placeholder={`Enter ${input.name} attendance`}
              />
              <span className="weight-badge">{input.weight}%</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="calculate-btn"
        onClick={calculateTotal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Calculate Attendance
      </motion.button>
    </div>
  );
};

export default InputForm;
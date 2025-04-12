import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const Header = () => {
  return (
    <motion.div 
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FaGraduationCap className="header-icon" />
      <h1>L-T-P-S Calculator Pro</h1>
      <p>Advanced Academic Performance Analytics</p>
    </motion.div>
  );
};

export default Header;
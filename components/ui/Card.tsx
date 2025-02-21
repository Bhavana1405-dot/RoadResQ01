import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-2xl transition-all duration-300"
    >
      <div className="mb-4 text-purple-500">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Card;

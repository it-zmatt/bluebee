import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50"
    >
      <div className="relative">
        {/* Outer spinning circle */}
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
      </div>
      
      <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
        Loading...
      </p>
    </motion.div>
  );
};

export default LoadingScreen; 
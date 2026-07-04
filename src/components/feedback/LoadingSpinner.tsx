

import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  fullScreen = true,
}) => {
  const containerClasses = fullScreen
    ? "flex flex-col items-center justify-center min-h-screen text-center"
    : "flex flex-col items-center justify-center text-center p-4";

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
      <p className="text-gray-600">{message}</p>
    </motion.div>
  );
};

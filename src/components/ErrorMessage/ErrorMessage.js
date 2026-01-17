import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <FaExclamationTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-red-500 text-2xl font-semibold mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-500 mb-6">{message || 'An unexpected error occurred'}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

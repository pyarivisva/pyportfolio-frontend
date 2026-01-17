import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border-t border-white/20 dark:border-gray-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600 dark:text-gray-400">
          &copy; {currentYear} Pyari Visva
        </p>
      </div>
    </footer>
  );
};

export default Footer;

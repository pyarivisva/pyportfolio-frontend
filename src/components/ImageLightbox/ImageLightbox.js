import React, { useEffect } from 'react';

const ImageLightbox = ({ isOpen, onClose, imageUrl, title }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div 
        className="relative max-w-6xl max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 rounded-t-lg">
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
        )}
        <img 
          src={imageUrl}
          alt={title || 'Certificate'}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="18"%3EImage not available%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
    </div>
  );
};

export default ImageLightbox;

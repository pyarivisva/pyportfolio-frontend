import React, { useEffect } from 'react';

const CertificationModal = ({ isOpen, onClose, certification }) => {
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

  if (!isOpen || !certification) return null;

  // Helper to convert Google Drive links to direct image URLs
  const getImageFromUrl = (url) => {
    if (!url) return null;
    
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/[-\w]{25,}/);
      if (fileIdMatch) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[0]}&sz=w1000`;
      }
    }
    
    return url;
  };

  const imageUrl = getImageFromUrl(certification.certificate_image);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Certificate Image Header */}
          {imageUrl && (
            <div className="relative w-full h-64 bg-gradient-to-br from-primary-600 to-purple-600">
              <img 
                src={imageUrl}
                alt={certification.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {certification.name}
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-400 mb-6">
              {certification.issuer}
            </p>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                  Issue Date
                </h3>
                <p className="text-blue-700 dark:text-blue-400">
                  {certification.issue_date ? new Date(certification.issue_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not specified'}
                </p>
              </div>

              <div className={`${certification.expire_date ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20'} rounded-xl p-4`}>
                <h3 className={`text-sm font-semibold ${certification.expire_date ? 'text-orange-900 dark:text-orange-300' : 'text-green-900 dark:text-green-300'} mb-1`}>
                  Expiration
                </h3>
                <p className={certification.expire_date ? 'text-orange-700 dark:text-orange-400' : 'text-green-700 dark:text-green-400'}>
                  {certification.expire_date 
                    ? new Date(certification.expire_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : 'No expiration'
                  }
                </p>
              </div>
            </div>

            {/* Description */}
            {certification.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  About This Certification
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {certification.description}
                </p>
              </div>
            )}

            {/* Credential ID if exists */}
            {certification.credential_id && (
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Credential ID
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                  {certification.credential_id}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              {certification.credential_url && (
                <a
                  href={certification.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-medium"
                >
                  View Credential
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationModal;

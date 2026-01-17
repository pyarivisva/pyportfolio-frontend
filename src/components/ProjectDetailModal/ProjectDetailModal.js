import React, { useEffect, useState } from 'react';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaFigma } from 'react-icons/fa';
import { resolveMediaUrl } from '../../utils/mediaUrl';
import SmartImage from '../SmartMedia/SmartImage';

const ProjectDetailModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const techArray = Array.isArray(project.technologies) 
    ? project.technologies 
    : project.technologies?.split(',').map(t => t.trim()) || [];

  // Get all images - prefer images array, fallback to single 
  const allImages = project.images && project.images.length > 0 
    ? project.images 
    : project.image 
      ? [project.image] 
      : [];

  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl animate-scale-in scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <FaTimes className="text-xl text-gray-600 dark:text-gray-300" />
        </button>

        {/* Image Carousel */}
        {allImages.length > 0 && (
          <div className="relative">
            <div
              className="relative w-full overflow-hidden rounded-t-3xl bg-gray-100/70 dark:bg-gray-900/40"
              style={{ aspectRatio: '16 / 9' }}
            >
              <SmartImage
                src={resolveMediaUrl(allImages[currentImageIndex])}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 shadow-lg hover:scale-110"
                  >
                    <FaChevronLeft className="text-gray-700 dark:text-gray-200" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 shadow-lg hover:scale-110"
                  >
                    <FaChevronRight className="text-gray-700 dark:text-gray-200" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur rounded-full text-white text-sm font-medium">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {hasMultipleImages && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-primary-600 scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={resolveMediaUrl(img)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Title & Description */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {project.long_description || project.description}
          </p>

          {/* Problem, Solution, Contributions */}
          {(project.problem || project.solution || project.contributions) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {project.problem && (
                <div className="backdrop-blur-xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">Problem</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="backdrop-blur-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">Solution</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.contributions && (
                <div className="backdrop-blur-xl bg-pink-50/50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400 mb-3">Contributions</h3>
                  <ul className="space-y-2">
                    {project.contributions.split(/[•\n]/).filter(c => c.trim()).map((contribution, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5"></span>
                        <span>{contribution.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {techArray.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techArray.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaExternalLinkAlt /> Live
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/40 dark:bg-gray-700/40 border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaGithub /> View Code
              </a>
            )}
            {project.figma_url && (
              <a
                href={project.figma_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/40 dark:bg-gray-700/40 border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaFigma /> View Design
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailModal;

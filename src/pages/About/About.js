import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getSkillIcon } from '../../utils/iconMapper';
import { sortSkillCategoryEntries } from '../../utils/skillCategoryOrder';
import { resolveMediaUrl } from '../../utils/mediaUrl';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import SmartImage from '../../components/SmartMedia/SmartImage';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const About = () => {
  const { profile, skills, experiences, education, certifications, achievements, loading } = usePortfolio();
  const [lightboxImage, setLightboxImage] = useState({ isOpen: false, url: '', title: '' });
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [expImageIndex, setExpImageIndex] = useState(0);

  const [certPage, setCertPage] = useState(0);
  const [achievementPage, setAchievementPage] = useState(0);
  const certificationsPerPage = 4;
  const achievementsPerPage = 6;

  const expCarouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateCarouselButtons = useCallback(() => {
    const el = expCarouselRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = expCarouselRef.current;
    if (!el) return;

    updateCarouselButtons();

    const handle = () => updateCarouselButtons();
    el.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      el.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [updateCarouselButtons]);

  const scrollCarousel = (direction) => {
    const el = expCarouselRef.current;
    if (!el) return;

    const amount = Math.max(280, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const PaginationControls = ({ page, totalPages, onChange, ariaLabelPrefix }) => {
    if (!totalPages || totalPages <= 1) return null;

    return (
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, page - 1))}
          disabled={page <= 0}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-200 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          aria-label={`${ariaLabelPrefix} previous page`}
        >
          <FaChevronLeft />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isActive = i === page;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onChange(i)}
                className={
                  isActive
                    ? 'w-7 h-2.5 rounded-full bg-primary-600 dark:bg-primary-500 transition-all'
                    : 'w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition-all'
                }
                aria-label={`${ariaLabelPrefix} page ${i + 1}`}
                aria-current={isActive ? 'page' : undefined}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-200 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          aria-label={`${ariaLabelPrefix} next page`}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

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

  const openLightbox = (imageUrl, title) => {
    const processedUrl = getImageFromUrl(imageUrl);
    setLightboxImage({ isOpen: true, url: processedUrl, title });
  };

  const closeLightbox = () => {
    setLightboxImage({ isOpen: false, url: '', title: '' });
  };

  const certTotalPages = Math.ceil((certifications?.length || 0) / certificationsPerPage);
  const achievementTotalPages = Math.ceil((achievements?.length || 0) / achievementsPerPage);

  useEffect(() => {
    if (certPage > 0 && certPage >= certTotalPages) setCertPage(0);
  }, [certPage, certTotalPages]);

  useEffect(() => {
    if (achievementPage > 0 && achievementPage >= achievementTotalPages) setAchievementPage(0);
  }, [achievementPage, achievementTotalPages]);

  const pagedCertifications = (certifications || []).slice(
    certPage * certificationsPerPage,
    certPage * certificationsPerPage + certificationsPerPage
  );

  const pagedAchievements = (achievements || []).slice(
    achievementPage * achievementsPerPage,
    achievementPage * achievementsPerPage + achievementsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const sortedGroupedSkills = sortSkillCategoryEntries(Object.entries(groupedSkills));

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section - Compact */}
        <section className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {profile?.bio || 'Passionate developer building amazing web experiences'}
          </p>
        </section>

        {/* Skills Section - Grid Compact */}
        <section className="space-y-8 animate-slide-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skills</h2>
            <p className="text-gray-600 dark:text-gray-400">Technologies I work with daily</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedGroupedSkills.map(([category, categorySkills], idx) => (
              <div 
                key={category}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-white/50 via-white/30 to-purple-50/40 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-purple-900/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  boxShadow: '0 8px 32px rgba(168, 85, 247, 0.12)'
                }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-blue-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/90 via-white/70 to-purple-50/60 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-purple-900/40"></div>
                </div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
                {/* Glowing orb background */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2.5 group-hover:translate-x-1 transition-transform duration-300">
                    <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 group-hover:h-8 transition-all duration-300"></span>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {categorySkills.map((skill) => {
                      const IconComponent = getSkillIcon(skill.name, skill.category);
                      return (
                        <div 
                          key={skill.id} 
                          className="group/skill relative flex items-center gap-2 px-4 py-2.5 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl border border-purple-200/40 dark:border-purple-500/30 hover:border-purple-400/60 dark:hover:border-purple-400/60 shadow-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                        >
                          {/* Gradient background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="relative z-10 text-xl text-primary-600 dark:text-primary-400 group-hover/skill:scale-110 group-hover/skill:rotate-6 transition-transform duration-300">
                            <IconComponent />
                          </div>
                          <span className="relative z-10 text-sm font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section - Tokopedia-style Carousel */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Experiences</h2>
              <p className="text-gray-600 dark:text-gray-400">My professional journey</p>
            </div>
            
            <div className="relative">
              {/* Left Arrow */}
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                className="flex items-center justify-center absolute left-2 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg text-gray-700 dark:text-gray-200 transition-all duration-200 hover:scale-105 disabled:opacity-0 disabled:pointer-events-none"
                aria-label="Scroll left"
              >
                <FaChevronLeft />
              </button>

              {/* Carousel */}
              <div
                ref={expCarouselRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4 px-1"
              >
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="snap-start flex-shrink-0 w-[85%] sm:w-[70%] md:w-[48%] lg:w-[32%]"
                  >
                    <div
                      onClick={() => setSelectedExperience(exp)}
                      className="group relative h-full overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-white/50 via-white/30 to-white/20 dark:from-gray-900/70 dark:via-gray-900/50 dark:to-gray-950/70 border border-white/30 dark:border-purple-500/10 rounded-3xl hover:shadow-2xl hover:scale-[1.02] hover:border-primary-300/50 dark:hover:border-primary-500/30 transition-all duration-500 cursor-pointer"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Image */}
                      {exp.image_url && (
                        <div
                          className="relative w-full overflow-hidden bg-gray-100/70 dark:bg-gray-800/50"
                          style={{ aspectRatio: '16 / 9' }}
                        >
                          <SmartImage
                            src={resolveMediaUrl(exp.image_url)}
                            alt={exp.position}
                            className="w-full h-full"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                            {new Date(exp.start_date).getFullYear()}
                            {exp.is_current ? ' - Now' : ` - ${new Date(exp.end_date).getFullYear()}`}
                          </span>
                          {exp.is_current && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {exp.position}
                        </h3>

                        <div className="flex items-center gap-2 mb-3 text-sm">
                          <span className="font-semibold text-primary-600 dark:text-primary-400">{exp.company}</span>
                          {exp.location && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-600 dark:text-gray-400">{exp.location}</span>
                            </>
                          )}
                        </div>

                        <ul className="space-y-2">
                          {exp.description
                            .split(/[•\n]/)
                            .filter((line) => line.trim())
                            .slice(0, 3)
                            .map((line, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-primary-500 mt-1.5"></span>
                                <span className="leading-relaxed line-clamp-1">{line.trim()}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                className="flex items-center justify-center absolute right-2 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg text-gray-700 dark:text-gray-200 transition-all duration-200 hover:scale-105 disabled:opacity-0 disabled:pointer-events-none"
                aria-label="Scroll right"
              >
                <FaChevronRight />
              </button>
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="space-y-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Education</h2>
              <p className="text-gray-600 dark:text-gray-400">Academic background</p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500"></div>
              
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div 
                    key={edu.id}
                    className="relative pl-16 md:pl-24 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline dot with pulse animation */}
                    <div className="absolute left-[18px] md:left-[26px] top-8 -translate-x-1/2">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-primary-500 animate-ping opacity-75"></div>
                      </div>
                    </div>
                    
                    {/* Card with hover effects */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-purple-50/30 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-purple-900/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:translate-x-2 border border-white/40 dark:border-purple-500/20 overflow-hidden">
                      
                      {/* Gradient shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-bl-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      
                      <div className="relative z-10">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                              {edu.degree}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                              <span className="font-semibold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer">
                                {edu.institution}
                              </span>
                              {edu.location && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-gray-600 dark:text-gray-400">{edu.location}</span>
                                </>
                              )}
                              {edu.gpa && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    GPA: {edu.gpa}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Year badge with gradient */}
                          <span className="relative px-4 py-2 bg-gradient-to-r from-primary-100 via-purple-100 to-pink-100 dark:from-primary-900/40 dark:via-purple-900/40 dark:to-pink-900/40 text-primary-700 dark:text-primary-300 rounded-xl text-sm md:text-base font-bold whitespace-nowrap shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 border border-primary-200/50 dark:border-primary-700/50">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 rounded-xl"></span>
                            <span className="relative">
                              {new Date(edu.start_date).getFullYear()}
                              {edu.is_current ? ' - Present' : ` - ${new Date(edu.end_date).getFullYear()}`}
                            </span>
                          </span>
                        </div>
                        
                        {edu.description && (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Achievements Section - Flip Card Glass Style */}
        {achievements && achievements.length > 0 && (
          <section className="space-y-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Achievements</h2>
              <p className="text-gray-600 dark:text-gray-400">Recognition & awards</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pagedAchievements.map((ach, idx) => {
                const accentColors = [
                  'from-amber-500/10 to-orange-500/10',
                  'from-rose-500/10 to-pink-500/10',
                  'from-violet-500/10 to-purple-500/10',
                  'from-cyan-500/10 to-blue-500/10',
                  'from-emerald-500/10 to-green-500/10',
                  'from-fuchsia-500/10 to-pink-500/10'
                ];
                const borderColors = [
                  'border-amber-500/20',
                  'border-rose-500/20',
                  'border-violet-500/20',
                  'border-cyan-500/20',
                  'border-emerald-500/20',
                  'border-fuchsia-500/20'
                ];
                const accentColor = accentColors[idx % accentColors.length];
                const borderColor = borderColors[idx % borderColors.length];
                
                return (
                  <div 
                    key={ach.id}
                    className="group h-80 perspective-1000"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <div className={`absolute inset-0 backface-hidden backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border ${borderColor} rounded-3xl p-6 shadow-lg`}
                           style={{ backfaceVisibility: 'hidden' }}>
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-50 rounded-3xl`}></div>
                        
                        {/* Subtle pattern */}
                        <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id={`dots-front-${ach.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="currentColor" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#dots-front-${ach.id})`} />
                          </svg>
                        </div>

                        {/* Front Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                          <div className="w-24 h-24 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 flex items-center justify-center shadow-lg mb-6">
                            <span className="text-6xl">🏆</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight px-2">
                            {ach.title}
                          </h3>
                          
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            {ach.organization}
                          </p>
                          
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 rounded-full text-xs text-gray-600 dark:text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{ach.date ? new Date(ach.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</span>
                          </div>

                          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
                            Hover to see details
                          </div>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className={`absolute inset-0 backface-hidden backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border ${borderColor} rounded-3xl p-6 shadow-lg rotate-y-180`}
                           style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-50 rounded-3xl`}></div>
                        
                        {/* Subtle pattern */}
                        <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id={`dots-back-${ach.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="currentColor" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#dots-back-${ach.id})`} />
                          </svg>
                        </div>

                        {/* Back Content */}
                        <div className="relative z-10 flex flex-col h-full p-1">
                          <div className="text-center mb-3">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                              {ach.title}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {ach.organization}
                            </p>
                            {ach.tags && ach.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 justify-center">
                                {ach.tags.map((tag, index) => (
                                  <span key={index} className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-blue-500/70 to-purple-500/70 dark:from-blue-400/60 dark:to-purple-400/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-sm">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {ach.description ? (
                            <div className="flex-grow overflow-y-auto mb-3 scrollbar-hide">
                              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                {ach.description}
                              </p>
                            </div>
                          ) : (
                            <div className="flex-grow flex items-center justify-center mb-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                No description available
                              </p>
                            </div>
                          )}

                          <div className="flex flex-col gap-2">
                            {ach.achievement_certificate && (
                              <button
                                onClick={() => openLightbox(ach.achievement_certificate, `${ach.title} - Certificate`)}
                                className="group w-full px-3 py-2 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
                              >
                                <svg className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <span>Certificate</span>
                              </button>
                            )}
                            {ach.achievement_image && (
                              <button
                                onClick={() => openLightbox(ach.achievement_image, ach.title)}
                                className="group w-full px-3 py-2 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
                              >
                                <svg className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>Image</span>
                              </button>
                            )}
                            {ach.link && (
                              <a
                                href={ach.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-full px-3 py-2 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-800/90 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
                              >
                                <span>Link</span>
                                <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <PaginationControls
              page={achievementPage}
              totalPages={achievementTotalPages}
              onChange={setAchievementPage}
              ariaLabelPrefix="Achievements"
            />
          </section>
        )}

        {/* Certifications Section - Horizontal Card Style */}
        {certifications && certifications.length > 0 && (
          <section className="space-y-8 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Certifications</h2>
              <p className="text-gray-600 dark:text-gray-400">Professional credentials</p>
            </div>
            
            <div className="space-y-4">
              {pagedCertifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="group relative overflow-hidden bg-white dark:bg-gray-800 border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Left: Main Info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {cert.name}
                          </h3>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                            {cert.issuer}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Issued: {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</span>
                            </div>
                            {cert.expire_date ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full font-medium">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Expires {new Date(cert.expire_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                No Expiration
                              </span>
                            )}
                          </div>
                          {cert.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                              {cert.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex sm:flex-col items-center gap-2 sm:pl-4">
                        {cert.certificate_image && (
                          <button
                            onClick={() => openLightbox(cert.certificate_image, cert.name)}
                            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="hidden sm:inline">View</span>
                          </button>
                        )}
                        {cert.credential_url && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <span className="hidden sm:inline">Credential</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <PaginationControls
              page={certPage}
              totalPages={certTotalPages}
              onChange={setCertPage}
              ariaLabelPrefix="Certifications"
            />
          </section>
        )}
      </div>

      {/* Image Lightbox */}
      <ImageLightbox 
        isOpen={lightboxImage.isOpen}
        onClose={closeLightbox}
        imageUrl={lightboxImage.url}
        title={lightboxImage.title}
      />

      {/* Experience Detail Modal */}
      {selectedExperience && (() => {
        const expImages = selectedExperience.images && selectedExperience.images.length > 0 
          ? selectedExperience.images 
          : selectedExperience.image_url 
            ? [selectedExperience.image_url] 
            : [];
        const hasMultipleImages = expImages.length > 1;

        const nextExpImage = () => {
          setExpImageIndex((prev) => (prev + 1) % expImages.length);
        };

        const prevExpImage = () => {
          setExpImageIndex((prev) => (prev - 1 + expImages.length) % expImages.length);
        };

        return (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setSelectedExperience(null); setExpImageIndex(0); }}
          >
            <div
              className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => { setSelectedExperience(null); setExpImageIndex(0); }}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                aria-label="Close"
                title="Close"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Carousel */}
              {expImages.length > 0 && (
                <div className="relative">
                  <div
                    className="relative w-full overflow-hidden rounded-t-3xl bg-gray-100/70 dark:bg-gray-900/40"
                    style={{ aspectRatio: '16 / 9' }}
                  >
                    <SmartImage
                      src={resolveMediaUrl(expImages[expImageIndex])}
                      alt={`${selectedExperience.position} - Image ${expImageIndex + 1}`}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Navigation Arrows */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevExpImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 shadow-lg hover:scale-110"
                        >
                          <FaChevronLeft className="text-gray-700 dark:text-gray-200" />
                        </button>
                        <button
                          onClick={nextExpImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 shadow-lg hover:scale-110"
                        >
                          <FaChevronRight className="text-gray-700 dark:text-gray-200" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur rounded-full text-white text-sm font-medium">
                        {expImageIndex + 1} / {expImages.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {hasMultipleImages && (
                    <div className="flex gap-2 p-4 overflow-x-auto">
                      {expImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setExpImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === expImageIndex
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
                <div className="flex items-center justify-between mb-4">
                  <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                    {new Date(selectedExperience.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {selectedExperience.is_current ? ' - Present' : ` - ${new Date(selectedExperience.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                  </span>
                  {selectedExperience.is_current && (
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                      Current Position
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedExperience.position}
                </h2>

                <div className="flex items-center gap-3 mb-6 text-lg">
                  <span className="font-semibold text-primary-600 dark:text-primary-400">
                    {selectedExperience.company}
                  </span>
                  {selectedExperience.location && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {selectedExperience.location}
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Responsibilities & Achievements
                  </h3>
                  <ul className="space-y-3">
                    {selectedExperience.description.split(/[•\n]/).filter(line => line.trim()).map((line, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></span>
                        <span className="leading-relaxed">{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default About;
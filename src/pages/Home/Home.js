import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { getSkillIcon } from '../../utils/iconMapper';
import { resolveMediaUrl } from '../../utils/mediaUrl';
import api from '../../services/api';

const Home = () => {
  const { profile, projects, skills, socialLinks, loading } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showCvModal, setShowCvModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchServices();
    // Debug: Check if profile has cv_file
    // console.log('Profile data:', profile);
    // console.log('CV File:', profile?.cv_file);
  }, [profile]);

  const fetchServices = async () => {
    try {
      const response = await api.getAllServices();
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setServicesLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen">
      {/* Hero Section dengan Glassmorphism */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/30 dark:bg-primary-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-400/30 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Profile Image Card */}
            <div className={`relative order-1 lg:order-2 ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
              <div className="relative group flex items-center justify-center">
                {/* Main Profile Container */}
                <div className="relative">
                  {/* Profile Image */}
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full p-1.5 backdrop-blur-2xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80 border border-white/30 dark:border-purple-500/20 shadow-2xl group-hover:scale-105 transition-all duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/50 dark:border-gray-700/50 shadow-xl">
                      <img
                        src={resolveMediaUrl(profile?.profile) || "/assets/profile-pic.png"}
                        alt={profile?.name || "Profile"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Gradient Ring Animation */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 via-purple-500/30 to-pink-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  {/* Floating Stats Badge - Repositioned */}
                  <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/70 dark:bg-gray-900/90 border border-white/30 dark:border-purple-500/20 rounded-xl sm:rounded-2xl px-5 py-2.5 sm:px-9 sm:py-4 shadow-xl">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                          {projects?.length || 0}+
                        </div>
                        <div className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">Projects</div>
                      </div>
                      <div className="w-px h-6 sm:h-9 bg-gray-300 dark:bg-gray-600"></div>
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                          {skills?.length || 0}+
                        </div>
                        <div className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">Skills</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Elements */}
                <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-16 h-16 sm:w-22 sm:h-22 bg-primary-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-18 h-18 sm:w-26 sm:h-26 bg-purple-500/20 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 -right-8 sm:-right-14 w-14 h-14 sm:w-18 sm:h-18 bg-pink-500/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
              </div>
            </div>
            
            {/* Text Content - Centered on Mobile */}
            <div className={`space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-3 lg:space-y-4">
                <p className="text-primary-600 dark:text-primary-400 font-medium text-base lg:text-lg animate-slide-up">
                  Hello, I'm
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight animate-slide-up animation-delay-200">
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    {profile?.name || 'Developer'}
                  </span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-700 dark:text-gray-300 animate-slide-up animation-delay-400">
                  {profile?.title || 'Full Stack Developer'}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-slide-up animation-delay-600">
                  {profile?.bio || 'Passionate about building scalable, high-performance web applications with modern technologies.'}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 lg:gap-4 animate-slide-up animation-delay-800 justify-center lg:justify-start">
                <Link
                  to="/projects"
                  className="px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm lg:text-base"
                >
                  View Projects
                </Link>
                <button
                  onClick={() => {
                    if (profile?.resume_url) {
                      window.open(resolveMediaUrl(profile.resume_url), '_blank');
                    } else {
                      setShowCvModal(true);
                    }
                  }}
                  className="px-6 py-3 lg:px-8 lg:py-4 backdrop-blur-xl bg-white/30 dark:bg-gray-900/60 border border-white/20 dark:border-purple-500/20 text-gray-900 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm lg:text-base flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  CV/Resume
                </button>
              </div>

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 lg:gap-3 animate-slide-up animation-delay-1000 justify-center lg:justify-start">
                  {socialLinks
                  .filter((link) => link.platform !== 'Instagram' && link.platform !== 'Email')
                  .map((link) => {
                    const SocialIcon = getSkillIcon(link.icon || link.platform, 'tools');
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 lg:p-3 backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border border-white/20 dark:border-purple-500/20 rounded-lg hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-primary-500/20 hover:to-purple-500/20 transition-all duration-300 text-xl lg:text-2xl text-primary-600 dark:text-primary-400"
                        title={link.platform}
                      >
                        <SocialIcon />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section (curated offerings) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What I <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Do</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Services I provide to bring your ideas to life
            </p>
          </div>

          {servicesLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = getSkillIcon(service.icon);
                return (
                  <div
                    key={service.id}
                    className="group backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border border-white/20 dark:border-purple-500/10 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 animate-slide-up relative overflow-hidden"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Animated gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {IconComponent && <IconComponent className="text-2xl" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                        {service.subtitle && (
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                            {service.subtitle}
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {service.description}
                        </p>
                        {service.bullets && service.bullets.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {service.bullets.map((bullet, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full group-hover:scale-105 transition-transform duration-300"
                                style={{ transitionDelay: `${i * 50}ms` }}
                              >
                                {bullet}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Add custom animations to CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

      {/* CV Unavailable Modal */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowCvModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">CV/Resume Not Available</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  The CV/Resume file is currently not available. Please check back later or contact the admin to upload the file.
                </p>
                <button
                  onClick={() => setShowCvModal(false)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

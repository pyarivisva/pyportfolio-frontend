import React from 'react';
import { dummyData } from '../../data/dummyData';
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope,
  FaBehance, 
} from 'react-icons/fa';

const getIcon = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'github': return <FaGithub className="w-6 h-6" />;
    case 'linkedin': return <FaLinkedin className="w-6 h-6" />;
    case 'instagram': return <FaInstagram className="w-6 h-6" />;
    case 'email': return <FaEnvelope className="w-6 h-6" />;
    case 'behance': return <FaBehance className="w-6 h-6" />;
    default: return <FaEnvelope className="w-6 h-6" />;
  }
};

const Contact = () => {
  const { socialLinks, profile } = dummyData;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"> 
            Feel free to reach out via email or social media!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Email */}
          {/* Email Card - Compact Premium Horizontal */}
          <div className="relative group col-span-1 md:col-span-2 overflow-hidden backdrop-blur-2xl bg-white/50 dark:bg-gray-900/60 border border-white/40 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
            
            {/* Subtle Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-500"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              
              {/* Icon - Compact Side */}
              <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <FaEnvelope className="w-7 h-7" />
              </div>
              
              {/* Content - Efficient Use of Space */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Let's Collaborate
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  Open for internships, freelance projects, or just a tech discussions.
                </p>
              </div>
              
              {/* Action Button - Right Aligned */}
              <a 
                href={`mailto:${profile.email}`}
                className="flex-shrink-0 relative inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:scale-105 hover:shadow-lg transition-all duration-300 group/btn whitespace-nowrap"
              >
                <FaEnvelope className="text-lg group-hover/btn:animate-bounce" />
                <span>Email Me</span>
              </a>
            </div>
          </div>

          {/* Social media links */}
          {socialLinks.map((link) => (
            link.platform !== 'Email' && (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border border-white/20 dark:border-purple-500/10 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {getIcon(link.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {link.platform}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connect on {link.platform}</p>
                </div>
              </a>
            )
          ))}

        </div>
      </div>
    </div>
  );
};

export default Contact;
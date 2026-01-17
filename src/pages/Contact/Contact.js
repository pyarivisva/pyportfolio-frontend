import React from 'react';
import { dummyData } from '../../data/dummyData';
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope 
} from 'react-icons/fa';

const getIcon = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'github': return <FaGithub className="w-6 h-6" />;
    case 'linkedin': return <FaLinkedin className="w-6 h-6" />;
    case 'instagram': return <FaInstagram className="w-6 h-6" />;
    case 'email': return <FaEnvelope className="w-6 h-6" />;
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
            I'm currently open for internship or freelance opportunities. 
            Feel free to reach out via email or social media!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Email */}
          <div className="col-span-1 md:col-span-2 backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border border-white/20 dark:border-purple-500/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6">
              <FaEnvelope className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Me</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              For project inquiries or just to say hi.
            </p>
            <a 
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
            >
              <FaEnvelope />
              {profile.email}
            </a>
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
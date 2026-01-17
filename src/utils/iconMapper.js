import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiPython,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiDocker,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiPhp,
  SiGo,
  SiRust,
  SiCplusplus,
  SiC,
  SiGraphql,
  SiGithub,
  SiFigma,
  SiLinkedin,
  SiInstagram,
  SiCanva,
  SiFlutter,
  SiPostman,
  SiLaravel,
} from 'react-icons/si';

import { VscVscode } from 'react-icons/vsc';

import {
  FaCode,
  FaDatabase,
  FaServer,
  FaTools,
  FaPalette,
  FaMobile,
  FaCloud,
  FaCogs,
  FaJava,
  FaEnvelope,
  FaImage,
} from 'react-icons/fa';

// Icon mapping by skill name keywords
export const iconMap = {
  // Frontend
  'react': SiReact,
  'react.js': SiReact,
  'reactjs': SiReact,
  'vue': SiVuedotjs,
  'vue.js': SiVuedotjs,
  'vuejs': SiVuedotjs,
  'angular': SiAngular,
  'next': SiNextdotjs,
  'next.js': SiNextdotjs,
  'nextjs': SiNextdotjs,
  'laravel': SiLaravel,
  
  // Backend
  'node': SiNodedotjs,
  'node.js': SiNodedotjs,
  'nodejs': SiNodedotjs,
  'express': SiExpress,
  'express.js': SiExpress,
  'expressjs': SiExpress,
  'hapi': FaServer,
  'hapi.js': FaServer,
  'hapijs': FaServer,
  
  // Database
  'postgresql': SiPostgresql,
  'postgres': SiPostgresql,
  'mongodb': SiMongodb,
  'mongo': SiMongodb,
  'mysql': SiMysql,
  'redis': SiRedis,
  
  // Languages
  'javascript': SiJavascript,
  'js': SiJavascript,
  'typescript': SiTypescript,
  'ts': SiTypescript,
  'python': SiPython,
  'java': FaJava,
  'php': SiPhp,
  'go': SiGo,
  'golang': SiGo,
  'rust': SiRust,
  'c++': SiCplusplus,
  'cpp': SiCplusplus,
  'c': SiC,
  
  // CSS/Styling
  'html': SiHtml5,
  'html5': SiHtml5,
  'html/css': SiHtml5,
  'css': SiCss3,
  'css3': SiCss3,
  'tailwind': SiTailwindcss,
  'tailwindcss': SiTailwindcss,
  'bootstrap': SiBootstrap,
  
  // Tools
  'git': SiGit,
  'github': SiGithub,
  'canva': SiCanva,
  'visual studio code': VscVscode,
  'visualstudiocode': VscVscode,
  'vs code': VscVscode,
  'vscode': VscVscode,
  'docker': SiDocker,
  'linkedin': SiLinkedin,
  'instagram': SiInstagram,
  'email': FaEnvelope,
  'postman': SiPostman,
  
  // API/GraphQL
  'graphql': SiGraphql,
  'rest': FaServer,
  'api': FaServer,
  
  // Design
  'figma': SiFigma,
  'palette': FaPalette,
  'paint': FaPalette,
  'brush': FaPalette,

  // Services
  'code': FaCode,
  'database': FaDatabase,
  'lightbulb': FaTools,
  'image': FaImage,
  'photo': FaImage,
  'gallery': FaImage,

  // Mobile
  'flutter': SiFlutter,
  
  // Cloud
  'aws': FaCloud,
  'amazon': FaCloud,
  'cloud': FaCloud,
};

// Default icons by category
export const defaultIcons = {
  'frontend': FaCode,
  'backend': FaServer,
  'database': FaDatabase,
  'programming': FaCode,
  'tools': FaTools,
  'design': FaPalette,
  'mobile': FaMobile,
  'cloud': FaCloud,
  'devops': FaCogs,
};

/**
 * Get icon component for a skill
 * @param {string} name - Skill name
 * @param {string} category - Skill category
 * @returns {React.Component} Icon component
 */
export const getSkillIcon = (name, category = '') => {
  if (!name) return FaCode;
  
  const normalizedName = name.toLowerCase().trim();
  
  // Try to find exact match
  if (iconMap[normalizedName]) {
    return iconMap[normalizedName];
  }
  
  // Try to find partial match
  const partialMatch = Object.keys(iconMap).find(key => 
    normalizedName.includes(key) || key.includes(normalizedName)
  );
  
  if (partialMatch) {
    return iconMap[partialMatch];
  }
  
  // Return default icon based on category
  const normalizedCategory = category.toLowerCase().trim();
  return defaultIcons[normalizedCategory] || FaCode;
};

// Export list of available icons for admin dropdown
export const availableIcons = Object.keys(iconMap).sort();

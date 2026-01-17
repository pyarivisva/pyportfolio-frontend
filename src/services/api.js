import { dummyData } from '../data/dummyData';

const mock = (data) => Promise.resolve({ data });

const api = {
  // Profile
  getProfile: () => mock(dummyData.profile),

  // Projects
  getAllProjects: () => mock(dummyData.projects),
  getProjectById: (id) => {
    const project = dummyData.projects.find((p) => p.id === parseInt(id));
    return mock(project);
  },

  // Skills
  getAllSkills: () => mock(dummyData.skills),

  // Experiences
  getAllExperiences: () => mock(dummyData.experiences),

  // Education
  getAllEducation: () => mock(dummyData.education),

  // Certifications
  getAllCertifications: () => mock(dummyData.certifications),

  // Achievements
  getAllAchievements: () => mock(dummyData.achievements),

  // Services
  getAllServices: () => mock(dummyData.services),

  // Social Links
  getAllSocialLinks: () => mock(dummyData.socialLinks),
  
  // Contact
  submitContactMessage: () => Promise.resolve({ success: true, message: 'Sent via email' }),
};

export default api;
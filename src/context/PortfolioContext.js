import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState({
    profile: null,
    projects: [],
    skills: [],
    experiences: [],
    socialLinks: [],
    education: [],
    certifications: [],
    achievements: [],
    services: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper
  const sortData = (items) => {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        profileRes,
        projectsRes,
        skillsRes,
        experiencesRes,
        socialRes,
        educationRes,
        certsRes,
        achievementsRes,
        servicesRes
      ] = await Promise.all([
        api.getProfile(),
        api.getAllProjects(),
        api.getAllSkills(),
        api.getAllExperiences(),
        api.getAllSocialLinks(),
        api.getAllEducation(),
        api.getAllCertifications(),
        api.getAllAchievements(),
        api.getAllServices()
      ]);

      setData({
        profile: profileRes.data,
        projects: sortData(projectsRes.data),
        skills: sortData(skillsRes.data),
        experiences: sortData(experiencesRes.data),
        socialLinks: sortData(socialRes.data),
        education: sortData(educationRes.data),
        certifications: sortData(certsRes.data),
        achievements: sortData(achievementsRes.data),
        services: sortData(servicesRes.data),
      });
      setError(null);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const value = {
    ...data,
    loading,
    error,
    refreshData: fetchAllData 
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { resolveMediaUrl } from '../../utils/mediaUrl';
import SmartImage from '../../components/SmartMedia/SmartImage';
import ProjectDetailModal from '../../components/ProjectDetailModal/ProjectDetailModal';
import { FaGithub, FaExternalLinkAlt, FaFigma } from 'react-icons/fa';

const Projects = () => {
  const { projects, loading } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Predefined categories for better organization
  const categories = ['All', 'UI/UX Design', 'Web Development', 'Visual Content Design'];

  // Filter projects
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const techColors = {
    'Python': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'React': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    'TypeScript': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    'Express JS': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'Hapi': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    'PostgreSQL': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'Redis': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  };

  const getTechColor = (tech) => {
    return techColors[tech] || 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore my latest work and contributions
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white/40 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-purple-500/20 text-gray-700 dark:text-gray-300 hover:scale-105 hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const techArray = Array.isArray(project.technologies) 
                ? project.technologies 
                : project.technologies?.split(',').map(t => t.trim()) || [];

              return (
                <div
                  key={project.id}
                  className="group relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/60 border border-white/20 dark:border-purple-500/10 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Banner Image */}
                  {project.image && (
                    <div
                      className="relative w-full overflow-hidden bg-gray-100/70 dark:bg-gray-800/50"
                      style={{ aspectRatio: '16 / 9' }}
                    >
                      <SmartImage
                        src={resolveMediaUrl(project.image)}
                        alt={project.title}
                        className="w-full h-full"
                      />
                      
                      {/* Problem overlay on hover */}
                      {project.problem && (
                        <div className="absolute inset-0 bg-primary-600/95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
                          <h4 className="text-white font-bold text-sm mb-2">Problem</h4>
                          <p className="text-white/90 text-xs line-clamp-6">
                            {project.problem}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Title with Project Type Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="flex-1 text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0 ${
                        project.project_type === 'team' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>
                        {project.project_type === 'team' ? 'Team' : 'Individual'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    {techArray.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {techArray.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getTechColor(tech)}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {techArray.length > 3 && (
                          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400 rounded-full">
                            +{techArray.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Year & Role */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span>{project.year || new Date(project.created_at).getFullYear()}</span>
                      <span>•</span>
                      <span>{project.category || 'Personal Project'}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-lg font-medium hover:scale-105 transition-all text-sm"
                        >
                          <FaExternalLinkAlt className="text-xs" /> Live
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-medium hover:scale-105 transition-all text-sm"
                        >
                          <FaGithub className="text-xs" /> Repo
                        </a>
                      )}
                      {project.figma_url && (
                        <a
                          href={project.figma_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:scale-105 transition-all text-sm"
                        >
                          <FaFigma className="text-xs" /> {project.github_url ? 'Figma' : 'Design'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;

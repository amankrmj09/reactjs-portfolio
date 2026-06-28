import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { useAppContext } from '@/context/AppContext';

const ProjectCard = ({ project, index, className }) => {
  const { setSelectedWorkId } = useAppContext();

  const isMobileProject = project.type && (project.type.toLowerCase().includes('mobile') || project.type.toLowerCase().includes('app'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card overflow-hidden group cursor-pointer flex flex-col h-auto ${className || "shrink-0 w-[85vw] sm:w-[400px] snap-start"}`}
      onClick={() => setSelectedWorkId(project.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-transparent">
        {(project.media?.thumbnailKey || project.thumbnailUrl || project.thumbnail) ? (
          <img 
            src={project.media?.thumbnailKey || project.thumbnailUrl || project.thumbnail} 
            alt={project.title} 
            className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${isMobileProject ? 'object-contain' : 'object-cover'}`}
          />
        ) : (
          <div className="w-full h-full bg-bg-base/80 flex items-center justify-center">
            <span className="text-text-secondary text-sm font-medium">No Image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-primary-depth/20 group-hover:bg-transparent transition-colors duration-500"></div>
        
        {/* Floating Type Pill */}
        {project.type && (
          <div className="absolute top-3 left-3 bg-bg-glass backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-text-primary uppercase tracking-wider shadow-lg border border-border-glass">
            {project.type}
          </div>
        )}

        {/* Floating Date Pill */}
        {project.createdAt && (
          <div className="absolute top-3 right-3 bg-bg-glass backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-text-primary shadow-lg tracking-wide border border-border-glass">
            {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
          </div>
        )}

        {/* Frosted Title Overlay (Extended to fix WebKit blur edge gap) */}
        <div className="absolute -bottom-1 -left-1 -right-1 bg-bg-base/60 backdrop-blur-md px-5 pt-3 pb-4">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-soft transition-colors line-clamp-1 leading-tight">
            {project.title}
          </h3>
        </div>
      </div>
      
      <div className="px-6 pb-6 pt-4 flex flex-col flex-grow">
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3 min-h-[1.25rem] text-justify">
          {project.shortDesc || "No description available."}
        </p>
        
        {/* First 4 tech stack */}
        <div className="flex items-center gap-2 flex-wrap mb-4 mt-auto max-h-[60px] overflow-hidden">
          {project.techStack && project.techStack.slice(0, 4).map(tech => (
            <span key={tech} className="text-xs text-text-secondary bg-bg-base/40 border border-border-glass px-2.5 py-1 rounded-md font-semibold truncate max-w-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-between pt-4 border-t border-border-glass mt-auto">
          <div className="flex items-center gap-3">
            {project.links?.repo && (
              <a href={project.links.repo} target="_blank" rel="noreferrer" className="flex items-center justify-center p-2 rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-primary-soft hover:bg-bg-base/40 text-text-secondary hover:text-text-primary transition-all" onClick={e => e.stopPropagation()} title="Source Code">
                <FiGithub size={18} />
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center justify-center p-2 rounded-full bg-transparent ring-1 ring-border-glass hover:ring-2 hover:ring-primary-soft hover:bg-bg-base/40 text-text-secondary hover:text-text-primary transition-all" onClick={e => e.stopPropagation()} title="Live Project">
                <Globe size={18} />
              </a>
            )}
          </div>
          <span className="text-primary-highlight text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Details &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getWorks } from '../api/worksApi';
import ProjectCard from './ProjectCard';
import ActionButton from '@/components/shared/ActionButton';

const WorksSection = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getWorks(0, 4);
        setWorks(Array.isArray(data) ? data : data?.content || []);
      } catch (err) {
        console.error('Failed to fetch works', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  return (
    <section id="works" className="min-h-screen  flex flex-col pt-[100px] pb-[20px] px-4 lg:px-8 w-full relative">
      {/* Top Separator */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-border-glass" 
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} 
      />
      <motion.div
        className="w-full max-w-7xl scale-95 lg:scale-100 transition-transform origin-center mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Featured Works
          </h2>
          <ActionButton 
            text="All Works" 
            href="/works" 
            icon={ArrowRight}
            className="px-5 h-[42px]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary-soft" size={32} />
          </div>
        ) : (
          <>
            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 pt-4 px-2 -mx-2 mt-4 md:mt-0">
              {works.map((work, index) => (
                <ProjectCard key={work.id} project={work} index={index} />
              ))}
            </div>
            
            {/* Mobile All Works Button */}
            <div className="flex md:hidden justify-center mt-2 pb-8">
              <ActionButton 
                text="All Works" 
                href="/works" 
                icon={ArrowRight}
                className="px-6 h-[50px]"
              />
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default WorksSection;

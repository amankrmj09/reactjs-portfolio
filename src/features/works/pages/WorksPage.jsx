import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { getWorks } from '../api/worksApi';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const WorksPage = () => {
  const navigate = useNavigate();

  const { items: works, loading, initialLoading, hasMore, sentinelRef } = useInfiniteScroll(getWorks, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-28 px-2 sm:px-4 lg:px-6 max-w-[1400px] mx-auto pb-16">
      {/* Floating Top-Left Header */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <button
          onClick={() => {
            if (window.innerWidth >= 768) {
              navigate('/#works');
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'works' }));
              }, 100);
            } else {
              navigate('/#works');
            }
          }}
          className="w-[50px] h-[50px] flex items-center justify-center glass rounded-full text-text-primary z-50 relative shrink-0 shadow-md hover:bg-bg-base/30 transition-colors"
          aria-label="Back to Works"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="z-40 px-4 py-1.5 bg-bg-base/50 backdrop-blur-md border border-border-glass rounded-full shadow-sm">
          <span className="text-sm font-bold text-text-primary capitalize tracking-wide">
            All Works
          </span>
        </div>
      </div>

      {/* Initial full-page loader */}
      {initialLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-primary-soft" size={48} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {works.map((work, index) => (
              <ProjectCard key={work.id} project={work} index={index} />
            ))}
            {works.length === 0 && (
              <p className="text-slate-400 col-span-full text-center">No works found.</p>
            )}
          </div>

          {/* Sentinel — triggers next page fetch when visible */}
          <div ref={sentinelRef} className="h-10 mt-8 flex items-center justify-center">
            {loading && hasMore && (
              <Loader2 className="animate-spin text-primary-soft" size={28} />
            )}
            {!hasMore && works.length > 0 && (
              <p className="text-slate-500 text-sm">You've seen all works ✓</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WorksPage;

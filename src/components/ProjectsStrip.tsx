import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, MouseSimple, SketchLogo } from '@phosphor-icons/react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { computeCarouselCardTransform } from '../utils/portfolioLogic';

interface ProjectsStripProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenArchive: () => void;
}

const CARD_WIDTH = 340;

export function ProjectsStrip({ onSelectProject, onOpenArchive }: ProjectsStripProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollState = useRef({
    currentScroll: 0,
    targetScroll: 0,
    isDragging: false,
    isHovered: false,
    lastX: 0,
    dragDistance: 0,
    velocity: 0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const tick = () => {
      const state = scrollState.current;
      if (!state.isDragging) {
        if (Math.abs(state.velocity) > 0.01) {
          state.targetScroll += state.velocity;
          state.velocity *= 0.92;
        } else {
          state.velocity = 0;
        }
        if (!prefersReducedMotion && !state.isHovered) {
          state.targetScroll += 0.3;
        }
      }
      const diff = state.targetScroll - state.currentScroll;
      if (Math.abs(diff) < 0.05 && state.isHovered && !state.isDragging) {
        state.currentScroll = state.targetScroll;
      } else {
        state.currentScroll += diff * 0.1;
      }

      const vw = window.innerWidth;
      PROJECTS.forEach((_, index) => {
        const el = cardRefs.current[index];
        if (!el) return;
        const t = computeCarouselCardTransform(
          index,
          state.currentScroll,
          CARD_WIDTH,
          PROJECTS.length,
          vw
        );
        el.style.transform = `translateX(${t.x}px) translateZ(${t.z}px) rotateY(${t.rotateY}deg)`;
        el.style.opacity = String(t.opacity);
        el.style.zIndex = String(t.zIndex);
        el.style.pointerEvents = t.interactive ? 'auto' : 'none';
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handlePointerMove = (e: PointerEvent) => {
      const state = scrollState.current;
      if (!state.isDragging) return;
      const delta = e.clientX - state.lastX;
      state.lastX = e.clientX;
      state.dragDistance += Math.abs(delta);
      state.targetScroll -= delta * 1.5;
      state.velocity = -delta * 0.5;
    };

    const handlePointerUp = () => {
      scrollState.current.isDragging = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  const handleCardOpen = (proj: ProjectItem) => {
    if (scrollState.current.dragDistance > 8) return;
    onSelectProject(proj);
  };

  return (
    <section id="projects" className="section-padding overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-20 text-center">
        <h2 className="text-5xl sm:text-6xl font-medium mb-6 italic text-white">
          Research &amp; Logic.
        </h2>
        <p className="font-mono-retro text-lg uppercase tracking-widest opacity-50 text-white">
          Interactive 3D Strip // Click and Drag to Explore
        </p>
      </div>

      <div
        ref={viewportRef}
        id="project-viewport"
        data-testid="project-viewport"
        className="gallery-viewport"
        onPointerEnter={() => {
          scrollState.current.isHovered = true;
          scrollState.current.velocity = 0;
          scrollState.current.targetScroll = scrollState.current.currentScroll;
        }}
        onPointerLeave={() => {
          scrollState.current.isHovered = false;
        }}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          scrollState.current.isDragging = true;
          scrollState.current.lastX = e.clientX;
          scrollState.current.dragDistance = 0;
          scrollState.current.velocity = 0;
        }}
      >
        <div className="strip-container" id="project-strip">
          {PROJECTS.map((proj, index) => (
            <div
              key={proj.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="project-card brutalist-border brutalist-shadow"
              data-index={index}
            >
              <div className="h-40 brutalist-border mb-6 flex items-center justify-center overflow-hidden bg-black relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                    backgroundSize: '15px 15px',
                    backgroundColor: proj.color,
                  }}
                />
                <SketchLogo weight="bold" size={60} className="text-white opacity-40 relative z-10" />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="font-mono-retro text-xs uppercase tracking-widest text-white mb-3">
                  {proj.tag}
                </div>
                <h4 className="text-3xl font-bold leading-tight mb-4 text-white">{proj.title}</h4>
                <p className="text-sm text-zinc-400 italic leading-relaxed mb-6">{proj.desc}</p>
                <div className="mt-auto flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleCardOpen(proj)}
                    className="font-mono-retro text-sm uppercase font-bold border-b border-white cursor-pointer text-white hover:text-[var(--lime-green)] hover:border-[var(--lime-green)] transition-colors"
                  >
                    View Research
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCardOpen(proj)}
                    aria-label={`Open ${proj.title} research`}
                    className="w-10 h-10 rounded-full brutalist-border flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-white"
                  >
                    <ArrowUpRight weight="bold" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex justify-center px-4">
        <button
          type="button"
          onClick={onOpenArchive}
          className="brutalist-border px-8 py-3 bg-black font-mono-retro text-lg uppercase font-bold flex items-center gap-4 brutalist-shadow brutalist-shadow-hover text-white cursor-pointer"
        >
          <MouseSimple size={24} />
          <span>Explore Full Archive on GitHub</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

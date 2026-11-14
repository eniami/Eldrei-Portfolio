import {
  Brain,
  ChartLineUp,
  Database,
  FilePy,
  GitBranch,
  Graph,
  Infinity as InfinityIcon,
  Lightning,
  PresentationChart,
  TerminalWindow,
} from '@phosphor-icons/react';
import { SKILLS, type SkillItem } from '../data/portfolioData';

function renderSkillIcon(iconKey: SkillItem['iconKey'], className: string) {
  switch (iconKey) {
    case 'python':
      return <FilePy size={36} className={className} />;
    case 'sql':
      return <Database size={36} className={className} />;
    case 'tensorflow':
      return <Brain size={36} className={className} />;
    case 'pytorch':
      return <Lightning size={36} className={className} />;
    case 'pandas':
      return <ChartLineUp size={36} className={className} />;
    case 'sklearn':
      return <Graph size={36} className={className} />;
    case 'r':
      return <InfinityIcon size={36} className={className} />;
    case 'git':
      return <GitBranch size={36} className={className} />;
    case 'tableau':
      return <PresentationChart size={36} className={className} />;
    case 'nlp':
      return <TerminalWindow size={36} className={className} />;
  }
}

export function SkillsGrid() {
  return (
    <section
      id="skills"
      className="section-padding bg-black border-y border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <h2 className="text-5xl sm:text-6xl font-medium mb-20 text-center italic text-white">
          Technological Arsenal.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="p-8 bg-zinc-900 brutalist-border brutalist-shadow-hover flex flex-col items-center justify-center text-center gap-4"
            >
              {renderSkillIcon(skill.iconKey, skill.colorClass)}
              <span className="font-mono-retro text-lg uppercase font-bold tracking-widest text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

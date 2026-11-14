import { TIMELINE_ENTRIES, type TimelineEntry } from '../data/portfolioData';

function getDotBgClass(variant: TimelineEntry['variant']) {
  if (variant === 'light') return 'bg-white';
  if (variant === 'muted') return 'bg-zinc-600';
  return 'bg-[var(--lime-green)]';
}

function getBadgeClasses(variant: TimelineEntry['variant']) {
  if (variant === 'light') return 'bg-white text-black';
  if (variant === 'muted') return 'bg-zinc-600 text-white';
  return 'bg-[var(--lime-green)] text-black';
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-padding bg-black relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-24">
          <h3 className="text-5xl sm:text-6xl font-medium mb-6 italic text-white">
            Timeline of Growth.
          </h3>
          <div className="font-mono-retro text-lg uppercase tracking-widest opacity-50 text-white">
            Experience &amp; Education
          </div>
        </div>

        <div className="relative py-10">
          <div className="timeline-line" />

          {TIMELINE_ENTRIES.map((entry, idx) => {
            const isLast = idx === TIMELINE_ENTRIES.length - 1;
            const isRight = entry.side === 'right';

            return (
              <div
                key={entry.id}
                className={`relative flex items-center w-full ${
                  isLast ? '' : 'mb-16 md:mb-24'
                } ${isRight ? 'justify-end' : 'justify-end md:justify-start'}`}
              >
                <div className={`timeline-dot top-8 ${getDotBgClass(entry.variant)}`} />
                <div
                  className={
                    isRight
                      ? 'w-full md:w-1/2 pl-10 md:pl-12'
                      : 'w-full md:w-1/2 pl-10 md:pl-0 md:pr-12 md:text-right flex justify-start md:justify-end'
                  }
                >
                  <div className="bg-zinc-900 p-6 sm:p-8 brutalist-border brutalist-shadow-lg max-w-lg w-full text-left">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h4 className="text-2xl font-bold leading-tight text-white">
                        {entry.title}
                      </h4>
                      <span
                        className={`${getBadgeClasses(
                          entry.variant
                        )} brutalist-border px-4 py-1 font-mono-retro text-xs rounded-full whitespace-nowrap shrink-0`}
                      >
                        {entry.period}
                      </span>
                    </div>
                    <div className="font-mono-retro uppercase text-xs tracking-widest mb-6 opacity-60 text-zinc-400">
                      {entry.organization}
                    </div>
                    <p className="text-zinc-300 leading-relaxed italic">{entry.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

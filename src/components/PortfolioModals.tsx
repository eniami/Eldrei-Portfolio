import { useEffect } from 'react';
import { ArrowUpRight, Printer, X } from '@phosphor-icons/react';
import {
  CERTIFICATES,
  PROJECTS,
  SKILLS,
  TIMELINE_ENTRIES,
  type CertificateItem,
  type ProjectItem,
} from '../data/portfolioData';

export type ActiveModal =
  | { type: 'resume' }
  | { type: 'project'; project: ProjectItem }
  | { type: 'archive' }
  | { type: 'certificate'; certificate: CertificateItem }
  | null;

interface PortfolioModalsProps {
  activeModal: ActiveModal;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function PortfolioModals({
  activeModal,
  onClose,
  onSelectProject,
}: PortfolioModalsProps) {
  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio detail dialog"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-zinc-950 brutalist-border brutalist-shadow-lg w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8 text-white relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-10 h-10 brutalist-border bg-black hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer"
        >
          <X weight="bold" size={20} />
        </button>

        {activeModal.type === 'project' && (
          <div>
            <div className="font-mono-retro text-sm uppercase tracking-widest text-[var(--lime-green)] mb-2">
              {activeModal.project.tag}
            </div>
            <h3 className="text-4xl font-bold mb-4 pr-12">{activeModal.project.title}</h3>
            <p className="text-lg text-zinc-300 italic leading-relaxed mb-6">
              {activeModal.project.desc}
            </p>

            <div className="border-t border-white/15 pt-6 mb-6">
              <div className="font-mono-retro text-xs uppercase tracking-widest opacity-60 mb-2">
                System Architecture
              </div>
              <p className="text-zinc-300 leading-relaxed">{activeModal.project.architecture}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 border-t border-white/15 pt-6 mb-8">
              <div>
                <div className="font-mono-retro text-xs uppercase tracking-widest opacity-60 mb-3">
                  Key Benchmarks
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {activeModal.project.metrics.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="font-mono-retro text-[var(--lime-green)]">-</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono-retro text-xs uppercase tracking-widest opacity-60 mb-3">
                  Core Stack
                </div>
                <div className="font-mono-retro text-lg text-white">
                  {activeModal.project.stack.join(' · ')}
                </div>
                <div className="mt-4 font-mono-retro text-xs text-zinc-400">
                  REPO // {activeModal.project.repoSlug}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 border-t border-white/15 pt-6">
              <a
                href={`https://github.com/${activeModal.project.repoSlug}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-black brutalist-border px-6 py-2 font-mono-retro text-lg uppercase font-bold brutalist-shadow-hover inline-flex items-center gap-2"
              >
                Open Repository <ArrowUpRight weight="bold" size={18} />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="brutalist-border px-5 py-2 font-mono-retro text-lg uppercase hover:bg-zinc-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {activeModal.type === 'archive' && (
          <div>
            <div className="font-mono-retro text-sm uppercase tracking-widest opacity-60 mb-2">
              GITHUB ARCHIVE // INDEX
            </div>
            <h3 className="text-4xl font-bold italic mb-6 pr-12">Research &amp; Logic Archive</h3>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-mono-retro text-xs uppercase tracking-widest text-[var(--lime-green)]">
                      {proj.tag}
                    </div>
                    <div className="text-xl font-bold">{proj.title}</div>
                    <div className="text-sm text-zinc-400 italic">{proj.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectProject(proj)}
                    className="brutalist-border px-4 py-1.5 font-mono-retro text-sm uppercase font-bold hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    Inspect
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal.type === 'certificate' && (
          <div>
            <div className="font-mono-retro text-sm uppercase tracking-widest text-[var(--lime-green)] mb-2">
              VERIFIED ACCREDITATION // {activeModal.certificate.issued}
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-2 pr-12">
              {activeModal.certificate.title}
            </h3>
            <div className="font-mono-retro text-base uppercase text-zinc-400 mb-6">
              {activeModal.certificate.issuer}
            </div>
            <div className="p-4 bg-black brutalist-border mb-6 font-mono-retro text-sm flex flex-wrap justify-between gap-2">
              <span>CREDENTIAL ID: {activeModal.certificate.credentialId}</span>
              <span className="text-[var(--lime-green)]">STATUS: VERIFIED</span>
            </div>
            <div className="mb-8">
              <div className="font-mono-retro text-xs uppercase tracking-widest opacity-60 mb-3">
                Core Curriculum Covered
              </div>
              <ul className="space-y-2 text-zinc-300">
                {activeModal.certificate.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="font-mono-retro text-[var(--lime-green)]">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-black brutalist-border px-6 py-2 font-mono-retro text-lg uppercase font-bold brutalist-shadow-hover cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

        {activeModal.type === 'resume' && (
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 pr-12 mb-6 border-b border-white/15 pb-4">
              <div>
                <h3 className="text-4xl font-bold">Eldrei Tyler Acero</h3>
                <div className="font-mono-retro text-base uppercase tracking-widest text-zinc-400 mt-1">
                  Manila, Philippines · eldreityler.acero@gmail.com
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-white text-black brutalist-border px-4 py-1.5 font-mono-retro text-sm uppercase font-bold brutalist-shadow-hover inline-flex items-center gap-2 cursor-pointer"
              >
                <Printer weight="bold" size={16} /> Print CV
              </button>
            </div>

            <div className="space-y-6 text-sm sm:text-base">
              <div>
                <div className="font-mono-retro text-xs uppercase tracking-widest text-[var(--lime-green)] mb-2">
                  Summary
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  BSIT student specializing in Data &amp; Business Analytics with a focus on Data
                  Science, Machine Learning, and AI. Passionate about building end-to-end data
                  solutions and integrating modern AI workflows into practical, working products.
                </p>
              </div>

              <div>
                <div className="font-mono-retro text-xs uppercase tracking-widest text-[var(--lime-green)] mb-2">
                  Experience &amp; Education
                </div>
                <div className="space-y-3">
                  {TIMELINE_ENTRIES.map((item) => (
                    <div key={item.id} className="border-b border-white/10 pb-2">
                      <div className="flex justify-between gap-2 font-bold">
                        <span>{item.title}</span>
                        <span className="font-mono-retro text-xs text-zinc-400">
                          {item.period}
                        </span>
                      </div>
                      <div className="font-mono-retro text-xs uppercase text-zinc-400">
                        {item.organization}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono-retro text-xs uppercase tracking-widest text-[var(--lime-green)] mb-2">
                  Technical Arsenal
                </div>
                <div className="font-mono-retro text-base text-zinc-200">
                  {SKILLS.map((s) => s.name).join(' · ')}
                </div>
              </div>

              <div>
                <div className="font-mono-retro text-xs uppercase tracking-widest text-[var(--lime-green)] mb-2">
                  Certifications
                </div>
                <ul className="space-y-1 text-zinc-300">
                  {CERTIFICATES.map((cert) => (
                    <li key={cert.id}>
                      {cert.title} — <span className="text-zinc-400">{cert.issuer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

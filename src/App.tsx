import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CertificatesSection } from './components/CertificatesSection';
import { DitherBackground } from './components/DitherBackground';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FooterSection } from './components/FooterSection';
import { HeroLanding } from './components/HeroLanding';
import { Navbar } from './components/Navbar';
import { PortfolioModals, type ActiveModal } from './components/PortfolioModals';
import { ProjectsStrip } from './components/ProjectsStrip';
import { SkillsGrid } from './components/SkillsGrid';

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <div className="min-h-screen w-full text-white relative">
      <DitherBackground />
      <Navbar onOpenResume={() => setActiveModal({ type: 'resume' })} />

      <main>
        <HeroLanding />
        <AboutSection />
        <ExperienceTimeline />
        <SkillsGrid />
        <ProjectsStrip
          onSelectProject={(project) => setActiveModal({ type: 'project', project })}
          onOpenArchive={() => setActiveModal({ type: 'archive' })}
        />
        <CertificatesSection
          onSelectCertificate={(certificate) =>
            setActiveModal({ type: 'certificate', certificate })
          }
        />
      </main>

      <FooterSection />

      <PortfolioModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSelectProject={(project) => setActiveModal({ type: 'project', project })}
      />
    </div>
  );
}

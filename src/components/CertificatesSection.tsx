import { ArrowUpRight, Certificate, Code, Medal } from '@phosphor-icons/react';
import { CERTIFICATES, type CertificateItem } from '../data/portfolioData';

interface CertificatesSectionProps {
  onSelectCertificate: (certificate: CertificateItem) => void;
}

function renderCertificateIcon(iconKey: CertificateItem['iconKey'], className: string) {
  switch (iconKey) {
    case 'certificate':
      return <Certificate weight="bold" size={30} className={className} />;
    case 'medal':
      return <Medal weight="bold" size={30} className={className} />;
    case 'code':
      return <Code weight="bold" size={30} className={className} />;
  }
}

export function CertificatesSection({ onSelectCertificate }: CertificatesSectionProps) {
  return (
    <section
      id="certificates"
      className="section-padding bg-black border-y border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl sm:text-6xl font-medium mb-4 italic text-white">
              Accreditation.
            </h2>
            <p className="text-xl text-zinc-500">
              Verified skills and professional achievements.
            </p>
          </div>
          <div className="font-mono-retro text-lg tracking-widest opacity-50 mb-2 uppercase text-white">
            Record v.2024.1
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="p-8 bg-zinc-900 brutalist-border brutalist-shadow hover:-translate-y-1 transition-all group flex flex-col"
            >
              <div
                className={`w-14 h-14 ${cert.boxBgClass} brutalist-border rounded-lg flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}
              >
                {renderCertificateIcon(cert.iconKey, cert.iconColorClass)}
              </div>
              <h4 className="text-2xl font-bold mb-3 leading-tight text-white">
                {cert.title}
              </h4>
              <p className="font-mono-retro text-sm uppercase opacity-50 mb-6 text-zinc-400">
                {cert.issuer}
              </p>
              <button
                type="button"
                onClick={() => onSelectCertificate(cert)}
                className="mt-auto inline-flex items-center gap-2 font-mono-retro text-lg uppercase font-bold text-white hover:translate-x-2 transition-all cursor-pointer self-start"
              >
                <span>View Credential</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

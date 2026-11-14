import { GithubLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';

export function FooterSection() {
  return (
    <footer id="contact" className="section-padding bg-black relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-end">
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-9xl font-medium leading-[0.85] mb-12 text-white">
              Let&apos;s build <br />
              something <span className="italic text-[var(--lime-green)]">intelligent.</span>
            </h2>
            <p className="text-2xl text-zinc-500 mb-16 max-w-xl">
              Currently available for internships, collaborative research, or deep-tech
              projects. Let&apos;s translate raw data into logic.
            </p>
            <a
              href="mailto:eldreityler.acero@gmail.com"
              className="text-xl sm:text-3xl md:text-4xl font-bold underline decoration-white decoration-4 underline-offset-[12px] hover:text-[var(--lime-green)] transition-colors text-white break-all sm:break-normal"
            >
              eldreityler.acero@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-12 lg:items-end">
            <div className="flex flex-wrap gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-16 h-16 brutalist-border brutalist-shadow rounded-2xl flex items-center justify-center bg-zinc-900 hover:bg-white hover:text-black transition-colors text-white"
              >
                <GithubLogo weight="bold" size={30} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-16 h-16 brutalist-border brutalist-shadow rounded-2xl flex items-center justify-center bg-zinc-900 hover:bg-white hover:text-black transition-colors text-white"
              >
                <LinkedinLogo weight="bold" size={30} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-16 h-16 brutalist-border brutalist-shadow rounded-2xl flex items-center justify-center bg-zinc-900 hover:bg-white hover:text-black transition-colors text-white"
              >
                <TwitterLogo weight="bold" size={30} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-16 h-16 brutalist-border brutalist-shadow rounded-2xl flex items-center justify-center bg-zinc-900 hover:bg-white hover:text-black transition-colors text-white"
              >
                <InstagramLogo weight="bold" size={30} />
              </a>
            </div>

            <div className="pt-20 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-6 font-mono-retro text-sm uppercase tracking-widest opacity-50 text-white">
              <div className="whitespace-nowrap">© 2026 Eldrei Tyler Acero • All Systems Nominal</div>
              <div className="flex gap-8 tabular-nums shrink-0">
                <span className="whitespace-nowrap">LAT: 14.60° N</span>
                <span className="whitespace-nowrap">LON: 120.98° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

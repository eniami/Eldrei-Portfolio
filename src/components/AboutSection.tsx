import TiltedCard, { TiltedCardLayer } from './TiltedCard';

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center border-t border-white/10 relative z-10"
    >
      <div className="w-full max-w-4xl flow-root">
        <div className="w-full max-w-[300px] mx-auto mb-8 lg:float-left lg:mx-0 lg:mr-10 lg:mb-6 relative">
          <TiltedCard
            imageSrc="/assets/aistudio/profile_pic_1eb98bbd.jpg"
            altText="Eldrei Tyler Q. Acero"
            captionText="Eldrei Tyler Q. Acero"
            containerWidth="300px"
            containerHeight="300px"
            imageWidth="300px"
            imageHeight="300px"
            rotateAmplitude={7}
            scaleOnHover={1.03}
            perspective={900}
            radius={0}
            smoothness={0.28}
            glare={0.45}
            glareColor="#ffffff"
            shadow={0.55}
            parallax={1}
            showTooltip={true}
            intro={true}
            faceClassName="bg-white brutalist-border brutalist-shadow-lg"
            imgClassName="object-top"
          >
            <TiltedCardLayer depth={28}>
              <div className="absolute bottom-3 left-3 bg-black/85 border border-white/25 px-2.5 py-1 font-mono-retro text-xs tracking-widest uppercase text-white">
                MANILA // PH
              </div>
            </TiltedCardLayer>
          </TiltedCard>
          <div className="hidden sm:block absolute -bottom-5 -left-5 w-28 h-28 bg-[var(--lime-green)] brutalist-border rounded-full -z-10 opacity-20 animate-pulse" />
        </div>

        <h2 className="text-5xl sm:text-6xl xl:text-7xl font-medium leading-[0.88] mb-6 text-white">
          <span className="block">Eldrei Tyler</span>
          <span className="block italic ml-6 sm:ml-10 text-[var(--hot-pink)]">Acero.</span>
        </h2>

        <p className="text-xl sm:text-2xl leading-snug text-zinc-300 mb-5">
          BSIT student specializing in{' '}
          <span className="bg-[var(--lime-green)] text-black px-2">
            Data &amp; Business Analytics
          </span>{' '}
          with a focus on{' '}
          <span className="underline decoration-white underline-offset-8">
            Data Science, Machine Learning
          </span>
          , and AI.
        </p>

        <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-5">
          Hi, I&apos;m Eldrei Tyler Q. Acero. I&apos;m passionate about building end-to-end data
          solutions and integrating modern AI workflows to turn complex problems into practical,
          working products. Based in Manila, Philippines.
        </p>

        <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-8">
          Driven by a love for continuous learning and building, you&apos;ll often find me
          competing in hackathons and attending tech events to collaborate with and learn from new
          people. Outside of code and datasets, I enjoy digital drawing—a creative habit that
          sharpens how I design clean, intuitive data visualizations.
        </p>

        <div className="clear-both pt-2 flex flex-wrap gap-8">
          <div>
            <span className="block font-mono-retro text-xs uppercase opacity-50 text-white mb-2">
              Current Pursuit
            </span>
            <span className="text-xl font-bold text-white">
              BSIT in Data &amp; Business Analytics
            </span>
          </div>
          <div>
            <span className="block font-mono-retro text-xs uppercase opacity-50 text-white mb-2">
              Primary Focus
            </span>
            <span className="text-xl font-bold text-white">End-to-End AI &amp; Data</span>
          </div>
        </div>
      </div>
    </section>
  );
}

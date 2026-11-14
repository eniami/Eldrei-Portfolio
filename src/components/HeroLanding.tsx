import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from '@phosphor-icons/react';
import {
  buildFlapRowConfigs,
  buildFlapSequence,
  type FlapTileConfig,
} from '../utils/portfolioLogic';

const FLIP_STEP_MS = 230;
const HALF_FLIP_SEC = 0.11;

function FlapTile({ config, trigger }: { config: FlapTileConfig; trigger: number }) {
  const [sequence, setSequence] = useState(() =>
    buildFlapSequence(config.targetChar, config.iterations)
  );
  const [step, setStep] = useState(0);
  const [prevChar, setPrevChar] = useState(' ');
  const [currChar, setCurrChar] = useState(' ');

  useEffect(() => {
    setSequence(buildFlapSequence(config.targetChar, config.iterations));
    setStep(0);
    setPrevChar(' ');
    setCurrChar(' ');
  }, [config.targetChar, config.iterations, trigger]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let index = 0;
    let current = ' ';

    const startTimer = setTimeout(() => {
      const advance = () => {
        if (index >= sequence.length) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        const prev = current;
        const next = sequence[index];
        current = next;
        setPrevChar(prev);
        setCurrChar(next);
        setStep((s) => s + 1);
        index += 1;
      };

      advance();
      intervalId = setInterval(advance, FLIP_STEP_MS);
    }, config.delayMs);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [config.delayMs, sequence]);

  return (
    <div className="flap-tile" aria-hidden="true">
      {/* Static upper half: reveals incoming character */}
      <div className="flap-half flap-half-top" style={{ zIndex: 1 }}>
        <div className="flap-glyph">{currChar}</div>
      </div>

      {/* Static lower half: holds outgoing character until lower flap lands */}
      <div className="flap-half flap-half-bottom" style={{ zIndex: 1 }}>
        <div className="flap-glyph">{step === 0 ? currChar : prevChar}</div>
      </div>

      {/* Animated physical top card leaf folding down 0° -> -90° */}
      {step > 0 && (
        <motion.div
          key={`top-${trigger}-${step}`}
          className="flap-half flap-half-top"
          style={{ transformOrigin: 'center bottom', zIndex: 3 }}
          initial={{ rotateX: 0, filter: 'brightness(1)' }}
          animate={{ rotateX: -90, filter: 'brightness(0.35)' }}
          transition={{ duration: HALF_FLIP_SEC, ease: [0.55, 0.05, 0.9, 0.4] }}
        >
          <div className="flap-glyph">{prevChar}</div>
        </motion.div>
      )}

      {/* Animated physical bottom card leaf swinging down +90° -> 0° */}
      {step > 0 && (
        <motion.div
          key={`bot-${trigger}-${step}`}
          className="flap-half flap-half-bottom"
          style={{ transformOrigin: 'center top', zIndex: 4 }}
          initial={{ rotateX: 90, filter: 'brightness(0.45)' }}
          animate={{ rotateX: 0, filter: 'brightness(1)' }}
          transition={{
            delay: HALF_FLIP_SEC,
            duration: HALF_FLIP_SEC,
            ease: [0.15, 0.75, 0.35, 1.0],
          }}
        >
          <div className="flap-glyph">{currChar}</div>
        </motion.div>
      )}

      {/* Mechanical side hinge pins */}
      <span className="flap-hinge-pin flap-hinge-pin-left" />
      <span className="flap-hinge-pin flap-hinge-pin-right" />
    </div>
  );
}

const ROW_1_TOKENS = ['WELCOME', ' ', 'TO', ' ', 'MY'];
const ROW_2_TOKENS = ['PORTFOLIO'];

function buildTokenConfigs(tokens: string[], initialDelayMs: number, stepMs = 65) {
  let offset = initialDelayMs;
  return tokens.map((token) => {
    const configs = buildFlapRowConfigs(token, offset, stepMs);
    offset += token.length * stepMs;
    return { token, isSpace: token === ' ', configs };
  });
}

export function HeroLanding() {
  const [flipTrigger, setFlipTrigger] = useState(0);
  const [row1Tokens] = useState(() => buildTokenConfigs(ROW_1_TOKENS, 0, 65));
  const [row2Tokens] = useState(() =>
    buildTokenConfigs(ROW_2_TOKENS, 'WELCOME TO MY'.length * 65, 65)
  );

  return (
    <section
      id="landing"
      className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative z-10"
    >
      <div className="z-10 w-full max-w-[96vw]">
        <h1 className="sr-only">Welcome to my portfolio</h1>

        <div
          className="cursor-pointer"
          onClick={() => setFlipTrigger((t) => t + 1)}
          title="Click to flip"
        >
          <div
            id="flap-row-1"
            className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-3 mb-3 sm:mb-5"
          >
            {row1Tokens.map(({ token, isSpace, configs }, tIdx) =>
              isSpace ? (
                <FlapTile key={`r1-s-${tIdx}`} config={configs[0]} trigger={flipTrigger} />
              ) : (
                <div key={`r1-w-${tIdx}-${token}`} className="flex flex-nowrap gap-1 sm:gap-2">
                  {configs.map((cfg, idx) => (
                    <FlapTile key={`r1-${tIdx}-${idx}`} config={cfg} trigger={flipTrigger} />
                  ))}
                </div>
              )
            )}
          </div>

          <div
            id="flap-row-2"
            className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-3"
          >
            {row2Tokens.map(({ token, isSpace, configs }, tIdx) =>
              isSpace ? (
                <FlapTile key={`r2-s-${tIdx}`} config={configs[0]} trigger={flipTrigger} />
              ) : (
                <div key={`r2-w-${tIdx}-${token}`} className="flex flex-nowrap gap-1 sm:gap-2">
                  {configs.map((cfg, idx) => (
                    <FlapTile key={`r2-${tIdx}-${idx}`} config={cfg} trigger={flipTrigger} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-12 font-mono-retro text-xs uppercase tracking-[0.2em] sm:tracking-[0.5em] opacity-50 border border-white/20 px-4 sm:px-6 py-2 inline-block text-white max-w-full">
          Data Science // Machine Learning // AI
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to discover about section"
        className="absolute bottom-12 flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity text-white"
      >
        <span className="font-mono-retro text-sm tracking-widest uppercase">
          Scroll to discover
        </span>
        <ArrowDown size={24} className="animate-bounce" />
      </a>
    </section>
  );
}

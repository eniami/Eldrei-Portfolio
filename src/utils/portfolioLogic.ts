export const FLAP_CHARACTERS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ.';

export interface FlapTileConfig {
  targetChar: string;
  isSpace: boolean;
  delayMs: number;
  iterations: number;
}

export function buildFlapSequence(
  targetChar: string,
  steps: number,
  rng: () => number = Math.random
): string[] {
  if (targetChar === ' ') {
    return Array.from({ length: Math.max(1, steps) }, () => ' ');
  }

  const pool = FLAP_CHARACTERS.replace(' ', '');
  const seq: string[] = [];
  let prev = ' ';

  for (let i = 0; i < Math.max(1, steps - 1); i++) {
    let pick = pool[Math.floor(rng() * pool.length)];
    if (pick === prev) {
      const nextIdx = (pool.indexOf(pick) + 1) % pool.length;
      pick = pool[nextIdx];
    }
    seq.push(pick);
    prev = pick;
  }

  seq.push(targetChar);
  return seq;
}

export function buildFlapRowConfigs(
  text: string,
  baseDelayMs = 0,
  stepMs = 65,
  rng: () => number = Math.random
): FlapTileConfig[] {
  return Array.from(text).map((char, index) => ({
    targetChar: char,
    isSpace: char === ' ',
    delayMs: baseDelayMs + index * stepMs,
    iterations: 5 + Math.floor(rng() * 4),
  }));
}

export function formatLiveClock(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export interface CarouselCardTransform {
  virtualIndex: number;
  x: number;
  z: number;
  rotateY: number;
  opacity: number;
  zIndex: number;
  interactive: boolean;
}

export function computeCarouselCardTransform(
  index: number,
  currentScroll: number,
  cardWidth: number,
  totalCards: number,
  viewportWidth: number
): CarouselCardTransform {
  const totalSetWidth = totalCards * cardWidth;
  let virtualIndex = index * cardWidth - currentScroll;

  if (totalSetWidth > 0) {
    while (virtualIndex < -totalSetWidth / 2) virtualIndex += totalSetWidth;
    while (virtualIndex > totalSetWidth / 2) virtualIndex -= totalSetWidth;
  }

  const safeWidth = Math.max(viewportWidth, 320);
  const progress = virtualIndex / (safeWidth / 1.5);
  const x = virtualIndex;
  const rawZ = 35 - Math.pow(Math.abs(progress), 2) * 500;
  const z = rawZ === 0 ? 0 : rawZ;
  const rotateY = progress * 40;
  const opacity = Math.max(0, 1 - Math.pow(Math.abs(progress), 2.5));
  const zIndex = Math.round(1000 - Math.abs(virtualIndex));
  const interactive = Math.abs(progress) < 0.25;

  return {
    virtualIndex,
    x,
    z,
    rotateY,
    opacity,
    zIndex,
    interactive,
  };
}

export interface TiltAngles {
  rotateX: number;
  rotateY: number;
}

export function computeTiltAngles(
  cursorX: number,
  cursorY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxTilt = 9
): TiltAngles {
  if (rect.width <= 0 || rect.height <= 0) {
    return { rotateX: 0, rotateY: 0 };
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const nx = Math.max(-1, Math.min(1, (cursorX - centerX) / (rect.width * 0.75)));
  const ny = Math.max(-1, Math.min(1, (cursorY - centerY) / (rect.height * 0.75)));

  const rawRotateX = -ny * maxTilt;
  const rawRotateY = nx * maxTilt;

  return {
    rotateX: rawRotateX === 0 ? 0 : rawRotateX,
    rotateY: rawRotateY === 0 ? 0 : rawRotateY,
  };
}

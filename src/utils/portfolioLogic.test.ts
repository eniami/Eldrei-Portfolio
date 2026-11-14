import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFlapRowConfigs,
  buildFlapSequence,
  computeCarouselCardTransform,
  computeTiltAngles,
  formatLiveClock,
} from './portfolioLogic';

test('formatLiveClock zero-pads single digits', () => {
  const d = new Date(2024, 0, 1, 5, 7, 9);
  assert.equal(formatLiveClock(d), '05:07:09');
});

test('formatLiveClock handles midnight and double digits', () => {
  const d = new Date(2024, 0, 1, 23, 59, 42);
  assert.equal(formatLiveClock(d), '23:59:42');
});

test('buildFlapRowConfigs creates deterministic staggered configs and marks spaces', () => {
  const configs = buildFlapRowConfigs('A B', 100, 80, () => 0.5);
  assert.equal(configs.length, 3);
  assert.deepEqual(configs[0], { targetChar: 'A', isSpace: false, delayMs: 100, iterations: 7 });
  assert.deepEqual(configs[1], { targetChar: ' ', isSpace: true, delayMs: 180, iterations: 7 });
  assert.deepEqual(configs[2], { targetChar: 'B', isSpace: false, delayMs: 260, iterations: 7 });
});

test('buildFlapSequence ends on targetChar and avoids consecutive duplicates before target', () => {
  const seq = buildFlapSequence('W', 8, () => 0.25);
  assert.equal(seq.length, 8);
  assert.equal(seq[seq.length - 1], 'W');
  for (let i = 1; i < seq.length - 1; i++) {
    assert.notEqual(seq[i], seq[i - 1]);
  }
});

test('buildFlapSequence keeps space tiles empty with no letters', () => {
  const seq = buildFlapSequence(' ', 6);
  assert.deepEqual(seq, [' ', ' ', ' ', ' ', ' ', ' ']);
});

test('computeCarouselCardTransform centers active card at z=35 and wraps infinitely', () => {
  const center = computeCarouselCardTransform(0, 0, 340, 6, 1440);
  assert.equal(center.x, 0);
  assert.equal(center.z, 35);
  assert.equal(center.rotateY, 0);
  assert.equal(center.opacity, 1);
  assert.equal(center.interactive, true);

  // Card 5 with currentScroll=0 wraps around to -340px (left of center)
  const wrappedLeft = computeCarouselCardTransform(5, 0, 340, 6, 1440);
  assert.equal(wrappedLeft.x, -340);
  assert.ok(wrappedLeft.z < center.z);
  assert.ok(wrappedLeft.rotateY < 0);
  assert.ok(wrappedLeft.zIndex < center.zIndex);
});

test('computeTiltAngles tilts toward cursor direction and clamps at maxTilt', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  assert.deepEqual(computeTiltAngles(200, 200, rect, 10), { rotateX: 0, rotateY: 0 });
  assert.deepEqual(computeTiltAngles(500, -100, rect, 10), { rotateX: 10, rotateY: 10 });
  assert.deepEqual(computeTiltAngles(-100, 500, rect, 10), { rotateX: -10, rotateY: -10 });
});

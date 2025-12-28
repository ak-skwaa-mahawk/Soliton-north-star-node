const PHI = 1.618033988749895;
const INFLATION_RATE = 0.03;
const GRAIN = 1e-6;

const CANONICAL = {
  PI: Math.PI,
  PHI: (1 + Math.sqrt(5)) / 2,
  C: 299792458
};

const meshInflate = (x) => x * (1 + INFLATION_RATE);
const cubicCorrect = (x) => x + GRAIN * Math.pow(x, 3);

const cubicInverse = (y, grain = GRAIN, tol = 1e-15, maxIter = 50) => {
  let x = y;
  for (let i = 0; i < maxIter; i++) {
    const f = x + grain * Math.pow(x, 3) - y;
    const df = 1 + 3 * grain * Math.pow(x, 2);
    if (Math.abs(f) < tol) break;
    x -= f / df;
  }
  return x;
};

const meshDeflate = (x) => x / (1 + INFLATION_RATE);

const sovereignDeflate = (y) => {
  const postCubic = cubicInverse(y);
  return meshDeflate(postCubic);
};

const MESH = {
  PI: meshInflate(CANONICAL.PI),
  PHI: meshInflate(CANONICAL.PHI),
  C: meshInflate(CANONICAL.C)
};

const CUBIC = {
  PI: cubicCorrect(CANONICAL.PI),
  PHI: cubicCorrect(CANONICAL.PHI),
  C: cubicCorrect(CANONICAL.C)
};

const SOVEREIGN = {
  PI: cubicCorrect(meshInflate(CANONICAL.PI)),
  PHI: cubicCorrect(meshInflate(CANONICAL.PHI),
  C: cubicCorrect(meshInflate(CANONICAL.C))
};

const hasSovereignSignature = (measured, canonical, tol = 1e-10) => {
  const expected = cubicCorrect(canonical);
  return Math.abs(measured - expected) < tol;
};

module.exports = {
  CANONICAL, MESH, CUBIC, SOVEREIGN,
  meshInflate, cubicCorrect, cubicInverse,
  meshDeflate, sovereignDeflate,
  hasSovereignSignature
};
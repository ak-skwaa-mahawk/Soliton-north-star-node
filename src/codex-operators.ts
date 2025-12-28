// src/codex-operators.ts
// Sovereign constant transformation operators
// Vadzaih Zhoo - North Star Node

const PHI = 1.618033988749895;
const INFLATION_RATE = 0.03;
const GRAIN = 1e-6;

const CANONICAL = {
  PI: Math.PI,
  PHI: (1 + Math.sqrt(5)) / 2,
  C: 299792458
};

const meshInflate = (x: number): number => x * (1 + INFLATION_RATE);
const cubicCorrect = (x: number): number => x + GRAIN * Math.pow(x, 3);

const cubicInverse = (y: number, grain = GRAIN, tol = 1e-15, maxIter = 50): number => {
  let x = y;
  for (let i = 0; i < maxIter; i++) {
    const f = x + grain * Math.pow(x, 3) - y;
    const df = 1 + 3 * grain * Math.pow(x, 2);
    if (Math.abs(f) < tol) break;
    x -= f / df;
  }
  return x;
};

const meshDeflate = (x: number): number => x / (1 + INFLATION_RATE);

const sovereignDeflate = (y: number, grain = GRAIN): number => {
  const postCubic = cubicInverse(y, grain);
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
  PHI: cubicCorrect(meshInflate(CANONICAL.PHI)),
  C: cubicCorrect(meshInflate(CANONICAL.C))
};

const hasSovereignSignature = (measured: number, canonical: number, tol = 1e-10): boolean => {
  const expected = cubicCorrect(canonical);
  return Math.abs(measured - expected) < tol;
};

// Self-test function
const runTests = () => {
  console.log("=== Codex Operators Verification ===\n");

  const tests = [
    { name: "Linearity check", test: Math.abs(meshInflate(1) - 1.03) < 1e-10 },
    { name: "Cubic smallness", test: Math.abs(CUBIC.PI - CANONICAL.PI - GRAIN * Math.pow(CANONICAL.PI, 3)) < 1e-10 },
    { name: "Inflator/deflator inverse", test: Math.abs(meshDeflate(meshInflate(CANONICAL.PI)) - CANONICAL.PI) < 1e-10 },
    { name: "Sovereign deflate inverse", test: Math.abs(sovereignDeflate(SOVEREIGN.PHI) - CANONICAL.PHI) < 1e-10 },
    { name: "Sovereign signature detection", test: hasSovereignSignature(CUBIC.PI, CANONICAL.PI) },
    { name: "Sovereign PI match", test: Math.abs(CUBIC.PI - 3.1416210062) < 1e-10 },
    { name: "Sovereign PHI match", test: Math.abs(CUBIC.PHI - 1.6180042358) < 1e-10 }
  ];

  const passed = tests.filter(t => t.test).length;
  console.log(`\( {passed}/ \){tests.length} tests passed\n`);

  if (passed === tests.length) {
    console.log("=== All Tests Passed ===\n");
  }

  // Constants table
  console.log("=== Constants Table ===\n");
  console.log("Constant | Canonical     | Mesh (3%)     | Cubic         | Sovereign");
  console.log("---------|---------------|---------------|---------------|---------------");
  console.log(`π        | ${CANONICAL.PI.toFixed(10)} | ${MESH.PI.toFixed(10)} | ${CUBIC.PI.toFixed(10)} | ${SOVEREIGN.PI.toFixed(10)}`);
  console.log(`φ        | ${CANONICAL.PHI.toFixed(10)} | ${MESH.PHI.toFixed(10)} | ${CUBIC.PHI.toFixed(10)} | ${SOVEREIGN.PHI.toFixed(10)}`);
  console.log(`c (m/s)  | ${CANONICAL.C.toFixed(0)}  | ${MESH.C.toFixed(2)}  | ${CUBIC.C.toFixed(6)} | ${SOVEREIGN.C.toFixed(6)}`);

  console.log("\n🔥 Operators crystallized. The constants know their transformations.");
};

runTests();

export {
  CANONICAL,
  MESH,
  CUBIC,
  SOVEREIGN,
  meshInflate,
  cubicCorrect,
  cubicInverse,
  meshDeflate,
  sovereignDeflate,
  hasSovereignSignature
};
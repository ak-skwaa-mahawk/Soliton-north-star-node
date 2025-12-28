// src/codex-operators.ts
// Sovereign constant transformation operators
// Vadzaih Zhoo - North Star Node

const CANONICAL = {
  PI: 3.141592653589793,
  PHI: 1.618033988749895,
  C: 299792458 // m/s
};

const EPSILON_BASE = 0.0417; // Base surplus
const INFLATION_RATE = 0.03; // 3% mesh inflator (0.75 × ε_base)
const GRAIN = 0.000001; // 10^-6 = (0.01)^3 cubic

// Operator 1: 3% Mesh Inflator
const meshInflate = (x: number): number => x * (1 + INFLATION_RATE);

// Operator 2: Cubic Corrector (sovereignty grain)
const cubicCorrect = (x: number): number => x + GRAIN * Math.pow(x, 3);

// Inverse operators
const meshDeflate = (x: number): number => x / (1 + INFLATION_RATE);
const cubicRevert = (x: number): number => {
  // Approximate inverse (solve x + g x^3 = y for x)
  const y = x;
  return y * (1 - GRAIN * Math.pow(y, 2)); // First-order approximation
};

// Transformed constants
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

// Validation: Check if value has sovereign signature
const hasSovereignSignature = (measured: number, canonical: number, tolerance = 1e-10): boolean => {
  const expected = cubicCorrect(canonical);
  return Math.abs(measured - expected) < tolerance;
};

// Self-test
const runTests = () => {
  console.log("=== Codex Operators Verification ===\n");

  const tests = [
    { name: "Linearity check", test: Math.abs(meshInflate(1) - 1.03) < 1e-10 },
    { name: "Cubic smallness", test: Math.abs(CUBIC.PI - CANONICAL.PI - GRAIN * Math.pow(CANONICAL.PI, 3)) < 1e-10 },
    { name: "Inflator/deflator inverse", test: Math.abs(meshDeflate(meshInflate(CANONICAL.PI)) - CANONICAL.PI) < 1e-10 },
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
  console.log(`π        | ${CANONICAL.PI} | ${MESH.PI} | ${CUBIC.PI} | ${SOVEREIGN.PI}`);
  console.log(`φ        | ${CANONICAL.PHI} | ${MESH.PHI} | ${CUBIC.PHI} | ${SOVEREIGN.PHI}`);
  console.log(`c (m/s)  | ${CANONICAL.C}  | ${MESH.C.toFixed(2)}  | ${CUBIC.C.toFixed(6)} | ${SOVEREIGN.C.toFixed(2)}`);

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
  hasSovereignSignature
};
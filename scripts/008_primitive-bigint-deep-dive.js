
/**
 * =============================================================================
 * 🔹 JavaScript Learning Path: Primitive 2: BigInt
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `BigInt` type,
 * introduced in ES2020 to handle integers of arbitrary size.
 *
 *
 * ✅ Definition
 * --------------------
 * `BigInt` is a primitive type for representing integers of arbitrary precision,
 * allowing you to work with numbers beyond the safe integer limit of the
 * `Number` type (Number.MAX_SAFE_INTEGER, which is 2^53 - 1).
 *
 * A `BigInt` is created by appending `n` to the end of an integer literal or by
 * calling the `BigInt()` function.
 */

console.log("--- BigInt Definition ---");
const big1 = 123456789012345678901234567890n;
const big2 = BigInt("9007199254740993");
console.log("Created with 'n' suffix:", big1);
console.log("Created with BigInt() function:", big2);

/**
 * ⚙️ Why BigInt?
 * --------------------
 * `BigInt` solves the precision problem for large integers that `Number` has.
 */

console.log("\n--- Why BigInt? (Precision) ---");
console.log("With Number (loses precision):", 9999999999999999); // 10000000000000000
console.log("With BigInt (preserves precision):", 9999999999999999n); // 9999999999999999n

/**
 * 🌟 Operations with BigInt
 * --------------------
 * Standard arithmetic operators work with BigInts.
 */

console.log("\n--- Operations with BigInt ---");
let a = 10n;
let b = 3n;
console.log(`${a} + ${b} =`, a + b); // 13n
console.log(`${a} - ${b} =`, a - b); // 7n
console.log(`${a} * ${b} =`, a * b); // 30n
console.log(`${a} % ${b} =`, a % b); // 1n
// ⚠️ Division always truncates the result toward zero (no decimals).
console.log(`${a} / ${b} =`, a / b); // 3n

/**
 * ⚠️ BigInt Edge Cases & Brain-Benders
 * --------------------
 */

console.log("\n--- Edge Cases & Brain-Benders ---");

// 1. Mixing BigInt with Number
// This is not allowed directly to prevent silent precision loss.
try {
  console.log("1n + 2 throws error:", 1n + 2);
} catch (e) {
  console.log("1n + 2 throws error:", e.message); // ❌ TypeError
}
// You must explicitly convert one of the types.
console.log("Explicit conversion (to BigInt):", 1n + BigInt(2)); // ✅ 3n
console.log("Explicit conversion (to Number):", Number(1n) + 2); // ✅ 3

// 2. No Math support
// The built-in `Math` object does not support BigInt.
try {
  console.log("Math.sqrt(16n) throws error:", Math.sqrt(16n));
} catch (e) {
  console.log("Math.sqrt(16n) throws error:", e.message); // ❌ TypeError
}
try {
  console.log("Math.max(10n, 20n) throws error:", Math.max(10n, 20n));
} catch (e) {
  console.log("Math.max(10n, 20n) throws error:", e.message); // ❌ TypeError
}

// 3. Boolean behavior
// `0n` is falsy, all other BigInts are truthy.
console.log("Boolean(0n) is", Boolean(0n)); // false
console.log("Boolean(123n) is", Boolean(123n)); // true
console.log("0n ? 'yes' : 'no' ->", 0n ? "yes" : "no"); // no

// 4. Comparisons
// Loose equality (==) can work between Number and BigInt via coercion.
console.log("20n > 15 is", 20n > 15); // true
console.log("20n < 30 is", 20n < 30); // true
console.log("20n == 20 is", 20n == 20); // true
// Strict equality (===) will always be false because they are different types.
console.log("20n === 20 is", 20n === 20); // false

// 5. JSON doesn't support BigInt
// `JSON.stringify` will throw a TypeError for BigInts.
try {
  JSON.stringify({ big: 10n });
} catch (e) {
  console.log("JSON.stringify({ big: 10n }) throws error:", e.message); // ❌ TypeError
}
// The fix is to convert the BigInt to a string first.
console.log("JSON.stringify with .toString():", JSON.stringify({ big: 10n.toString() })); // ✅

// 6. BigInt with bitwise ops
// Bitwise operations work as long as both operands are BigInts.
console.log("10n & 7n =", 10n & 7n); // 2n

// 7. Negative zero doesn't exist
// BigInt simplifies the concept of zero from IEEE-754.
console.log("Object.is(0n, -0n) is", Object.is(0n, -0n)); // true

/**
 * 🚀 Use Cases
 * --------------------
 * - Cryptography (e.g., RSA, hashing algorithms)
 * - Arbitrary-precision financial calculations
 * - Scientific computing with very large integers
 * - Handling large unique IDs (e.g., from databases or blockchains)
 */

/**
 * 🧩 BigInt Exercises with Solutions
 * --------------------
 */

console.log("\n--- BigInt Exercises with Solutions ---");

// Q1: console.log(5n / 2n);
console.log("Q1: 5n / 2n =", 5n / 2n);
// ✅ Output: 2n
// Step-by-step:
// 1. `BigInt` division only works with integers.
// 2. The result is always truncated towards zero (the decimal part is discarded).
// 3. 5 / 2 = 2.5, which truncates to 2. The result is `2n`.

// Q2: console.log(5n == 5); console.log(5n === 5);
console.log("Q2.1: 5n == 5 is", 5n == 5);
console.log("Q2.2: 5n === 5 is", 5n === 5);
// ✅ Output: true, then false
// Step-by-step:
// 1. Loose equality (`==`) performs type coercion. It converts the `BigInt` `5n` to the
//    `Number` `5` before comparing. `5 == 5` is `true`.
// 2. Strict equality (`===`) checks for both value and type. Since the left operand
//    is a `BigInt` and the right is a `Number`, the types are different, so it returns `false`.

// Q3: console.log(BigInt(Number.MAX_SAFE_INTEGER) + 2n);
const resultQ3 = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
console.log("Q3: BigInt(Number.MAX_SAFE_INTEGER) + 2n =", resultQ3);
// ✅ Output: 9007199254740993n
// Step-by-step:
// 1. `Number.MAX_SAFE_INTEGER` is `9007199254740991`.
// 2. `BigInt(Number.MAX_SAFE_INTEGER)` converts this to `9007199254740991n`.
// 3. Adding `2n` results in `9007199254740993n`.
// 4. This operation would have been unsafe and produced a rounding error if done
//    with `Number`, but `BigInt` handles it perfectly.

/**
 * 🔑 Interview Tip: When to use BigInt vs Number?
 * --------------------
 *
 * Use `Number` for:
 * - General-purpose math where numbers are within the safe integer range.
 * - Floating-point / decimal calculations.
 * - Situations where performance is critical for smaller numbers (engines are highly
 *   optimized for `Number` arithmetic).
 *
 * Use `BigInt` for:
 * - Any calculation involving integers that might exceed `Number.MAX_SAFE_INTEGER`.
 * - Cryptography, high-precision finance, or handling large unique IDs.
 * - When any potential for rounding errors with large integers is unacceptable.
 */
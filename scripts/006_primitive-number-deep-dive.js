/**
 * @fileoverview A deep dive into the 'Number' primitive type in JavaScript.
 * This file covers its internal representation, special values, pitfalls,
 * and interview questions with runnable examples.
 */

/**
 * =============================================================================
 * 🔹 JavaScript Learning Path: Primitive 1: Number
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `Number` type,
 * which is one of JavaScript's fundamental primitive data types.
 *
 *
 * ✅ Definition
 * --------------------
 * In JavaScript, there is only one number type. All numbers, whether they are
 * integers (like 42) or floating-point numbers (like 3.14), are represented
 * as 64-bit floating-point numbers according to the IEEE-754 standard.
 * This means that even special values like `NaN`, `Infinity`, and `-0` are of
 * the type `number`.
 *
 *
 * ⚙️ Internal Representation
 * --------------------
 * A number is stored in 64 bits (8 bytes) of memory, broken down as follows:
 * - 1 bit for the sign (+ or -)
 * - 11 bits for the exponent (the position of the decimal point)
 * - 52 bits for the fraction/mantissa (the significant digits)
 *
 * This structure gives us about 53 bits of precision for integers, which means
 * integers are only "safe" (guaranteed to be represented accurately) up to
 * `2^53 - 1`, or `9007199254740991`.
 *
 *
 * 🌟 Special Values
 * --------------------
 * JavaScript numbers include several special values.
 */

console.log("--- Special Values ---");
// `NaN` stands for "Not-a-Number", but its type is still 'number'.
console.log(`typeof NaN:`, typeof NaN); // "number"

// `Infinity` results from operations like dividing by zero or number overflows.
console.log(`1 / 0:`, 1 / 0); // Infinity
console.log(`1 / -0:`, 1 / -0); // -Infinity

/**
 * 🔄 Type Conversion to Number
 * --------------------
 * The `Number()` function can be used to explicitly convert other types to numbers.
 */

console.log("\n--- Type Conversion to Number ---");
console.log(`Number("42"):`, Number("42")); // 42
console.log(`Number(""):`, Number("")); // 0
console.log(`Number("foo"):`, Number("foo")); // NaN
console.log(`Number(true):`, Number(true)); // 1
console.log(`Number(false):`, Number(false)); // 0
console.log(`Number(null):`, Number(null)); // 0
console.log(`Number(undefined):`, Number(undefined)); // NaN

/**
 * ⚠️ Pitfalls & Interview Traps
 * --------------------
 * The nature of floating-point math leads to some common gotchas.
 */

console.log("\n--- Pitfalls & Interview Traps ---");

// 1. Floating-point precision issues
console.log("0.1 + 0.2 =", 0.1 + 0.2); // 0.30000000000000004
console.log("0.1 + 0.2 === 0.3 is", 0.1 + 0.2 === 0.3); // false

// 2. NaN's weird behavior
// NaN is not equal to anything, including itself.
console.log("NaN === NaN is", NaN === NaN); // false
// Use the `Number.isNaN()` method to correctly check for NaN.
console.log("Number.isNaN(NaN) is", Number.isNaN(NaN)); // true

// 3. The existence of -0 (Negative Zero)
// Negative zero is equal to positive zero with the `===` operator.
console.log("0 === -0 is", 0 === -0); // true
// To distinguish them, use `Object.is()`.
console.log("Object.is(0, -0) is", Object.is(0, -0)); // false

// 4. Maximum Safe Integer
// Integers beyond `MAX_SAFE_INTEGER` may lose precision.
console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log("A large number (9999999999999999) becomes:", 9999999999999999); // 10000000000000000 (rounded!)

/**
 * 🚀 Optimization Tips
 * --------------------
 * - Prefer integers for exact math, as long as they are within the safe integer range.
 * - For financial applications or when high precision is critical, avoid floating-point
 *   math. Use libraries like `Decimal.js` or the native `BigInt` type.
 * - In performance-critical code (hot loops), avoid mixing types (e.g., `"5" + 1`).
 *   This can cause the JavaScript engine's optimizer to de-optimize the code.
 *
 *
 * 🧩 Mini-Exercises
 * --------------------
 * Try to predict the output of these expressions.
 */

console.log("\n--- Mini-Exercises ---");

// Exercise 1:
console.log("1. 0.1 + 0.2 == 0.3 is", 0.1 + 0.2 == 0.3);

// Exercise 2:
console.log("2. Math.sqrt(-1) is", Math.sqrt(-1));

// Exercise 3:
console.log("3. Number(null) is", Number(null));
console.log("   Number(undefined) is", Number(undefined));

// Exercise 4:
console.log(
  "4. 9999999999999999 === 10000000000000000 is",
  9999999999999999 === 10000000000000000
);

/**
 * 🧩 Mini-Exercises with Solutions
 * --------------------
 */
console.log("\n--- Mini-Exercises with Solutions ---");

// Q1: console.log(0.1 + 0.2 == 0.3);
// ✅ Output: false
// Step-by-step:
// 1. JavaScript uses binary floating-point math (IEEE-754).
// 2. Numbers like 0.1 and 0.2 cannot be represented perfectly in binary.
// 3. Their binary approximations add up to a number that is extremely close to 0.3,
//    but is actually `0.30000000000000004`.
// 4. The comparison `0.30000000000000004 == 0.3` is therefore false.

// Q2: console.log(Math.sqrt(-1));
// ✅ Output: NaN
// Step-by-step:
// 1. The `Math.sqrt()` function calculates the square root of a number.
// 2. In real numbers, the square root is only defined for non-negative numbers (>= 0).
// 3. Passing a negative number results in an invalid mathematical operation.
// 4. JavaScript represents such results with the special numeric value `NaN`.

// Q3: console.log(Number(null)); console.log(Number(undefined));
// ✅ Output: 0, then NaN
// Step-by-step:
// 1. The `Number()` conversion follows specific rules defined in the ECMAScript standard.
// 2. The rule for `null` is to convert it to `0`.
// 3. The rule for `undefined` is to convert it to `NaN`.

// Q4: console.log(9999999999999999 === 10000000000000000);
// ✅ Output: true
// Step-by-step:
// 1. Both numbers are larger than `Number.MAX_SAFE_INTEGER`.
// 2. When a number exceeds this limit, JavaScript can no longer guarantee its precision.
// 3. The engine rounds the number to the nearest representable value. In this case,
//    `9999999999999999` is rounded up to `10000000000000000`.
// 4. The comparison `10000000000000000 === 10000000000000000` is therefore true.

/**
 * 🧠 Interview Brain-Benders
 * --------------------
 *
 * 1. Q: Why is `typeof NaN === "number"`?
 *    A: Because `NaN` is a special value within the IEEE-754 numeric type specification. It's not a separate type; it's a specific kind of number used to represent the result of an invalid mathematical operation.
 *
 * 2. Q: How can you check for `NaN` safely?
 *    A: Use `Number.isNaN(value)`. It is the most reliable method because it does not coerce its argument. The global `isNaN(value)` function will first try to convert the value to a number, which can lead to unexpected results (e.g., `isNaN("foo")` is true).
 *
 * 3. Q: How can you detect `-0` vs `+0`?
 *    A: Use `Object.is(value, -0)`. For example, `Object.is(-0, 0)` returns `false`. Another clever trick is to use division: `1 / -0` results in `-Infinity`, while `1 / 0` results in `Infinity`.
 */

/**
 * @fileoverview An advanced deep dive into the 'Number' primitive in JavaScript.
 * This file covers engine optimizations, number ranges, special constants,
 * and other in-depth details.
 */

/**
 * =============================================================================
 * 🔹 More Depth on JavaScript Number
 * =============================================================================
 *
 * This document refines our understanding of the `Number` type by exploring
 * engine-level optimizations, memory representation, and special constants.
 *
 *
 * 1. Whole Numbers vs. Decimals (Engine Optimization)
 * ---------------------------------------------------
 * Even though JavaScript has only one `number` type (IEEE-754 64-bit float),
 * JavaScript engines like V8 (in Chrome/Node.js) are highly optimized.
 *
 * ✅ Engine Optimization: If a number value is a whole number within a specific
 * range, the engine can use a more efficient internal representation called
 * a "Small Integer" (SMI). This saves memory and makes arithmetic operations
 * much faster. When a number goes outside this range or becomes a decimal,
 * the engine transparently converts it to a full floating-point representation.
 *
 * This is an internal optimization; from the developer's perspective, it's all
 * just one `number` type.
 */

console.log("--- Whole Numbers vs. Decimals ---");
let price = 200.00;
console.log(`let price = 200.00; console.log(price) ->`, price); // 200

/**
 * 2. Range of Representable Numbers
 * ---------------------------------
 * JavaScript provides constants to see the limits of the number type.
 *
 * - `Number.MAX_VALUE`: The largest positive number that can be represented.
 * - `Number.MIN_VALUE`: The smallest positive number greater than 0. This is NOT
 *   the most negative number. The most negative number is `-Number.MAX_VALUE`.
 */

console.log("\n--- Range of Numbers ---");
console.log("Number.MAX_VALUE:", Number.MAX_VALUE);
console.log("Number.MIN_VALUE:", Number.MIN_VALUE);

/**
 * 3. Infinity & -Infinity
 * -----------------------
 * These special values represent concepts of infinity. They typically occur
 * during arithmetic overflow or division by zero.
 */

console.log("\n--- Infinity & -Infinity ---");
// Arithmetic overflow
console.log("Number.MAX_VALUE + Number.MAX_VALUE =", Number.MAX_VALUE + Number.MAX_VALUE);
console.log("-Number.MAX_VALUE - Number.MAX_VALUE =", -Number.MAX_VALUE - Number.MAX_VALUE);

// Division by zero
console.log("1 / 0 =", 1 / 0);
console.log("-1 / 0 =", -1 / 0);

/**
 * 4. Safe Integer Range
 * ---------------------
 * This is the range where integers are guaranteed to be represented precisely
 * without any rounding errors.
 */

console.log("\n--- Safe Integer Range ---");
console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
console.log("Number.MIN_SAFE_INTEGER:", Number.MIN_SAFE_INTEGER);

/**
 * 5. The Zero Quirk (-0)
 * ----------------------
 * Negative zero (`-0`) exists due to the sign bit in the IEEE-754 standard.
 * While `0 === -0` is true, they can behave differently in certain mathematical
 * contexts (e.g., indicating the direction of an approach to zero).
 */

console.log("\n--- The Zero Quirk ---");
console.log("0 === -0 is", 0 === -0);
console.log("Object.is(0, -0) is", Object.is(0, -0));

/**
 * 6. Special Numeric Constants
 * ----------------------------
 * The `Number` object holds several useful constants.
 */

console.log("\n--- Special Numeric Constants ---");
console.log("Number.POSITIVE_INFINITY:", Number.POSITIVE_INFINITY);
console.log("Number.NEGATIVE_INFINITY:", Number.NEGATIVE_INFINITY);
console.log("Number.NaN:", Number.NaN);

// `Number.EPSILON` represents the difference between 1 and the smallest
// floating-point number greater than 1. It's useful for floating-point equality checks.
console.log("Number.EPSILON:", Number.EPSILON);

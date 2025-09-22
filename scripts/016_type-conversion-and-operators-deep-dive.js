
/**
 * =============================================================================
 * 🔥 JavaScript Learning Path: Type Conversion & Operators Deep Dive
 * =============================================================================
 *
 * This document provides a deep dive into JavaScript's type conversion rules
 * (coercion) and how they affect the behavior of arithmetic and comparison
 * operators. Understanding this "hidden machinery" is crucial for mastering
 * JavaScript and acing technical interviews.
 *
 * -----------------------------------------------------------------------------
 * 🔹 The Hidden Machinery of Type Conversion
 * -----------------------------------------------------------------------------
 *
 * JavaScript has two kinds of type conversions:
 * 1. **Explicit Conversion (Type Casting):** When you manually convert a type.
 *    - e.g., `Number("42")`, `String(123)`
 * 2. **Implicit Conversion (Type Coercion):** When the JS engine automatically
 *    converts types, usually during operations.
 *    - e.g., `"5" - 2`, `if ([]) { ... }`
 *
 * --- Core Conversion Paths ---
 *
 * (A) **ToPrimitive Conversion (for Objects)**
 * When an object needs to become a primitive, the engine follows these steps:
 * 1. Call `obj.valueOf()`. If it returns a primitive, use it.
 * 2. If not, call `obj.toString()`. If it returns a primitive, use it.
 * 3. If still not a primitive, throw a `TypeError`.
 * (Note: `Date` objects are an exception and try `toString()` first for some operations).
 *
 * (B) **String Conversion (ToString)**
 * - `null` -> `"null"`
 * - `undefined` -> `"undefined"`
 * - `[]` -> `""`
 * - `[1,2]` -> `"1,2"`
 * - `{}` -> `"[object Object]"`
 *
 * (C) **Number Conversion (ToNumber)**
 * - `null` -> `0`
 * - `undefined` -> `NaN`
 * - `""` -> `0`
 * - `"123"` -> `123`
 * - `"abc"` -> `NaN`
 * - `[]` -> `0` (because `[].toString()` is `""`, and `Number("")` is `0`)
 * - `[1]` -> `1`
 * - `[1,2]` -> `NaN`
 * - `{}` -> `NaN`
 *
 * (D) **Boolean Conversion (ToBoolean)**
 * Only 7 values are "falsy". Everything else is "truthy".
 * Falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
 * Truthy values: `{}`, `[]`, `"0"`, `"false"`, `function(){}`, etc.
 */

console.log("=============================================================================");
console.log("🔥 JavaScript Learning Path: Type Conversion & Operators Deep Dive");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 🧮 Deep Dive: Arithmetic Operators
// -----------------------------------------------------------------------------
console.log("\n--- Arithmetic Operators ---");

// --- 1. The `+` Operator (Addition / Concatenation) ---
// If either operand is a string (or becomes one), it's concatenation.
console.log('1 + "2" ->', 1 + "2"); // "12"
console.log("[] + 1 ->", [] + 1); // "1" (since [] becomes "")
console.log("[] + {} ->", [] + {}); // "[object Object]" (since [] -> "" and {} -> "[object Object]")
// Otherwise, it's numeric addition.
console.log("true + true ->", true + true); // 2 (since true -> 1)
console.log("null + 5 ->", null + 5); // 5 (since null -> 0)

// --- 2. Other Arithmetic Operators (-, *, /, %, **) ---
// These always coerce operands to numbers.
console.log('"5" - 2 ->', "5" - 2); // 3
console.log('"5" * "2" ->', "5" * "2"); // 10
console.log("[] - 1 ->", [] - 1); // -1 (since [] -> "" -> 0)
console.log("{} - 1 ->", {} - 1); // NaN (since {} -> "[object Object]" -> NaN)

// --- 3. Remainder `%` vs. Modulo ---
// The sign of the result matches the sign of the first operand (the dividend).
console.log("5 % 2 ->", 5 % 2);   // 1
console.log("-5 % 2 ->", -5 % 2); // -1 (not 1, as in true modulo)
console.log("5 % -2 ->", 5 % -2); // 1

// -----------------------------------------------------------------------------
// 🧠 Arithmetic Brain-Benders with Solutions
// -----------------------------------------------------------------------------
console.log("\n--- Arithmetic Brain-Benders with Solutions ---");

// Q1: `{} + []` vs `[] + {}`
console.log("Q1.1: [] + {} ->", [] + {}); // "[object Object]"
// Reasoning: `[]` becomes `""`. `{}` becomes `"[object Object]"`. Concatenation gives `"[object Object]"`.

console.log("Q1.2: {} + [] ->", ({} + [])); // In browsers, this often logs 0. In Node.js, it's "[object Object]".
// Reasoning: This is a famous parsing quirk. At the start of a line, `{}` is parsed as an empty code block, not an object literal.
// The statement is interpreted as `+[]`, which coerces `[]` to a number (`[]` -> `""` -> `0`).
// Wrapping it in parentheses `({} + [])` forces it to be treated as an expression, yielding "[object Object]".

// Q2: Floating Point Precision
console.log("Q2.1: 0.1 + 0.2 === 0.3 ->", 0.1 + 0.2 === 0.3); // false
console.log("Q2.2: 0.1 + 0.2 ->", 0.1 + 0.2); // 0.30000000000000004
// Reasoning: Binary floating-point representation cannot store 0.1 or 0.2 perfectly, leading to rounding errors.

// Q3: Safe Integer Limit
console.log("Q3: 9999999999999999 ->", 9999999999999999); // 10000000000000000
// Reasoning: The number is larger than `Number.MAX_SAFE_INTEGER` and loses precision, getting rounded.

// Q4: Distinguishing -0 and 0
console.log("Q4.1: -0 === 0 ->", -0 === 0); // true
console.log("Q4.2: Object.is(-0, 0) ->", Object.is(-0, 0)); // false
console.log("Q4.3: 1 / -0 ->", 1 / -0); // -Infinity
// Reasoning: `===` treats them as equal. `Object.is` and division can distinguish them.

// Q5: Coercion in Loops
// for (let i = 0; i < "1000"; i++) {}
console.log("Q5: The string '1000' in a loop condition is coerced to a number on every iteration, causing a minor performance cost.");
const limit = 1000;
// for (let i = 0; i < limit; i++) {} // Optimized version

// -----------------------------------------------------------------------------
// ⚖️ Deep Dive: Comparison Operators
// -----------------------------------------------------------------------------
console.log("\n--- Comparison Operators ---");

// --- 1. Strict Equality (`===`) ---
// No type coercion. If types are different, it's always false.
console.log('0 === "0" ->', 0 === "0"); // false
console.log("NaN === NaN ->", NaN === NaN); // false (special case)

// --- 2. Loose Equality (`==`) ---
// Performs type coercion.
console.log('null == undefined ->', null == undefined); // true (special rule)
console.log('"42" == 42 ->', "42" == 42); // true
console.log('true == 1 ->', true == 1); // true
console.log('[] == 0 ->', [] == 0); // true (since [] -> "" -> 0)
console.log('[] == false ->', [] == false); // true (since [] -> 0 and false -> 0)

// --- 3. Relational Operators (<, >) ---
// If both are strings, it's a lexicographical (alphabetical) comparison.
console.log('"2" < "12" ->', "2" < "12"); // false (because "2" is alphabetically greater than "1")
// Otherwise, it's a numeric comparison.
console.log('"2" < 12 ->', "2" < 12); // true

// -----------------------------------------------------------------------------
// 🧠 Comparison Brain-Benders with Solutions
// -----------------------------------------------------------------------------
console.log("\n--- Comparison Brain-Benders with Solutions ---");

// Q1: `null` vs `undefined`
console.log("Q1.1: null == undefined ->", null == undefined); // true
console.log("Q1.2: null === undefined ->", null === undefined); // false
// Reasoning: `==` has a special rule making them equal. `===` sees they are different types.

// Q2: Empty arrays and coercion
console.log("Q2.1: [] == 0 ->", [] == 0); // true
console.log("Q2.2: [] == false ->", [] == false); // true
console.log("Q2.3: [null] == 0 ->", [null] == 0); // true
// Reasoning: In all cases, the array is converted to a primitive. `[].toString()` is `""`. `[null].toString()` is also `""`.
// The empty string `""` is then converted to the number `0`. The comparison becomes `0 == 0`.

// Q3: Lexicographical comparison
console.log('Q3: "2" < "12" ->', "2" < "12"); // false
// Reasoning: It compares character by character. The first character "2" is compared to "1". Since "2" comes after "1" in Unicode order, the expression is false.

// Q4: Boolean and string coercion
console.log('Q4.1: false == "0" ->', false == "0"); // true
console.log('Q4.2: false === "0" ->', false === "0"); // false
// Reasoning: For `==`, `false` becomes `0` and `"0"` becomes `0`. `0 == 0` is true. For `===`, types are different.

// Q5: The `NaN` paradox
console.log("Q5: NaN === NaN ->", NaN === NaN); // false
// Reasoning: By the IEEE-754 standard, NaN is never equal to anything, including itself.
// Correct way to check:
console.log("   Number.isNaN(NaN) ->", Number.isNaN(NaN)); // true
console.log("   Object.is(NaN, NaN) ->", Object.is(NaN, NaN)); // true

/**
 * =============================================================================
 * 🚀 Interview-Grade Hidden Insights
 * =============================================================================
 *
 * 1. `[] == ![]` is `true`
 *    - `![]` is evaluated first. `[]` is a truthy object, so `![]` becomes `false`.
 *    - The comparison is now `[] == false`.
 *    - This coerces to `0 == 0`, which is `true`.
 *
 * 2. `[1] + [2,3]` is `"12,3"`
 *    - Both arrays are converted to strings via `toString()`.
 *    - `[1].toString()` is `"1"`.
 *    - `[2,3].toString()` is `"2,3"`.
 *    - The `+` operator concatenates them: `"1" + "2,3"`.
 *
 * 3. `Date` objects prefer string conversion with `+`
 *    - `new Date() + 1` results in string concatenation because the default `ToPrimitive`
 *      hint for `Date` objects with `+` is "string".
 *    - `+new Date()` (unary plus) uses a "number" hint, resulting in the numeric timestamp.
 */

console.log("\n--- Interview-Grade Hidden Insights ---");
console.log("[] == ![] ->", [] == ![]); // true
console.log("[1] + [2,3] ->", [1] + [2,3]); // "12,3"
console.log("new Date() + 1 ->", new Date() + 1); // String concatenation
console.log("+new Date() ->", +new Date()); // Numeric timestamp

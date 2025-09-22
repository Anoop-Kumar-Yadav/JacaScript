
/**
 * =============================================================================
 * 🟢 JavaScript Learning Path: Primitive 6: null
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `null` primitive,
 * a value that represents the intentional absence of any object value.
 *
 *
 * 1. 🔹 What is `null`?
 * -----------------------
 * `null` is a primitive value that is intentionally set by a developer to signify
 * "no value" or an "empty" value. It's different from `undefined`, which the
 * engine assigns automatically when a value is not present.
 *
 * 🔥 The `typeof null` Bug:
 * This is one of JavaScript's most famous historical quirks. Due to an issue in
 * the original implementation, `typeof null` returns "object". This was never
 * fixed to avoid breaking existing code on the web.
 */

console.log("--- What is null? ---");
console.log("typeof null:", typeof null); // "object" ❌ (historical bug)

/**
 * 2. 🔹 When to use `null`
 * -----------------------
 * `null` is used to explicitly signal an absence of value.
 */

console.log("\n--- When to use null ---");
// To clear or reset a variable, often one that previously held an object.
let user = { name: "Alice" };
user = null; // The 'user' variable is now empty.
console.log("Cleared user variable:", user);

// To signal an intentional "not found" result from a function.
function findUser(id) {
  if (id !== 1) {
    return null; // Explicitly returning "not found"
  }
  return { id: 1, name: "Bob" };
}
console.log("findUser(0):", findUser(0));

/**
 * 3. 🔹 Type Coercion with `null`
 * --------------------------------
 * `null` behaves differently from `undefined` during type coercion.
 */

console.log("\n--- Type Coercion with null ---");
console.log("Number(null):", Number(null)); // 0
console.log("String(null):", String(null)); // "null"
console.log("Boolean(null):", Boolean(null)); // false

/**
 * 4. 🧩 Quick Exercise with Solutions (The Comparison Paradox)
 * -----------------------------------------------------------
 * This exercise reveals the inconsistent coercion rules for `null`.
 */

console.log("\n--- The Comparison Paradox Exercise ---");

// Q1: console.log(null == 0);
console.log("Q1: null == 0 is", null == 0);
// ✅ Output: false
// Reason: The loose equality `==` has a special rule that `null` is only equal to `undefined`. It does not coerce `null` to a number in this case.

// Q2: console.log(null < 0);
console.log("Q2: null < 0 is", null < 0);
// ✅ Output: false
// Reason: Relational operators (`<`, `>`, `<=`, `>=`) DO coerce `null` to a number. `Number(null)` is `0`. The comparison becomes `0 < 0`, which is false.

// Q3: console.log(null <= 0);
console.log("Q3: null <= 0 is", null <= 0);
// ✅ Output: true
// Reason: `null` is coerced to `0`. The comparison becomes `0 <= 0`, which is true.

// Q4: console.log(null >= 0);
console.log("Q4: null >= 0 is", null >= 0);
// ✅ Output: true
// Reason: `null` is coerced to `0`. The comparison becomes `0 >= 0`, which is true.

// Q5: console.log(null + true);
console.log("Q5: null + true is", null + true);
// ✅ Output: 1
// Reason: In an arithmetic context, `null` becomes `0` and `true` becomes `1`. The operation is `0 + 1`.

/**
 * ⚡ Hidden Internals Insight
 * ----------------------------
 * The reason `null >= 0` is true while `null == 0` is false is due to
 * different algorithms in the ECMAScript specification:
 * - The Abstract Equality Comparison (`==`) has a specific step: "If x is null and y is undefined, return true" (and vice-versa), but no rule to convert `null` to a number.
 * - The Relational Comparison (`<`, `>=`) algorithm will first convert both operands to numbers if they are not strings. This forces `null` to become `0`.
 */

/**
 * 5. 🟣 `null` — Edge Cases & Gotchas
 * -----------------------------------
 */

console.log("\n--- Edge Cases & Gotchas ---");

// 1. Loose equality trap
console.log("null == undefined is", null == undefined); // true (the only loose equality that works for null)
console.log("null == false is", null == false); // false

// 2. `null` in JSON
// `null` is a valid value in JSON and is preserved. `undefined` is dropped.
console.log('JSON with null:', JSON.stringify({ a: null, b: 2 })); // {"a":null,"b":2}
console.log('JSON with undefined:', JSON.stringify({ a: undefined, b: 2 })); // {"b":2}

// 3. `null` in arithmetic
console.log("null + 5 =", null + 5); // 5 (null -> 0)
console.log("null * 2 =", null * 2); // 0
console.log("null / 0 =", null / 0); // NaN (because 0 / 0 is mathematically indeterminate)

// 4. Optional Chaining (`?.`)
let nullUser = null;
console.log("Optional chaining on null:", nullUser?.name); // undefined (safe, no error)
try {
  console.log(nullUser.name);
} catch (e) {
  console.log("Direct access on null throws error:", e.message); // ❌ TypeError
}

// 5. Nullish Coalescing (`??`) vs. OR (`||`)
// `??` only triggers for `null` or `undefined`.
let val1 = null ?? "fallback";
console.log("null ?? 'fallback' ->", val1); // "fallback"

let val2 = 0 ?? "fallback";
console.log("0 ?? 'fallback' ->", val2); // 0 (0 is not null/undefined)

// `||` triggers for any falsy value (0, "", false, etc.).
let val3 = 0 || "fallback";
console.log("0 || 'fallback' ->", val3); // "fallback"

// 6. `Object.is` vs `===` with `null`
// For `null`, they behave identically.
console.log("Object.is(null, null):", Object.is(null, null)); // true
console.log("null === null:", null === null); // true

// 7. `delete` vs. assigning `null`
// Assigning `null` removes the reference from the variable to the object,
// making the object eligible for garbage collection (if no other references exist).
let objToClear = { a: 1 };
objToClear = null;
console.log("objToClear after assigning null:", objToClear); // null
// `delete` is for removing a property from an object, not for clearing a variable.

// 8. Function defaults vs `null`
// Default parameter values only apply if the argument is `undefined`, not `null`.
function testDefaults(x = 42) {
  console.log("Function default test with", x, "->", x);
}
testDefaults(undefined); // 42 (default applies)
testDefaults(null); // null (default is skipped!)

/**
 * 6. 🔹 Best Practices
 * ---------------------
 * ✅ Use `null` when you want to explicitly empty or clear a variable, especially one that held an object.
 * ✅ Always use strict equality (`===`) when checking for `null` to avoid the confusing coercion rules of `==`.
 * ✅ In APIs or functions, return `null` to clearly signal "no result was found," as it's a more deliberate signal than `undefined`.
 */

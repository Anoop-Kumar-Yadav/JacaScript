
/**
 * =============================================================================
 * 🔹 JavaScript Learning Path: Primitive 4: Boolean
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `Boolean` type.
 * While it seems trivial (true/false), its interaction with type coercion
 * makes it one of the most interview-heavy and bug-prone areas in JavaScript.
 *
 *
 * ✅ What is a Boolean?
 * --------------------
 * A primitive type that has only two values: `true` and `false`.
 * It's the foundation for all logical operations, conditions, and comparisons.
 *
 *
 * ⚙️ Internal Behavior & The `new Boolean()` Trap
 * ------------------------------------------------
 * Primitives `true` and `false` are simple flags. However, you can create a
 * `Boolean` object wrapper using `new Boolean()`. This is highly discouraged.
 *
 * ⚠️ Rule: Never use `new Boolean()`. All objects, including `new Boolean(false)`,
 * are "truthy" in a boolean context, which defeats the purpose.
 */

console.log("--- The `new Boolean()` Trap ---");
let primitiveFalse = false;
let objectFalse = new Boolean(false);

console.log("typeof primitiveFalse:", typeof primitiveFalse); // "boolean"
console.log("typeof objectFalse:", typeof objectFalse); // "object"
console.log("objectFalse is truthy?:", objectFalse ? "truthy" : "falsy"); // "truthy" ⚠️

/**
 * 🌟 Truthy vs Falsy & The ToBoolean Algorithm
 * ---------------------------------------------
 * The ECMAScript specification defines a `ToBoolean` algorithm that determines
 * whether a value is "truthy" or "falsy" when coerced.
 *
 * The rule is simple: "If a value is in the falsy list, it's false. Otherwise, it's true."
 *
 * ✅ The 7 Falsy Values in JavaScript:
 * 1. false
 * 2. 0 (and -0)
 * 3. 0n (BigInt zero)
 * 4. "" (empty string)
 * 5. null
 * 6. undefined
 * 7. NaN
 *
 * ✨ Everything else is TRUTHY. This includes:
 * - Non-empty strings: "hello", "0", "false", " "
 * - All non-zero numbers: 42, -1, Infinity
 * - All objects: {}, [], function(){}, new Date()
 */

console.log("\n--- Truthy/Falsy Examples ---");
console.log("Boolean('hello'):", Boolean("hello")); // true
console.log("Boolean([]):", Boolean([])); // true (empty array is an object)
console.log("Boolean({}):", Boolean({})); // true (empty object)

/**
 * ⚡ How Coercion Happens in Practice
 * ------------------------------------
 */

console.log("\n--- Coercion in Practice ---");

// 1. In `if` conditions
if ("") {
  console.log("This will not run");
} else {
  console.log("if(''): An empty string is falsy.");
}

// 2. With `!!` (Double NOT) - A common shorthand for `Boolean()`
console.log("!!'Hello':", !!"Hello"); // true
console.log("!!0:", !!0); // false

// 3. In logical operators
console.log(`"" || "default":`, "" || "default"); // "default" (OR returns the first truthy value)
console.log(`0 && "next":`, 0 && "next"); // 0 (AND returns the first falsy value)
console.log(`0 ?? "fallback":`, 0 ?? "fallback"); // 0 (Nullish Coalescing only checks for null/undefined)

/**
 * ⚠️ Tricky Cases with Loose Equality (==)
 * -----------------------------------------
 * Loose equality performs type coercion, leading to surprising results.
 * This is why `===` (strict equality) is almost always preferred.
 */

console.log("\n--- Tricky Loose Equality (==) ---");
console.log("[] == false is", [] == false); // true. The coercion process is tricky:
// 1. The boolean `false` is converted to a number, becoming `0`.
// 2. The comparison is now `[] == 0`.
// 3. The array `[]` is an object, so it's converted to a primitive. `[].toString()` results in an empty string `""`.
// 4. The comparison is now `"" == 0`.
// 5. The string `""` is converted to a number, becoming `0`.
// 6. The final comparison is `0 == 0`, which is `true`.

console.log("[] === false is", [] === false); // false (different types)
console.log('"0" == false is', "0" == false); // true (coerced: 0 == 0)
console.log("null == false is", null == false); // false (special rule for null/undefined)

/**
 * 🚀 Real-World Use Cases
 * --------------------
 */

function validateInput(userInput) {
  // If userInput is "", 0, null, or undefined, it's falsy.
  if (!userInput) {
    // console.log("Validation Error: Input is required!");
    return false;
  }
  return true;
}
validateInput("");

function handleApiResponse(data) {
  // Optional chaining `?.` returns undefined if `data` is null/undefined.
  // `!undefined` is true.
  if (!data?.length) {
    // console.log("API Response: No records found.");
    return "No records";
  }
  return "Records found";
}
handleApiResponse({ length: 0 }); // `data.length` is 0, which is falsy. `!0` is true.

/**
 * 🧩 Mini-Exercises with Solutions
 * --------------------
 */

console.log("\n--- Mini-Exercises with Solutions ---");

// Q1: console.log(Boolean(new Boolean(false)));
console.log("Q1: Boolean(new Boolean(false)) ->", Boolean(new Boolean(false)));
// ✅ Output: true
// Step-by-step:
// 1. `new Boolean(false)` creates an OBJECT that wraps the primitive `false`.
// 2. In JavaScript, ALL objects are truthy, regardless of their content.
// 3. `Boolean(anyObject)` therefore evaluates to `true`.

// Q2: console.log([] == true); console.log([0] == false);
console.log("Q2.1: [] == true ->", [] == true);
// ✅ Output: false
// Step-by-step:
// 1. Loose equality `==` with a boolean coerces the boolean to a number. `true` becomes `1`.
// 2. The comparison is now `[] == 1`.
// 3. The array `[]` is coerced to a number. `[].toString()` is `""`. `Number("")` is `0`.
// 4. The final comparison is `0 == 1`, which is `false`.

console.log("Q2.2: [0] == false ->", [0] == false);
// ✅ Output: true
// Step-by-step:
// 1. `false` is coerced to `0`. The comparison is `[0] == 0`.
// 2. The array `[0]` is coerced. `[0].toString()` is `"0"`. `Number("0")` is `0`.
// 3. The final comparison is `0 == 0`, which is `true`.

// Q3: console.log(!!null); console.log(!!"false");
console.log("Q3.1: !!null ->", !!null);
// ✅ Output: false
// Step-by-step:
// 1. `null` is one of the 7 falsy values.
// 2. The first `!` coerces `null` to `false`, then inverts it to `true`.
// 3. The second `!` inverts `true` back to `false`.

console.log('Q3.2: !!"false" ->', !!"false");
// ✅ Output: true
// Step-by-step:
// 1. The string `"false"` is NOT an empty string, so it is truthy.
// 2. The first `!` coerces `"false"` to `true`, then inverts it to `false`.
// 3. The second `!` inverts `false` back to `true`.

/**
 * 🧾 Truthy vs Falsy Comparison Table
 * ------------------------------------
 * A practical demonstration of the ToBoolean algorithm.
 */

console.log("\n--- Truthy vs Falsy Comparison Table ---");

const valuesToTest = [
  false,
  true,
  0,
  -0,
  0n,
  42,
  -7,
  NaN,
  Infinity,
  -Infinity,
  "",
  "0",
  "false",
  " ",
  [],
  {},
  function() {},
  null,
  undefined,
  new Boolean(false),
];

valuesToTest.forEach(value => {
  // Using JSON.stringify for objects/arrays to make them more readable in the log
  const valueAsString =
    typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
  const label = `${valueAsString} (${typeof value})`.padEnd(30, ' ');
  console.log(`${label} => ${Boolean(value)}`);
});

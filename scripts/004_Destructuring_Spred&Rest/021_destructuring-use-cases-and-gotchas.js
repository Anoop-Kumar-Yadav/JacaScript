/**
 * @fileoverview A deep dive into special use cases, gotchas, and common
 * patterns for JavaScript destructuring.
 */

// =============================================================================
// 🎯 JavaScript Learning Path: Destructuring Use Cases & Gotchas
// =============================================================================
console.log("=============================================================================");
console.log("🎯 JavaScript Learning Path: Destructuring Use Cases & Gotchas");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 1. Swapping Variables
// -----------------------------------------------------------------------------
console.log("\n--- 1. Swapping Variables ---");
let a_s1 = 1, b_s1 = 2;
[a_s1, b_s1] = [b_s1, a_s1]; // Classic trick with array destructuring
console.log("Swapped a and b ->", `a=${a_s1}, b=${b_s1}`); // 2, 1
console.log("✅ Internally: engine just makes a temporary array and reassigns.");

// -----------------------------------------------------------------------------
// 2. Destructuring Strings
// -----------------------------------------------------------------------------
console.log("\n--- 2. Destructuring Strings ---");
// Strings are iterable, so array destructuring works.
const [x_s2, y_s2, z_s2] = "hey";
console.log("const [x, y, z] = 'hey' ->", `x=${x_s2}, y=${y_s2}, z=${z_s2}`); // h e y

// Strings also have properties (like objects).
const { length: len_s2 } = "hello";
console.log("const { length } = 'hello' ->", len_s2); // 5

// -----------------------------------------------------------------------------
// 3. Destructuring in Loops
// -----------------------------------------------------------------------------
console.log("\n--- 3. Destructuring in Loops ---");
const users_s3 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];
console.log("Looping over users array:");
for (const { id, name } of users_s3) {
  console.log(`  - ID: ${id}, Name: ${name}`);
}

// -----------------------------------------------------------------------------
// 4. Setting Defaults in Function Parameters
// -----------------------------------------------------------------------------
console.log("\n--- 4. Function Parameter Defaults ---");
// The `= {}` provides a default for the entire destructured parameter.
function connect({ host = "localhost", port = 80 } = {}) {
  console.log(`   Connecting to ${host}:${port}`);
}
console.log("Calling connect():");
connect(); // localhost 80
console.log("Calling connect({ host: '127.0.0.1' }):");
connect({ host: "127.0.0.1" }); // 127.0.0.1 80

// -----------------------------------------------------------------------------
// 5. Ignoring Values
// -----------------------------------------------------------------------------
console.log("\n--- 5. Ignoring Values ---");
const [a_s5, , b_s5] = [1, 2, 3];
console.log("Ignoring with commas [a, , b]:", `a=${a_s5}, b=${b_s5}`); // 1 3

const { x_s5, ...rest_s5 } = { x: 1, y: 2, z: 3 };
console.log("Ignoring with rest operator {...rest}:", rest_s5); // { y: 2, z: 3 }

// -----------------------------------------------------------------------------
// 6. Destructuring with Dynamic Keys
// -----------------------------------------------------------------------------
console.log("\n--- 6. Dynamic Keys ---");
const key_s6 = "age";
const { [key_s6]: userAge_s6 } = { name: "Sam", age: 25 };
console.log("Destructuring with a dynamic key 'age':", userAge_s6); // 25

// -----------------------------------------------------------------------------
// 7. Nested Default Values
// -----------------------------------------------------------------------------
console.log("\n--- 7. Nested Default Values ---");
const { profile: { city: city_s7 = "Unknown" } = {} } = {};
console.log("Safely getting a nested property:", city_s7); // "Unknown"

// =============================================================================
// ⚠️ Gotchas
// =============================================================================
console.log("\n--- ⚠️ Gotchas ---");

// --- 1. Primitive Destructuring ---
console.log("\n--- Gotcha 1: Primitive Destructuring ---");
const { toString: ts_g1 } = 123;
console.log("`toString` from number 123:", ts_g1 === Number.prototype.toString); // true
console.log("✅ Works because primitives are auto-boxed (wrapped in objects).");

// --- 2. Invalid Left-Hand Side ---
console.log("\n--- Gotcha 2: Invalid Left-Hand Side ---");
let a_g2;
// { a_g2 } = { a: 10 }; // ❌ SyntaxError: JS thinks `{}` starts a code block.
({ a_g2 } = { a: 10 }); // ✅ OK: Parentheses force it to be an expression.
console.log("Destructuring assignment needs parentheses:", a_g2);

// --- 3. Duplicate Variables ---
console.log("\n--- Gotcha 3: Duplicate Variables ---");
try {
  // This would cause a SyntaxError if not in a try-catch or commented out.
  // eval('const { a, a } = { a: 1 };');
  console.log("`const { a, a } = { a: 1 }` is a SyntaxError: Duplicate declaration.");
} catch (e) {
  // This catch block is just to prevent the script from crashing.
  // In a real file, this would be a syntax error caught by the parser.
}

console.log("\n✅ Destructuring is flexible, but pitfalls appear with defaults, nesting, and unusual assignments.");

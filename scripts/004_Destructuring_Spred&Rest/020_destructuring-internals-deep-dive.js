/**
 * @fileoverview A deep dive into how JavaScript destructuring works under the
 * hood in engines like V8 and SpiderMonkey. This file explains the "syntactic
 * sugar" by showing the code it translates to.
 */

// =============================================================================
// ⚙️ JavaScript Learning Path: Internals of Destructuring
// =============================================================================
console.log("=============================================================================");
console.log("⚙️ JavaScript Learning Path: Internals of Destructuring");
console.log("=============================================================================");

// At its core, destructuring is just syntactic sugar.
// The engine translates it into property lookups and assignments during execution.

// -----------------------------------------------------------------------------
// 1. Array Destructuring Internals
// -----------------------------------------------------------------------------
console.log("\n--- 1. Array Destructuring Internals ---");

// Your code:
const [arr_a, arr_b] = [10, 20];
console.log("const [a, b] = [10, 20]; ->", `a=${arr_a}, b=${arr_b}`);

// 🔍 Engine expands it roughly like:
/*
let temp = [10, 20];
let a = temp[0];
let b = temp[1];
*/
console.log("✅ So destructuring is not magic — it’s just shorthand for indexing.");

// --- Advanced Case: Skipping values ---
console.log("\n--- Advanced Case: Skipping values ---");
// Your code:
const [skip_a, , skip_b] = [10, 20, 30];
console.log("const [a, , b] = [10, 20, 30]; ->", `a=${skip_a}, b=${skip_b}`);

// Internally:
/*
let temp = [10, 20, 30];
let a = temp[0];
// skip temp[1]
let b = temp[2];
*/

// ⚠️ Performance Note: Skipped values are still evaluated, only not assigned.
console.log("\n⚠️ Skipped values are still evaluated:");
function heavy() {
  console.log("   (heavy function called)");
  return 42;
}
const [heavy_a, , heavy_b] = [1, heavy(), 3];
// prints "(heavy function called)" even though the result is skipped

// -----------------------------------------------------------------------------
// 2. Object Destructuring Internals
// -----------------------------------------------------------------------------
console.log("\n--- 2. Object Destructuring Internals ---");

// Your code:
const { x: obj_x, y: obj_y } = { x: 10, y: 20 };
console.log("const { x, y } = { x: 10, y: 20 }; ->", `x=${obj_x}, y=${obj_y}`);

// --- Renaming ---
console.log("\n--- Renaming ---");
const { x: foo } = { x: 10 };
console.log("const { x: foo } = { x: 10 }; ->", `foo=${foo}`);
// ⚠️ Notice: `x` does not exist as a variable now, only `foo`.

// -----------------------------------------------------------------------------
// 3. Default Values Internals
// -----------------------------------------------------------------------------
console.log("\n--- 3. Default Values Internals ---");

const [def_a = 5, def_b = 10] = [undefined, 20];
console.log("const [a = 5, b = 10] = [undefined, 20]; ->", `a=${def_a}, b=${def_b}`);

// 👉 Default values only trigger on `undefined`, not `null` or other falsy values.
const [def_c = 5] = [null];
console.log("const [a = 5] = [null]; -> a is", def_c); // null (NOT 5)

// -----------------------------------------------------------------------------
// 4. Nested Destructuring Internals
// -----------------------------------------------------------------------------
console.log("\n--- 4. Nested Destructuring Internals ---");

const user_nested = { profile: { address: { city: "New York" } } };
const { profile: { address: { city } } } = user_nested;
console.log("const { profile: { address: { city } } } = user; -> city is", city);

// ⚠️ If `user.profile` is undefined, this throws. That’s why people combine it with default values:
const user_safe = {};
const { profile: { address: { city: safe_city } = {} } = {} } = user_safe || {};
console.log("Safe nested destructuring on empty object -> city is", safe_city); // undefined

// -----------------------------------------------------------------------------
// 5. Rest Operator Internals
// -----------------------------------------------------------------------------
console.log("\n--- 5. Rest Operator Internals ---");

const { id: rest_id, ...rest } = { id: 1, name: "Alice", age: 25 };
console.log("const { id, ...rest } = ...; -> id is", rest_id, "and rest is", rest);
// ⚠️ Rest creates a shallow copy of remaining keys.

// -----------------------------------------------------------------------------
// 6. Function Parameter Destructuring Internals
// -----------------------------------------------------------------------------
console.log("\n--- 6. Function Parameter Destructuring Internals ---");

function greet({ name, age }) {
  console.log(`   Hello, ${name}! You are ${age}.`);
}
greet({ name: "Bob", age: 30 });
console.log("✅ Function parameter destructuring is just 'auto unpacking.'");

// =============================================================================
// 🧠 Brain-Bender Internals & Solutions
// =============================================================================
console.log("\n--- Brain-Bender Internals & Solutions ---");

console.log("\n--- Q1: Why does `const { a: { b } } = { a: null }` throw an error? ---");
try {
  const { a: { b: bender_b1 } } = { a: null };
} catch (e) {
  console.log("   Error:", e.message);
}
console.log("   Engine tries `temp.a.b`, which is `null.b`, causing a TypeError.");

console.log("\n--- Q2: Why does `const { a: { b } = {} } = {}` NOT crash? ---");
const { a: { b: bender_b2 } = {} } = {};
console.log("   Result of b is:", bender_b2); // undefined
console.log("   Engine uses default `{}` for `a`, so `a.b` is just `undefined`.");

// =============================================================================
// ⚡ Real Optimization Insight
// =============================================================================
console.log("\n--- Real Optimization Insight ---");
console.log("Best practice: For deep paths, use optional chaining for performance and readability:");
const user_deep = {};
const city_optional = user_deep?.profile?.address?.city;
console.log("   user?.profile?.address?.city ->", city_optional); // undefined (no error)

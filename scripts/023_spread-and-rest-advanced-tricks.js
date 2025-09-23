/**
 * @fileoverview A deep dive into advanced tricks, pro-use cases, and hidden
 * traps of the Spread (...) and Rest (...) operators in JavaScript.
 */

// =============================================================================
// 🚀 JavaScript Learning Path: Advanced Spread/Rest Tricks
// =============================================================================
console.log("=============================================================================");
console.log("🚀 JavaScript Learning Path: Advanced Spread/Rest Tricks");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 1. Shallow vs. Deep Copy — The Trap
// -----------------------------------------------------------------------------
console.log("\n--- 1. Shallow vs. Deep Copy Trap ---");
const obj_s1 = { a: 1, b: { c: 2 } };
const copy_s1 = { ...obj_s1 };
copy_s1.b.c = 99;
console.log("Original object was mutated (obj.b.c):", obj_s1.b.c); // 99 ❌
console.log("👉 Why? Spread only performs a shallow copy. Nested objects are copied by reference.");

console.log("\n✅ Solution (Deep Copy):");
const deep2 = structuredClone(obj_s1);
deep2.b.c = 500; // Mutate the deep copy
console.log("Original object is unaffected by structuredClone:", obj_s1.b.c); // 99
// Other methods:
// const deep1 = JSON.parse(JSON.stringify(obj)); // Fails on Dates, Functions, undefined
// const deep3 = _.cloneDeep(obj); // Requires Lodash library

// -----------------------------------------------------------------------------
// 2. Merging Objects — Property Overwrites
// -----------------------------------------------------------------------------
console.log("\n--- 2. Merging Objects & Overwrites ---");
const a_s2 = { x: 1, y: 2 };
const b_s2 = { y: 10, z: 3 };
const merged_s2 = { ...a_s2, ...b_s2 };
console.log("Later spread overwrites earlier:", merged_s2); // { x: 1, y: 10, z: 3 }

const mergedSafe_s2 = { ...b_s2, ...a_s2 };
console.log("Reversing order preserves earlier values:", mergedSafe_s2); // { y: 2, z: 3, x: 1 }

// -----------------------------------------------------------------------------
// 3. Spread in Arrays — Immutable Updates
// -----------------------------------------------------------------------------
console.log("\n--- 3. Immutable Array Updates ---");
const users_s3 = [{ id: 1, active: false }, { id: 2, active: false }];
const updated_s3 = users_s3.map(u =>
  u.id === 2 ? { ...u, active: true } : u
);
console.log("Original users array:", users_s3);
console.log("Updated users array (immutable):", updated_s3);
console.log("👉 Spread avoids mutation, which is key for state management (e.g., React).");

// -----------------------------------------------------------------------------
// 4. Rest Parameters — Flexible APIs
// -----------------------------------------------------------------------------
console.log("\n--- 4. Rest Parameters for Flexible APIs ---");
function logAll(first, ...rest) {
  console.log("  First argument:", first);
  console.log("  Rest of arguments (as a real array):", rest);
  console.log("  Can we use .map() on rest? ->", rest.map(arg => `[${arg}]`));
}
logAll("A", "B", "C");

// -----------------------------------------------------------------------------
// 5. Destructuring + Rest
// -----------------------------------------------------------------------------
console.log("\n--- 5. Destructuring with Rest ---");
const { a: a_s5, ...rest_s5 } = { a: 1, b: 2, c: 3 };
console.log("Rest of object properties:", rest_s5); // { b: 2, c: 3 }

const [head_s5, ...tail_s5] = [10, 20, 30];
console.log("Rest of array elements:", tail_s5); // [20, 30]
console.log("👉 Hidden Gotcha: ...rest must be the last element in a destructuring pattern.");

// -----------------------------------------------------------------------------
// 6. Handling Non-Iterables (Corner Case)
// -----------------------------------------------------------------------------
console.log("\n--- 6. Spreading Non-Iterables ---");
const obj_s6 = { a: 1, b: 2 };
try {
  console.log([...obj_s6]);
} catch (e) {
  console.log("Spreading a plain object into an array fails:", e.message);
}
console.log("✅ Trick: Convert object to an iterable structure first.");
console.log("Spreading Object.entries(obj):", [...Object.entries(obj_s6)]);
console.log("Spreading Object.keys(obj):", [...Object.keys(obj_s6)]);
console.log("Spreading Object.values(obj):", [...Object.values(obj_s6)]);

// -----------------------------------------------------------------------------
// 8. Advanced Trick — Conditional Spreading
// -----------------------------------------------------------------------------
console.log("\n--- 8. Conditional Spreading ---");
const condition_s8 = true;
const obj_s8 = {
  a: 1,
  ...(condition_s8 ? { b: 2 } : {}),
};
console.log("Conditionally added property 'b':", obj_s8); // { a: 1, b: 2 }

// -----------------------------------------------------------------------------
// 9. Merging Defaults with Rest
// -----------------------------------------------------------------------------
console.log("\n--- 9. Merging Defaults ---");
function setup(options) {
  const defaults = { debug: false, verbose: false, port: 8080 };
  const finalConfig = { ...defaults, ...options };
  console.log("  Final config:", finalConfig);
  return finalConfig;
}
console.log("Calling setup({ debug: true }):");
setup({ debug: true });

// =============================================================================
// 🎯 Interview Brain-Benders (for you to solve)
// =============================================================================
console.log("\n--- Interview Brain-Benders (for you to solve) ---");
console.log("\nQ1: What happens if you spread a Set into an Array?");
console.log("Q2: How does spread handle symbol properties in objects?");
console.log("Q3: Why is spreading arrays sometimes slower than concat()?");
console.log("Q4: Can you use rest in object destructuring with getters? What happens?");

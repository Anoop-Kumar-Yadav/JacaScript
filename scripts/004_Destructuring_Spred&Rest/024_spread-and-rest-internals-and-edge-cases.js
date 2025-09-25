/**
 * @fileoverview A deep dive into hidden internals, edge cases, and advanced
 * patterns for JavaScript's Spread and Rest operators.
 */

// =============================================================================
// ⚡ JavaScript Learning Path: Spread/Rest Internals & Edge Cases
// =============================================================================
console.log("=============================================================================");
console.log("⚡ JavaScript Learning Path: Spread/Rest Internals & Edge Cases");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 1. Symbol Properties — Lost in Spread
// -----------------------------------------------------------------------------
console.log("\n--- 1. Symbol Properties are Skipped by Spread ---");
// Spread only copies own enumerable string-keyed properties.
const sym_s1 = Symbol("secret");
const obj_s1 = { a: 1, [sym_s1]: 42 };

const copy_s1 = { ...obj_s1 };
console.log("Original object:", obj_s1);
console.log("Copy with spread:", copy_s1); // { a: 1 }
console.log("Symbol property in copy is undefined:", copy_s1[sym_s1]); // undefined ❌

console.log("\n✅ To keep symbols, use Object.assign or explicit copying:");
const copyWithSymbols_s1 = Object.assign({}, obj_s1);
console.log("Copy with Object.assign preserves symbols:", copyWithSymbols_s1);
console.log("Symbol property in Object.assign copy:", copyWithSymbols_s1[sym_s1]); // 42

// -----------------------------------------------------------------------------
// 2. Spread with Set / Map
// -----------------------------------------------------------------------------
console.log("\n--- 2. Spread with Set and Map ---");
// Spread converts a Set into an Array of its values.
const set_s2 = new Set([1, 2, 3, 3]); // Set only stores unique values
console.log("Spreading a Set:", [...set_s2]); // [1, 2, 3]

// Spread converts a Map into an Array of its [key, value] pairs.
const map_s2 = new Map([["a", 1], ["b", 2]]);
console.log("Spreading a Map:", [...map_s2]); // [ ['a', 1], ['b', 2] ]

console.log("\nPro Trick: Convert Map to Object");
const objFromMap_s2 = Object.fromEntries(map_s2);
console.log("Object.fromEntries(map):", objFromMap_s2); // { a: 1, b: 2 }

// -----------------------------------------------------------------------------
// 3. Array-Like Objects — Trap
// -----------------------------------------------------------------------------
console.log("\n--- 3. Array-Like Objects Trap ---");
// Spread requires an object to be *iterable*, not just "array-like".
const arrayLike_s3 = { 0: "x", 1: "y", length: 2 };
try {
  console.log([...arrayLike_s3]);
} catch (e) {
  console.log("Spreading an array-like object fails:", e.message); // ❌ TypeError
}

console.log("✅ Fix with Array.from():");
console.log("Array.from(arrayLike):", Array.from(arrayLike_s3)); // ['x', 'y']

// -----------------------------------------------------------------------------
// 4. Duplicate Keys in Object Spread
// -----------------------------------------------------------------------------
console.log("\n--- 4. Duplicate Keys in Object Spread ---");
const a_s4 = { x: 1, y: 10 };
const b_s4 = { x: 2, z: 3 };
const c_s4 = { ...a_s4, ...b_s4, x: 99 };
console.log("Merged object with overrides:", c_s4); // { x: 99, y: 10, z: 3 }
console.log("👉 Rule: The last occurrence of a key wins.");

// -----------------------------------------------------------------------------
// 5. Getter Traps
// -----------------------------------------------------------------------------
console.log("\n--- 5. Getter Traps ---");
const obj_s5 = {
  get x() {
    console.log("   (getter for 'x' was called)");
    return 42;
  }
};
console.log("Creating a copy with spread...");
const copy_s5 = { ...obj_s5 }; // The getter is called here!
console.log("The copied object has the *value*, not the getter:", copy_s5); // { x: 42 }

// -----------------------------------------------------------------------------
// 6. Prototype Chain — Ignored
// -----------------------------------------------------------------------------
console.log("\n--- 6. Prototype Chain is Ignored ---");
const proto_s6 = { p: 1 };
const obj_s6 = Object.create(proto_s6);
obj_s6.a = 2;

console.log("Original object's 'p' property (from proto):", obj_s6.p); // 1
const copy_s6 = { ...obj_s6 };
console.log("Spread copy only has own properties:", copy_s6); // { a: 2 }
console.log("Spread copy does not have 'p':", copy_s6.p); // undefined

// -----------------------------------------------------------------------------
// 7. Rest in Object Destructuring — Hidden Pitfall
// -----------------------------------------------------------------------------
console.log("\n--- 7. Rest in Destructuring Pitfall ---");
const sym_s7 = Symbol("secret");
const base_s7 = { a: 1, b: 2, [sym_s7]: "hidden" };
Object.defineProperty(base_s7, 'c', { value: 3, enumerable: false });

const { a: a_s7, ...rest_s7 } = base_s7;
console.log("Rest object:", rest_s7); // { b: 2 }
console.log("👉 Rest also only collects own, enumerable, string-keyed properties.");

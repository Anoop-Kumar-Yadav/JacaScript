
/**
 * =============================================================================
 * 🟣 JavaScript Learning Path: Primitive 5: undefined
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `undefined` type,
 * a special primitive value that represents the absence of an assigned value.
 *
 *
 * 1. 🔹 What is `undefined`?
 * ---------------------------
 * `undefined` is a primitive value automatically assigned to variables that have
 * just been declared, or to formal arguments for which there are no actual
 * arguments. It signifies that "a variable has been declared but not yet
 * assigned a value."
 *
 * Its type is also, uniquely, "undefined".
 */

console.log("--- What is undefined? ---");
console.log("typeof undefined:", typeof undefined); // "undefined"

/**
 * 2. 🔹 When do you get `undefined`?
 * ----------------------------------
 */

console.log("\n--- When do you get undefined? ---");

// (a) Variable declared but not assigned
let x;
console.log("Declared but not assigned:", x); // undefined

// (b) Missing function return
function test() {
  // No return statement
}
console.log("Missing function return:", test()); // undefined

// (c) Accessing missing object properties
let obj = {};
console.log("Missing object property:", obj.key); // undefined

// (d) Array element not set (sparse array)
let arr = [1, , 3]; // This is a sparse array with a hole at index 1
console.log("Accessing an array hole:", arr[1]); // undefined

// (e) Function parameters not passed
function greet(name) {
  console.log("Missing function parameter:", name);
}
greet(); // undefined

/**
 * 3. 🔹 Difference between `undefined` and `null`
 * -----------------------------------------------
 *
 * | Feature   | `undefined`                               | `null`                                  |
 * | :-------- | :---------------------------------------- | :-------------------------------------- |
 * | Meaning   | A variable has been declared but not assigned a value. | A variable has been explicitly assigned "no value". |
 * | Type      | "undefined"                               | "object" (a famous quirk in JS)         |
 * | Set by    | JavaScript engine automatically           | Developer intentionally                 |
 *
 */

/**
 * 4. 🔹 Type Coercion with `undefined`
 * ------------------------------------
 */

console.log("\n--- Type Coercion with undefined ---");
console.log("Number(undefined):", Number(undefined)); // NaN
console.log("String(undefined):", String(undefined)); // "undefined"
console.log("Boolean(undefined):", Boolean(undefined)); // false

// Loose equality traps:
// There's a special rule in the `==` algorithm where `null` and `undefined` are loosely equal to each other.
console.log("undefined == null:", undefined == null); // true (special case)
console.log("undefined === null:", undefined === null); // false (different types)

/**
 * 5. 🔹 Best Practices
 * ---------------------
 * ✅ Use `===` when checking for `undefined` or `null` to avoid coercion surprises.
 * ✅ Prefer assigning `null` when you want to explicitly clear or reset a variable's value.
 * ❌ Don’t manually assign `undefined`. Let the engine use it to signal an uninitialized state.
 */

let user = null; // Good practice: explicitly clearing a value.

/**
 * 6. 🧩 Quick Exercise with Solution
 * ----------------------------------
 */

console.log("\n--- Quick Exercise with Solution ---");
let exerciseVar; // Declared but not assigned, so its value is `undefined`.

console.log("exerciseVar == null is", exerciseVar == null);
// ✅ Output: true
// Step-by-step: `exerciseVar` is `undefined`. The loose equality `==` has a special
// rule that `undefined == null` is true.

console.log("exerciseVar === null is", exerciseVar === null);
// ✅ Output: false
// Step-by-step: `exerciseVar` is `undefined`. Strict equality `===` checks type.
// `typeof undefined` is "undefined", `typeof null` is "object". Since the types
// are different, the result is false.

console.log("exerciseVar === undefined is", exerciseVar === undefined);
// ✅ Output: true
// Step-by-step: `exerciseVar` is `undefined`. The type and value match perfectly.

/**
 * 7. 🧩 Extra Brain-Benders (Interview-Style) with Solutions
 * ----------------------------------------------------------
 */

console.log("\n--- Extra Brain-Benders with Solutions ---");

// 1. Undefined in arrays (Holes vs. Explicit `undefined`)
let benderArr = [undefined, ,];
console.log("Bender 1.1 (arr.length):", benderArr.length); // 2
// The array has two slots, so its length is 2.

console.log("Bender 1.2 (arr[0]):", benderArr[0]); // undefined
// The value at index 0 was explicitly set to `undefined`.

console.log("Bender 1.3 (arr[1]):", benderArr[1]); // undefined
// Accessing a "hole" in a sparse array returns `undefined`.

// The key difference is whether the property exists:
console.log("Bender 1.4 (0 in arr):", 0 in benderArr); // true (index 0 exists)
console.log("Bender 1.5 (1 in arr):", 1 in benderArr); // false (index 1 is a hole, it doesn't exist)

// 2. JSON behavior
const jsonInput = { a: undefined, b: null };
console.log("Bender 2 (JSON.stringify):", JSON.stringify(jsonInput));
// ✅ Output: {"b":null}
// Step-by-step: `JSON.stringify` has a rule to completely omit object
// properties whose value is `undefined`. However, `null` is a valid JSON
// value and is preserved.

// 3. Global `undefined` quirk
console.log("Bender 3 (Global undefined):");
// In modern JavaScript (ES5 strict mode and later), `undefined` is a non-writable,
// non-configurable global property. Attempting to change it has no effect.

// In a non-strict, older environment, this would have worked:
// (function() {
//   var undefined = 123;
//   console.log(undefined); // Would log 123 in an ES3 engine.
// })();

// In modern JS:
var undefined = 123; // This assignment is ignored in strict mode or modern JS modules.
console.log("Value of `undefined` in modern JS:", undefined); // undefined

/**
 * ⚡ Interview Tip:
 * -----------------
 * Q: "Is `undefined` a keyword in JavaScript?"
 * A: "No, it's a global property of the global object. In modern JavaScript (ES5+),
 * it's configured as non-writable and non-configurable, making it effectively a
 * read-only constant. But in older, non-strict environments, it could be reassigned."
 */

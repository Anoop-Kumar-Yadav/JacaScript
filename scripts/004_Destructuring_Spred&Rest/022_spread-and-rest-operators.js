/**
 * @fileoverview A deep dive into the Spread (...) and Rest (...) operators,
 * covering their differences, use cases, hidden internals, performance, and
 * common interview questions.
 */

// =============================================================================
// 🌟 JavaScript Learning Path: Spread (...) & Rest (...) Operators
// =============================================================================
console.log("=============================================================================");
console.log("🌟 JavaScript Learning Path: Spread (...) & Rest (...) Operators");
console.log("=============================================================================");

// They look the same (...), but context decides their meaning.

// -----------------------------------------------------------------------------
// 1. Spread Operator (...) -> Expands values
// -----------------------------------------------------------------------------
console.log("\n--- 1. Spread Operator (Expands) ---");

// Example with Arrays: Expands elements into a new array.
const arr_s1 = [1, 2, 3];
const newArr_s1 = [0, ...arr_s1, 4];
console.log("Spreading an array [0, ...[1,2,3], 4]:", newArr_s1); // [0, 1, 2, 3, 4]

// Example with Strings: Expands a string into its characters.
console.log("Spreading a string [...'hello']:", [..."hello"]); // ['h', 'e', 'l', 'l', 'o']

// Example with Objects: Expands properties into a new object.
const obj1_s1 = { a: 1, b: 2 };
const obj2_s1 = { ...obj1_s1, c: 3 };
console.log("Spreading an object { ...{a:1, b:2}, c:3 }:", obj2_s1); // { a: 1, b: 2, c: 3 }

// -----------------------------------------------------------------------------
// 2. Rest Operator (...) -> Collects values
// -----------------------------------------------------------------------------
console.log("\n--- 2. Rest Operator (Collects) ---");

// Example in Functions: Packs all remaining arguments into an array.
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log("Rest in function sum(1, 2, 3, 4):", sum(1, 2, 3, 4)); // 10

// Example with Object Destructuring: Collects remaining properties.
const { a: a_s2, ...rest_s2 } = { a: 10, b: 20, c: 30 };
console.log("Rest in object destructuring:", rest_s2); // { b: 20, c: 30 }

// Example with Array Destructuring: Collects remaining elements.
const [first_s2, ...others_s2] = [10, 20, 30, 40];
console.log("Rest in array destructuring:", others_s2); // [20, 30, 40]

// -----------------------------------------------------------------------------
// 3. Key Difference (Golden Rule)
// -----------------------------------------------------------------------------
console.log("\n--- 3. Golden Rule ---");
console.log("✅ Spread = expands data (used in creation/calls).");
console.log("✅ Rest = collects data (used in destructuring/function params).");

// -----------------------------------------------------------------------------
// 4. Real-World Use Cases
// -----------------------------------------------------------------------------
console.log("\n--- 4. Real-World Use Cases ---");

// Merging arrays
const arr1_s4 = [1, 2], arr2_s4 = [3, 4];
const mergedArr_s4 = [...arr1_s4, ...arr2_s4];
console.log("Merging arrays:", mergedArr_s4);

// Copying objects (shallow copy)
const original_s4 = { x: 1, y: 2 };
const copy_s4 = { ...original_s4 };
console.log("Shallow copying an object:", copy_s4);

// Immutable updates
const user_s4 = { name: "Alice", age: 20 };
const updatedUser_s4 = { ...user_s4, age: 21 }; // Doesn't mutate original
console.log("Immutable update:", updatedUser_s4);

// -----------------------------------------------------------------------------
// 🛠 Hidden Internals of Spread & Rest
// -----------------------------------------------------------------------------
console.log("\n--- Hidden Internals & Performance ---");

// Spread creates a SHALLOW copy. Nested objects are references.
const nested_hi = [{ x: 1 }, { y: 2 }];
const copy_hi = [...nested_hi];
copy_hi[0].x = 99;
console.log("Spread is a shallow copy. Original was mutated:", nested_hi[0].x); // 99

// Performance: Spread is O(n) because it iterates over all elements.
// Avoid repeated spreading of large arrays inside loops.
console.log("Performance: Spread is O(n). Avoid in tight loops on large arrays.");

// -----------------------------------------------------------------------------
// ⚡ Advanced Corner Cases & Gotchas
// -----------------------------------------------------------------------------
console.log("\n--- Advanced Corner Cases & Gotchas ---");

// 1. Non-Iterable Spread
const notIterable_ac = { a: 1, b: 2 };
try {
  const fail_ac = [...notIterable_ac];
} catch (e) {
  console.log("Array spread on non-iterable object fails:", e.message);
}

// 2. Property Overwrites in Object Spread
const a_ac = { x: 1, y: 2 };
const b_ac = { y: 99, z: 100 };
const merged_ac = { ...a_ac, ...b_ac };
console.log("Rightmost spread wins on overwrite:", merged_ac); // { x: 1, y: 99, z: 100 }

// 3. Undefined & Null in Spread
console.log("Spreading null/undefined in an object is safe:", { ...null, ...undefined }); // {}
try {
  console.log([...null]);
} catch (e) {
  console.log("Spreading null in an array throws error:", e.message);
}

// 4. Spread in Function Calls
function add(a, b, c) { return a + b + c; }
const nums_ac = [1, 2, 3];
console.log("Spreading array into function arguments:", add(...nums_ac)); // 6

// 5. Rest must be last in destructuring
// const { ...details, id } = user; // ❌ SyntaxError
console.log("Gotcha: Rest element must be last in a destructuring pattern.");

// =============================================================================
// 🧠 Interview Brain-Benders
// =============================================================================
console.log("\n--- Interview Brain-Benders ---");

// --- Q1: Shallow Copy Mutation ---
console.log("\n--- Q1: Shallow Copy ---");
const obj1_bb = { a: 1, b: { c: 2 } };
const obj2_bb = { ...obj1_bb };
obj2_bb.b.c = 99;
console.log("What is obj1.b.c?", obj1_bb.b.c);
console.log("✅ Answer: 99. The nested object `b` was a reference, not a copy.");

// --- Q2: Spread vs. Flatten ---
console.log("\n--- Q2: Spread vs. Flatten ---");
const arr1_bb = [1, 2, 3];
const arr2_bb = [...arr1_bb, arr1_bb];
console.log("What is the output of [...arr1, arr1]?", arr2_bb);
console.log("✅ Answer: [1, 2, 3, [1, 2, 3]]. Spread doesn't flatten nested arrays.");

// --- Q3: Performance in a Loop ---
console.log("\n--- Q3: Performance in a Loop ---");
console.log("Why is this code bad for performance?");
console.log("`for (let i=0; i<N; i++) { arr = [...arr, i]; }`");
console.log("✅ Answer: It creates a new array copy on every iteration, making the total complexity O(n²).");
console.log("Better way is using `arr.push(i)`, which is an O(1) operation on average.");

let goodArr = [];
for (let i = 0; i < 10000; i++) {
  goodArr.push(i); // Efficient
}
console.log("Efficient loop finished with length:", goodArr.length);
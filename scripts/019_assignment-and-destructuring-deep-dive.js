/**
 * @fileoverview A deep dive into JavaScript's Assignment Operators and
 * Destructuring syntax, covering the internal evaluation process, reference vs.
 * value, and common interview brain-benders.
 */

// =============================================================================
// 🔥 JavaScript Learning Path: Assignment & Destructuring Deep Dive
// =============================================================================
console.log("=============================================================================");
console.log("🔥 JavaScript Learning Path: Assignment & Destructuring Deep Dive");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 🔍 Assignment in JavaScript = A Two-Phase Process
// -----------------------------------------------------------------------------
// When you write `a = b`, it's not a single action. The engine does this:
// 1. Evaluate RHS (Right-Hand Side): Get the actual value or reference from `b`.
// 2. Resolve LHS (Left-Hand Side): Find the memory location for `a`.
// 3. Assign: Copy the value/reference from RHS to the LHS location.
// This model explains many corner cases.

// --- Case 1: Assignment with Primitives ---
console.log("\n--- Case 1: Assignment with Primitives ---");
// Primitives (Number, String, Boolean, etc.) are assigned by value.
// A copy of the value is created.
let x_c1 = 5;
let y_c1 = x_c1; // y_c1 gets a copy of the value 5.
y_c1 = 10; // This only changes y_c1, not x_c1.
console.log("x_c1, y_c1 ->", x_c1, y_c1); // 5 10

// --- Case 2: Assignment with Objects (Reference!) ---
console.log("\n--- Case 2: Assignment with Objects ---");
// Objects (including arrays and functions) are assigned by reference.
// Both variables point to the *same* object in memory.
let obj1_c2 = { name: "JS" };
let obj2_c2 = obj1_c2; // obj2_c2 now points to the same object as obj1_c2.
obj2_c2.name = "ECMAScript"; // Mutating the object through one variable affects the other.
console.log("obj1_c2.name ->", obj1_c2.name); // ECMAScript

// --- Case 3: Assignment in Chains ---
console.log("\n--- Case 3: Chained Assignments ---");
// Assignment is right-to-left associative. `a = b = c = 10` is like `a = (b = (c = 10))`.
let a_c3, b_c3, c_c3;
a_c3 = b_c3 = c_c3 = 10;
console.log("a, b, c ->", a_c3, b_c3, c_c3); // 10 10 10

// --- Case 4: Assignment to Non-Writable ---
console.log("\n--- Case 4: Assignment to Non-Writable ---");
// You cannot assign a new value to a constant.
const PI_c4 = 3.14;
try {
  PI_c4 = 3.1415;
} catch (e) {
  console.log("Error assigning to const:", e.message); // TypeError
}

// --- Case 5: Destructuring Assignment ---
console.log("\n--- Case 5: Destructuring Assignment ---");
// A shorter syntax to unpack values from arrays or properties from objects.
let [x_c5, y_c5] = [10, 20];
let { name: name_c5, age: age_c5 } = { name: "Alice", age: 25 };
console.log("x, y, name, age ->", x_c5, y_c5, name_c5, age_c5); // 10 20 Alice 25

// --- Case 6: Assignment as an Expression ---
console.log("\n--- Case 6: Assignment as an Expression ---");
// The assignment operator `=` returns the value that was assigned.
let x_c6;
let y_c6 = (x_c6 = 5); // x_c6 is assigned 5, and the result (5) is assigned to y_c6.
console.log("x, y ->", x_c6, y_c6); // 5 5

// --- Case 7: Property vs Variable ---
console.log("\n--- Case 7: Property vs Variable ---");
// Assignment to an object property also returns the assigned value.
let obj_c7 = {};
let a_c7 = (obj_c7.prop = 100);
console.log("a, obj.prop ->", a_c7, obj_c7.prop); // 100 100

// -----------------------------------------------------------------------------
// ⚔️ Brain-Bender (Interview Trick)
// -----------------------------------------------------------------------------
console.log("\n--- Brain-Bender: Chained Assignment with Mutation ---");
let a_bb = { n: 1 };
let b_bb = a_bb; // `b_bb` and `a_bb` point to the same object { n: 1 }

// The tricky line:
// 1. The LHS reference `a_bb.x` is resolved first. At this point, `a_bb` points to the original object `{ n: 1 }`.
//    So, the engine knows it needs to set the `x` property on *that* object.
// 2. The RHS expression `a_bb = { n: 2 }` is evaluated.
//    - `a_bb` is reassigned to point to a new object `{ n: 2 }`.
//    - The result of this assignment expression is the new object, `{ n: 2 }`.
// 3. The engine completes the original assignment from step 1: it assigns the result from step 2 (`{ n: 2 }`)
//    to the property `x` of the object it identified in step 1. Since `b_bb` still points to that original
//    object, this is equivalent to `b_bb.x = { n: 2 }`.
a_bb.x = a_bb = { n: 2 };

console.log("a.x ->", a_bb.x); // `a_bb` is now the new object `{ n: 2 }`, which has no `x` property.
console.log("b.x ->", b_bb.x); // `b_bb` still points to the original object, which was mutated.

// =============================================================================
// 🔑 Deep Dive: Destructuring in JavaScript
// =============================================================================
console.log("\n=============================================================================");
console.log("🔑 Deep Dive: Destructuring in JavaScript");
console.log("=============================================================================");
// Destructuring is syntactic sugar to unpack values from arrays or objects.

// --- 1. Array Destructuring ---
console.log("\n--- 1. Array Destructuring ---");
const [a_d1, b_d1, c_d1] = [10, 20, 30];
console.log("a, b, c ->", a_d1, b_d1, c_d1); // 10 20 30
// Skipping values with commas
const [first_d1, , third_d1] = [100, 200, 300];
console.log("first, third ->", first_d1, third_d1); // 100 300

// --- 2. Object Destructuring ---
console.log("\n--- 2. Object Destructuring ---");
const user_d2 = { id: 1, name: "Alice", age: 25 };
const { id: id_d2, name: name_d2 } = user_d2;
console.log("id, name ->", id_d2, name_d2); // 1 Alice
// Renaming variables
const { name: username_d2 } = user_d2;
console.log("username ->", username_d2); // Alice

// --- 3. Default Values ---
console.log("\n--- 3. Default Values ---");
// Provides a fallback if the value is `undefined`.
const [a_d3 = 10, b_d3 = 20] = [5];
console.log("a, b ->", a_d3, b_d3); // 5 20
const { role: role_d3 = "guest" } = { name: "Alice" };
console.log("role ->", role_d3); // guest

// --- 4. Nested Destructuring ---
console.log("\n--- 4. Nested Destructuring ---");
const user_d4 = { id: 1, profile: { name: "Alice", address: { city: "Paris" } } };
const { profile: { address: { city: city_d4 } } } = user_d4;
console.log("city ->", city_d4); // Paris
// With defaults to prevent errors on missing properties
const { profile: { address: { city: city_d4_safe } = {} } = {} } = {};
console.log("Safe nested city ->", city_d4_safe); // undefined (no crash)

// --- 5. Rest Operator with Destructuring ---
console.log("\n--- 5. Rest Operator ---");
// Collects the remaining elements or properties.
const [first_d5, ...rest_d5] = [10, 20, 30, 40];
console.log("first, rest ->", first_d5, rest_d5); // 10 [ 20, 30, 40 ]
const { id: id_d5, ...details_d5 } = { id: 1, name: "Alice", age: 25 };
console.log("details ->", details_d5); // { name: 'Alice', age: 25 }

// --- 6. Function Parameter Destructuring ---
console.log("\n--- 6. Function Parameter Destructuring ---");
function printUser({ name, age }) {
  console.log(`User: ${name}, Age: ${age}`);
}
printUser({ name: "Alice", age: 25 });

// -----------------------------------------------------------------------------
// 🚀 Destructuring Brain-Benders
// -----------------------------------------------------------------------------
console.log("\n--- Destructuring Brain-Benders (for you to solve) ---");

// Q1: What will this log?
console.log("\nQ1:");
const [a_db1, b_db1 = a_db1] = [1];
console.log("  const [a, b = a] = [1]; ->", a_db1, b_db1);

// Q2: Predict output:
console.log("\nQ2:");
const { x: y_db2 = 10 } = { x: undefined };
console.log("  const { x: y = 10 } = { x: undefined }; ->", y_db2);

// Q3: Predict output:
console.log("\nQ3:");
try {
  const { a: a_db3, b: { c: c_db3 } } = { a: 1 };
  console.log("  const { a, b: { c } } = { a: 1 }; ->", c_db3);
} catch (e) {
  console.log("  Error in Q3:", e.message);
}

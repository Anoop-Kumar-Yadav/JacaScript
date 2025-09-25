
/**
 * =============================================================================
 * 🟢 JavaScript Learning Path: Step 1: Variables (The Real Basics)
 * =============================================================================
 *
 * This document provides a visual and structured explanation of how JavaScript
 * handles variables, focusing on the internal engine behavior.
 *
 *
 * 🧠 What is a variable?
 * -----------------------
 * A variable is a named storage location in memory. Think of it like a box
 * with a label: the box stores data, and the label is the variable name.
 *
 *
 * 🔎 How JS Creates Variables (Internally)
 * ----------------------------------------
 * The JavaScript Engine (e.g., V8 in Chrome/Node) processes code in two main steps:
 *
 * 1️⃣ Memory Creation Phase (also known as the Hoisting phase)
 *    - The engine scans the code and allocates memory for all variables and functions.
 *    - `var` variables: Memory is reserved and initialized with `undefined`.
 *    - `let`/`const` variables: Memory is reserved, but they are placed in a
 *      "Temporal Dead Zone" (TDZ). They exist but cannot be accessed.
 *    - `function` declarations: The entire function body is stored in memory.
 *
 * 2️⃣ Execution Phase
 *    - The engine runs the code line by line, executing statements and assigning
 *      values to the variables in memory.
 *
 *
 * 📊 Visual Representation
 * -------------------------
 * Consider this code:
 *
 *   console.log(a);
 *   // console.log(b); // This would throw an error
 *   // console.log(c); // This would throw an error
 *   var a = 10;
 *   let b = 20;
 *   const c = 30;
 *
 * ### Memory Creation Phase (before execution):
 * | Variable | Where is it? | Value now                 |
 * | :------- | :----------- | :------------------------ |
 * | `a` (var)  | In memory    | `undefined`               |
 * | `b` (let)  | In memory    | ❌ In Temporal Dead Zone  |
 * | `c` (const)| In memory    | ❌ In Temporal Dead Zone  |
 *
 * ### Execution Phase (line by line):
 * 1. `console.log(a);` -> Finds `a` in memory, prints its current value: `undefined`.
 * 2. `var a = 10;` -> Assigns the value `10` to `a`.
 * 3. `let b = 20;` -> Moves `b` out of the TDZ and assigns the value `20`.
 * 4. `const c = 30;` -> Moves `c` out of the TDZ and assigns the value `30`.
 *
 *
 * ⚖️ Comparison of `var`, `let`, `const`
 * --------------------------------------
 * | Feature     | `var`          | `let`             | `const`            |
 * | :---------- | :------------- | :---------------- | :----------------- |
 * | Scope       | Function       | Block             | Block              |
 * | Hoisting    | ✅ (`undefined`) | ✅ (TDZ)          | ✅ (TDZ)           |
 * | Re-declare  | ✅             | ❌                | ❌                 |
 * | Re-assign   | ✅             | ✅                | ❌                 |
 * | Best Use    | ❌ Avoid       | ✅ Temporary values | ✅ Fixed references|
 *
 */

console.log("--- Practice Exercises (Engine-Thinking) ---");

/**
 * ✅ Exercise 1: Hoisting Basics
 * -------------------------------
 * Hint: During memory creation, `a_ex1` is `undefined`, and `b_ex1` is in the TDZ.
 */
console.log("\n--- Exercise 1: Hoisting Basics ---");
console.log("Value of 'a_ex1' before declaration:", a_ex1); // undefined
var a_ex1 = 100;

try {
  console.log("Value of 'b_ex1' before declaration:", b_ex1);
} catch (e) {
  console.log("Error accessing 'b_ex1':", e.message); // ReferenceError
}
let b_ex1 = 200;

/**
 * ✅ Exercise 2: Re-declaration
 * ------------------------------
 * Hint: `var` allows re-declaration, but `let` does not.
 */
console.log("\n--- Exercise 2: Re-declaration ---");
var x_ex2 = 10;
var x_ex2 = 20;
console.log("Re-declaring 'var x_ex2':", x_ex2); // 20

// The following code block is commented out because it causes a SyntaxError,
// which would prevent the entire script from running.
/*
let y_ex2 = 10;
let y_ex2 = 20; // ❌ SyntaxError: Identifier 'y_ex2' has already been declared
console.log(y_ex2);
*/
console.log("Re-declaring 'let y_ex2' would cause a SyntaxError.");

/**
 * ✅ Exercise 3: Block Scope
 * ---------------------------
 * Hint: `var` ignores block scope, while `let` and `const` respect it.
 */
console.log("\n--- Exercise 3: Block Scope ---");
if (true) {
  var p_ex3 = 1;
  let q_ex3 = 2;
  const r_ex3 = 3;
}
console.log("Value of 'p_ex3' outside block:", p_ex3); // 1

try {
  console.log("Value of 'q_ex3' outside block:", q_ex3);
} catch (e) {
  console.log("Error accessing 'q_ex3':", e.message); // ReferenceError
}

try {
  console.log("Value of 'r_ex3' outside block:", r_ex3);
} catch (e) {
  console.log("Error accessing 'r_ex3':", e.message); // ReferenceError
}

/**
 * ✅ Exercise 4: Const Objects
 * -----------------------------
 * Hint: `const` prevents re-assignment of the variable, not mutation of the object's properties.
 */
console.log("\n--- Exercise 4: Const Objects ---");
const obj_ex4 = { lang: "JS" };
obj_ex4.lang = "Python"; // This is mutation, which is allowed.
console.log("Mutated const object:", obj_ex4); // { lang: "Python" }

try {
  obj_ex4 = { lang: "C++" }; // This is re-assignment, which is not allowed.
} catch (e) {
  console.log("Error re-assigning const object:", e.message); // TypeError
}

/**
 * 🎯 Interview-Level Tricky Questions
 * ------------------------------------
 */
console.log("\n--- Interview-Level Tricky Questions ---");

/**
 * ✅ Q1. Temporal Dead Zone (TDZ) Trap
 * -------------------------------------
 * Explanation: Inside the block `{}`, a new `x_q1` is declared with `let`. This
 * inner `x_q1` "shadows" the outer `x_q1`. When `console.log(x_q1)` is called inside
 * the block, it refers to the inner `x_q1`. However, the inner `x_q1` is still in its
 * Temporal Dead Zone (TDZ) because its declaration line (`let x_q1 = 20`) has not
 * been executed yet.
 */
console.log("\n--- Q1: TDZ Trap ---");
let x_q1 = 10;
{
  try {
    console.log("Accessing 'x_q1' inside block:", x_q1);
    let x_q1 = 20;
  } catch (e) {
    console.log("Error in TDZ trap:", e.message); // ReferenceError
  }
}

/**
 * ✅ Q2. Function Hoisting
 * -------------------------
 * Explanation:
 * - `function sayHello() {...}` is a function declaration. The entire function
 *   is hoisted during the memory creation phase, so it can be called before it appears.
 * - `var sayHi = function() {...}` is a function expression assigned to a `var`.
 *   Only the variable declaration `var sayHi` is hoisted and initialized to `undefined`.
 *   The function assignment happens during execution. Calling `sayHi()` before the
 *   assignment line results in a TypeError because `undefined` is not a function.
 */
console.log("\n--- Q2: Function Hoisting ---");
sayHello(); // Works

function sayHello() {
  console.log("sayHello() output: Hello!");
}

try {
  sayHi();
} catch (e) {
  console.log("sayHi() error:", e.message); // TypeError: sayHi is not a function
}
var sayHi = function() {
  console.log("Hi!");
};

/**
 * ✅ Q3. Weird `var` Behavior in Loops
 * -------------------------------------
 * Explanation: Because `var i` is function-scoped (or global), there is only ONE `i`
 * variable that is shared across all iterations of the loop. The `setTimeout`
 * callbacks are scheduled to run *after* the loop has completely finished. By the
 * time they execute (after ~1000ms), the loop is done and the value of the single `i`
 * variable is 3. Therefore, all three callbacks log the final value of `i`.
 *
 * The fix is to use `let`, which creates a new block-scoped `i` for each
 * iteration of the loop. Each callback then captures its own unique `i`.
 */
console.log("\n--- Q3: Weird `var` Behavior in Loops ---");
console.log("`var` in a loop will print 3, 3, 3 after 1 second:");
for (var i_q3 = 0; i_q3 < 3; i_q3++) {
  setTimeout(() => console.log("var i_q3:", i_q3), 1000);
}

console.log("\n`let` in a loop will print 0, 1, 2 after 1 second:");
for (let j_q3 = 0; j_q3 < 3; j_q3++) {
  setTimeout(() => console.log("let j_q3:", j_q3), 1100); // slightly later to not overlap logs
}


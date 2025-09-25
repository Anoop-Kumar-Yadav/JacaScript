
/**
 * =============================================================================
 * ⚡ JavaScript Learning Path: Round 2 — Practice Questions
 * =============================================================================
 *
 * This round includes trickier questions that mix var/let/const, block scope,
 * TDZ, hoisting, closures, and object mutability — exactly the kind of traps
 * interviewers love.
 *
 * Try to predict the output for each question before checking the solutions.
 */

console.log("--- Round 2 Practice Questions ---");

/**
 * 📝 Q1. Hoisting + Shadowing
 * ----------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q1: Hoisting + Shadowing ---");
var a_q1 = 5;
function test_q1() {
  console.log("Q1.1:", a_q1);
  var a_q1 = 10;
  console.log("Q1.2:", a_q1);
}
test_q1();

/**
 * 📝 Q2. Const & Reassignment
 * ----------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q2: Const & Reassignment ---");
const arr_q2 = [1, 2, 3];
arr_q2.push(4);
console.log("Q2.1:", arr_q2);
try {
  arr_q2 = [5, 6, 7];
  console.log("Q2.2:", arr_q2);
} catch (e) {
  console.log("Q2.2 Error:", e.message);
}

/**
 * 📝 Q3. TDZ Trick
 * -----------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q3: TDZ Trick ---");
{
  try {
    console.log("Q3:", x_q3);
    let x_q3 = 100;
  } catch (e) {
    console.log("Q3 Error:", e.message);
  }
}

/**
 * 📝 Q4. Global vs Block Scope
 * -----------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q4: Global vs Block Scope ---");
var x_q4 = 1;
let y_q4 = 2;
{
  var x_q4 = 10; // This re-declares and overwrites the same global/function-scoped `x_q4`
  let y_q4 = 20; // This is a new, block-scoped `y_q4` that shadows the outer one
  console.log("Q4.1 (inside block):", x_q4, y_q4);
}
console.log("Q4.2 (outside block):", x_q4, y_q4);

/**
 * 📝 Q5. Function Hoisting with Var
 * ----------------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q5: Function Hoisting with Var ---");
try {
  sayHi_q5();
} catch (e) {
  console.log("Q5 Error:", e.message);
}
var sayHi_q5 = function() {
  console.log("Hi!");
};

/**
 * 📝 Q6. Loop Trap Again
 * -----------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q6: Loop Trap Again (logs after ~100ms) ---");
for (var i_q6 = 0; i_q6 < 3; i_q6++) {
  setTimeout(() => console.log("Q6 var:", i_q6), 100);
}

// =============================================================================

/**
 * =============================================================================
 * ⚡ Round 2 (Extended) — With Brain-Benders
 * =============================================================================
 */
console.log("\n--- Brain-Benders ---");

/**
 * 📝 Q7. Function vs Var Hoisting Clash
 * --------------------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q7: Function vs Var Hoisting Clash ---");
console.log("Q7.1:", foo_q7);
function foo_q7() { return "I am a function"; }
var foo_q7 = "I am a variable";
console.log("Q7.2:", foo_q7);

/**
 * 📝 Q8. Closure + var/let
 * -------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q8: Closure + var/let (logs with delays) ---");
function counter_q8() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("Q8 var:", i), i * 100 + 200); // Added delay to separate from Q6
  }
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("Q8 let:", j), j * 100 + 200);
  }
}
counter_q8();

/**
 * 📝 Q9. TDZ + Function Parameter
 * -------------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q9: TDZ + Function Parameter ---");
function test_q9(x = y, y = 2) {
  console.log(x, y);
}
try {
  test_q9();
} catch (e) {
  console.log("Q9 Error:", e.message);
}

/**
 * 📝 Q10. const Object Mutability
 * -------------------------------
 */
// -----------------------------------------------------------------------------

console.log("\n--- Q10: const Object Mutability ---");
const obj_q10 = { name: "JS" };
obj_q10.name = "JavaScript";
console.log("Q10.1:", obj_q10);
Object.freeze(obj_q10);
obj_q10.name = "ECMAScript"; // This mutation will fail silently in non-strict mode
console.log("Q10.2:", obj_q10);

// =============================================================================

/**
 * =============================================================================
 * ✅ Solutions with Engine-Level Reasoning
 * =============================================================================
 */
console.log("\n--- Solutions with Engine-Level Reasoning ---");

/**
 * ✅ Q1 — Hoisting + Shadowing
 * -----------------------------
 * Output:
 *   Q1.1: undefined
 *   Q1.2: 10
 *
 * Reasoning:
 * 1. **Memory Phase (inside `test_q1`):** The declaration `var a_q1` is hoisted to the
 *    top of the function's scope and initialized with `undefined`. This inner `a_q1`
 *    shadows the outer `a_q1`.
 * 2. **Execution Phase:**
 *    - `console.log("Q1.1:", a_q1)` runs. It looks at the inner `a_q1`, which is currently `undefined`.
 *    - `var a_q1 = 10` executes, assigning `10` to the inner `a_q1`.
 *    - `console.log("Q1.2:", a_q1)` runs, printing the new value `10`.
 *
 * **Interview Note:** An inner `var` declaration shadows an outer variable for the
 * entire duration of the function scope, and it's hoisted as `undefined`.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q2 — const & Reassignment
 * -----------------------------
 * Output:
 *   Q2.1: [ 1, 2, 3, 4 ]
 *   Q2.2 Error: Assignment to constant variable.
 *
 * Reasoning:
 * 1. `const arr_q2` creates a constant *binding* to the array.
 * 2. `arr_q2.push(4)` is a *mutation* of the array's contents. This is allowed because
 *    the binding (the reference to the array in memory) does not change.
 * 3. `arr_q2 = [5, 6, 7]` is a *re-assignment*. It tries to change the binding to point
 *    to a new array. This is forbidden for `const` variables and throws a `TypeError`.
 *
 * **Interview Note:** `const` freezes the binding (the reference), not the value itself.
 * You can mutate objects and arrays declared with `const`.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q3 — TDZ Trick
 * ------------------
 * Output:
 *   Q3 Error: Cannot access 'x_q3' before initialization
 *
 * Reasoning:
 * 1. **Memory Phase:** Inside the block, `let x_q3` is hoisted, but it is placed in the
 *    Temporal Dead Zone (TDZ). It exists but is uninitialized and inaccessible.
 * 2. **Execution Phase:** `console.log("Q3:", x_q3)` attempts to access `x_q3`. Since
 *    it's still in the TDZ, a `ReferenceError` is thrown.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q4 — Global vs Block Scope
 * ------------------------------
 * Output:
 *   Q4.1 (inside block): 10 20
 *   Q4.2 (outside block): 10 2
 *
 * Reasoning:
 * 1. `var x_q4 = 10` inside the block refers to the *same* global/function-scoped `x_q4`
 *    declared outside. `var` does not respect block scope. So, the outer `x_q4` is
 *    reassigned to `10`.
 * 2. `let y_q4 = 20` inside the block creates a *new*, separate, block-scoped variable
 *    that shadows the outer `y_q4`. It only exists within the `{}`.
 * 3. Inside the block, we log the reassigned `x_q4` (10) and the inner `y_q4` (20).
 * 4. Outside the block, we log the same `x_q4` (which is now 10) and the original outer `y_q4` (2).
 *
 * **Interview Note:** `var` ignores block scope and can "leak" or overwrite variables,
 * while `let` is strictly block-scoped.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q5 — Function Hoisting with `var` (Expression)
 * --------------------------------------------------
 * Output:
 *   Q5 Error: sayHi_q5 is not a function
 *
 * Reasoning:
 * 1. **Memory Phase:** The declaration `var sayHi_q5` is hoisted and initialized with `undefined`.
 *    The function itself (the expression part) is not hoisted.
 * 2. **Execution Phase:** `sayHi_q5()` is called. At this moment, the value of `sayHi_q5` is
 *    `undefined`. Trying to invoke `undefined` as a function throws a `TypeError`.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q6 — Loop Trap (The Classic)
 * --------------------------------
 * Output (after ~100ms):
 *   Q6 var: 3
 *   Q6 var: 3
 *   Q6 var: 3
 *
 * Reasoning:
 * 1. The `var i_q6` is function-scoped, so there is only one `i_q6` variable shared by
 *    all loop iterations and the `setTimeout` callbacks.
 * 2. The loop runs to completion first. After it finishes, the value of `i_q6` is `3`.
 * 3. The `setTimeout` callbacks execute *after* the loop is done. When they finally run,
 *    they all reference the same `i_q6` variable, which holds the final value of `3`.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q7 — Function vs `var` Hoisting Clash
 * -----------------------------------------
 * Output:
 *   Q7.1: ƒ foo_q7() { return "I am a function"; }
 *   Q7.2: I am a variable
 *
 * Reasoning:
 * 1. **Memory Phase:** Both the function declaration `foo_q7` and the variable declaration
 *    `var foo_q7` are hoisted. Function declarations have higher precedence than `var`
 *    declarations. Therefore, `foo_q7` is initialized with the function body.
 * 2. **Execution Phase:**
 *    - The first `console.log` prints the value of `foo_q7`, which is the function.
 *    - The line `var foo_q7 = "I am a variable"` executes, re-assigning the `foo_q7`
 *      variable to the string value.
 *    - The second `console.log` prints the new string value.
 *
 * **Interview Note:** Function declarations are hoisted completely and take precedence over
 * `var` declarations during the memory creation phase.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q8 — Closure + `var`/`let`
 * ------------------------------
 * Output (with delays):
 *   Q8 var: 3
 *   Q8 let: 0
 *   Q8 var: 3
 *   Q8 let: 1
 *   Q8 var: 3
 *   Q8 let: 2
 *
 * Reasoning:
 * - **`var` loop:** As in Q6, all three `setTimeout` callbacks close over the *same* `i`
 *   variable. When they execute, `i` is `3`.
 * - **`let` loop:** A new block-scoped `j` is created for *each* iteration. The first
 *   callback captures `j=0`, the second captures `j=1`, and the third captures `j=2`.
 * - **Scheduling:** The timers are scheduled in order. The `i=0` and `j=0` timers are both
 *   set for ~0ms delay from when they are scheduled. They will likely fire in the order
 *   they were added to the event queue.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q9 — TDZ with Default Parameters
 * ------------------------------------
 * Output:
 *   Q9 Error: Cannot access 'y' before initialization
 *
 * Reasoning:
 * Function parameters have their own scope and are evaluated from left to right.
 * 1. The engine tries to determine the value for the first parameter, `x`.
 * 2. Its default value is `y`.
 * 3. At this moment, the engine is still in the process of initializing the parameters.
 *    The `y` parameter has been declared in the parameter scope but has not yet been
 *    initialized (its turn comes next). It is in its TDZ.
 * 4. Accessing `y` while it's in the TDZ throws a `ReferenceError`.
 *
 * **Interview Note:** Default parameters are not all initialized at once; they follow a
 * left-to-right evaluation order, and the TDZ applies within that scope.
 */

// -----------------------------------------------------------------------------

/**
 * ✅ Q10 — `const` object + `Object.freeze`
 * ------------------------------------------
 * Output:
 *   Q10.1: { name: 'JavaScript' }
 *   Q10.2: { name: 'JavaScript' }
 *
 * Reasoning:
 * 1. `obj_q10.name = "JavaScript"` is a valid mutation and works as expected.
 * 2. `Object.freeze(obj_q10)` makes the properties of the object non-writable and
 *    non-configurable. It "freezes" the object's current state.
 * 3. `obj_q10.name = "ECMAScript"` is an attempt to write to a non-writable property.
 *    - In non-strict mode (the default for most browser consoles and scripts), this
 *      assignment fails silently. The value does not change.
 *    - In strict mode (`'use strict';`), this would throw a `TypeError`.
 *
 * **Interview Note:** `Object.freeze()` provides shallow immutability. If the object
 * contained other nested objects, those nested objects would still be mutable.
 */

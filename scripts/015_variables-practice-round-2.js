
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
console.log("\n--- Q6: Loop Trap Again (logs after ~100ms) ---");
for (var i_q6 = 0; i_q6 < 3; i_q6++) {
  setTimeout(() => console.log("Q6 var:", i_q6), 100);
}

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
console.log("\n--- Q7: Function vs Var Hoisting Clash ---");
console.log("Q7.1:", foo_q7);
function foo_q7() { return "I am a function"; }
var foo_q7 = "I am a variable";
console.log("Q7.2:", foo_q7);

/**
 * 📝 Q8. Closure + var/let
 * -------------------------
 */
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
console.log("\n--- Q10: const Object Mutability ---");
const obj_q10 = { name: "JS" };
obj_q10.name = "JavaScript";
console.log("Q10.1:", obj_q10);
Object.freeze(obj_q10);
obj_q10.name = "ECMAScript"; // This mutation will fail silently in non-strict mode
console.log("Q10.2:", obj_q10);

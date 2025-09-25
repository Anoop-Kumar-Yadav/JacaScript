/**
 * @fileoverview A deep dive into conditional branching in JavaScript, covering
 * if/else, switch, ternary operators, and common pitfalls.
 */

// =============================================================================
// 🧩 JavaScript Learning Path: Conditional Branching
// =============================================================================
console.log("=============================================================================");
console.log("🧩 JavaScript Learning Path: Conditional Branching");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 1. What It Means
// -----------------------------------------------------------------------------
// Conditional branching means executing different code paths depending on
// conditions (true/false decisions).
//
// JavaScript supports several branching constructs:
// 1. `if / else if / else`
// 2. `switch`
// 3. Ternary Operator (`condition ? expr1 : expr2`)
// 4. Short-circuiting with `&&` and `||`

// -----------------------------------------------------------------------------
// 1. if / else (The Classic)
// -----------------------------------------------------------------------------
console.log("\n--- 1. if / else ---");
let age_s2 = 20;
if (age_s2 >= 18) {
  console.log("if (age >= 18) with age=20 ->", "Adult");
} else {
  console.log("if (age >= 18) with age=20 ->", "Minor");
}

// Internal behavior: The expression inside if() is coerced to a boolean.
// The 7 Falsy Values: false, 0, -0, 0n, "", null, undefined, NaN
// Everything else is truthy.
console.log("\nTruthy/Falsy coercion in `if`:");
if ("0") console.log("  if ('0') -> runs (non-empty string is truthy)");
if ([]) console.log("  if ([]) -> runs (empty array is an object, which is truthy)");
if (0) { /* does not run */ } else { console.log("  if (0) -> does not run (0 is falsy)"); }

// -----------------------------------------------------------------------------
// 2. else if
// -----------------------------------------------------------------------------
console.log("\n--- 2. else if ---");
// Evaluates sequentially top to bottom. First true branch executes.
let score_s3 = 85;
if (score_s3 >= 90) {
  console.log("Score 85 -> A");
} else if (score_s3 >= 75) {
  console.log("Score 85 -> B"); // This one runs
} else {
  console.log("Score 85 -> C");
}

// -----------------------------------------------------------------------------
// 3. Ternary Operator ? :
// -----------------------------------------------------------------------------
console.log("\n--- 3. Ternary Operator ---");
// A compact form of if/else that returns a value.
let age_s4 = 20;
let status_s4 = (age_s4 >= 18) ? "Adult" : "Minor";
console.log("Ternary for age 20 ->", status_s4); // Adult

// It's right-associative: a ? b : c ? d : e is parsed as a ? b : (c ? d : e)
let isAdmin = false;
let isUser = true;
let msg = isAdmin ? "Admin" : isUser ? "User" : "Guest";
console.log("Nested ternary:", msg); // User
console.log("  (Note: Deeply nested ternaries can harm readability.)");

// -----------------------------------------------------------------------------
// 4. switch
// -----------------------------------------------------------------------------
console.log("\n--- 4. switch ---");
// Uses strict equality (===) for comparisons.
let color_s5 = "red";
console.log("Switch for color 'red':");
switch (color_s5) {
  case "red":
    console.log("  - Stop");
    break;
  case "green":
    console.log("  - Go");
    break;
  default:
    console.log("  - Wait");
}

// Example of "fall-through" (when `break` is omitted)
let level = 2;
console.log("\nSwitch with fall-through:");
switch (level) {
  case 1:
    console.log("  - Level 1 access");
  case 2:
    console.log("  - Level 2 access"); // Starts here
  case 3:
    console.log("  - Level 3 access"); // Falls through to here
    break; // Stops here
}

// Example pitfall: strict equality
let x_s5 = "1";
console.log("\nSwitch uses strict equality (===):");
switch (x_s5) {
  case 1: console.log("  - number one"); break;
  case "1": console.log("  - string one"); break; // This one matches
}

// -----------------------------------------------------------------------------
// 5. Short-Circuit Branching ( && and || )
// -----------------------------------------------------------------------------
console.log("\n--- 5. Short-Circuit Branching ---");
// && returns the first falsy value or the last truthy value.
// Often used for conditional execution.
let loggedIn_s6 = true;
let username_s6 = loggedIn_s6 && "Alice";
console.log("`loggedIn && 'Alice'` ->", username_s6); // "Alice"

// || returns the first truthy value or the last falsy value.
// Often used for setting default values.
console.log("`null || 'default'` ->", null || "default"); // "default"

// -----------------------------------------------------------------------------
// 6. Common Pitfalls & Gotchas
// -----------------------------------------------------------------------------
console.log("\n--- 6. Common Pitfalls & Gotchas ---");

// 1. Falsy traps
console.log("\n1. Falsy traps: `if(0)` won't run, but `if('0')` will.");

// 2. switch fall-through (without `break`)
let n_p2 = 1;
console.log("\nSwitch fall-through example:");
switch (n_p2) {
  case 1: console.log("  - one"); // Starts here
  case 2: console.log("  - two"); // Falls through to here
  case 3: console.log("  - three"); // And here
    break;
  case 4: console.log("  - four");
}

// 3. Assignment vs. comparison
let a_p3 = 5;
if (a_p3 = 0) { // This is an assignment. The result of `a_p3 = 0` is 0, which is falsy.
  console.log("Oops, this will not run.");
}
console.log("Value of `a` after `if (a = 0)`:", a_p3); // 0

// 4. Nested ternary readability
let authStatus = isAdmin ? "Admin Access" : isUser ? "User Access" : "Guest Access";
console.log("\n4. Nested ternaries can be hard to read:", authStatus);

// =============================================================================
// 7. 🎯 Interview Traps
// =============================================================================
console.log("\n--- 7. Interview Traps ---");
console.log("Q: Difference between == and === in switch? -> A: `switch` always uses strict equality (`===`).");
console.log("Q: Why does if([]) execute? -> A: Because an empty array is an object, and all objects are truthy.");
console.log("Q: How to avoid switch fall-through? -> A: Use `break` or `return` in each case block.");
console.log("Q: Can you replace if/else with ternary everywhere? -> A: Not for complex statements. Ternary is an expression that returns a value, while `if` executes statements.");

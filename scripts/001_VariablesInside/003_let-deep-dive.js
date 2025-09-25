/**
 * @fileoverview A deep dive into the 'let' keyword in JavaScript.
 * This file explains its block-scoping, Temporal Dead Zone (TDZ), and
 * other features introduced in ES6 (2015).
 */

/**
 * =============================================================================
 * JavaScript Learning Path: Deep Dive into `let`
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `let` keyword,
 * the modern replacement for `var`. We will cover its history, core rules,
 * common quirks, interview questions, and internal behavior.
 *
 * -----------------------------------------------------------------------------
 * 🔎 let in JavaScript (Deep Dive)
 * -----------------------------------------------------------------------------
 *
 * 1. Background
 * --------------------
 * `let` was introduced in ECMAScript 2015 (ES6) to address the shortcomings of
 * `var`. It is the preferred way to declare variables whose values may change
 * (mutable variables). Its key features are block scope and the Temporal Dead
 * Zone (TDZ), which help write safer and more predictable code.
 *
 *
 * 2. Core Properties of `let`
 * --------------------
 *
 * a) Block-scoped
 *    Unlike `var`, `let` declarations are confined to the block (`{...}`) in
 *    which they are defined. This includes `if` statements, `for` loops, and
 *    standalone blocks.
 *
 *    @example
 *    if (true) {
 *      let x = 10;
 *      console.log(x); // 10
 *    }
 *    // console.log(x); // ❌ Uncaught ReferenceError: x is not defined
 *
 *
 * b) No Redeclaration (in the same scope)
 *    `let` prevents you from accidentally re-declaring the same variable in the
 *    same scope, which is a common source of bugs with `var`.
 *
 *    @example
 *    let a = 5;
 *    // let a = 10; // ❌ Uncaught SyntaxError: Identifier 'a' has already been declared
 *
 *
 * c) Reassignment is Allowed
 *    While you cannot re-declare a `let` variable, you can change (reassign)
 *    its value.
 *
 *    @example
 *    let score = 50;
 *    score = 100; // ✅ This is allowed.
 *    console.log(score); // 100
 *
 *
 * d) Not attached to the global object
 *    Globally declared `let` variables do not become properties of the `window`
 *    object in browsers. This prevents polluting the global namespace.
 *
 *    @example
 *    let globalName = "Anoop";
 *    // In a browser environment:
 *    // console.log(window.globalName); // undefined
 *
 *
 * e) Hoisted but in Temporal Dead Zone (TDZ)
 *    Like `var`, `let` declarations are hoisted (moved to the top of their scope
 *    by the JavaScript engine). However, they are not initialized. The period
 *    from the start of the block until the declaration is executed is the
 *    "Temporal Dead Zone" (TDZ). Accessing the variable in the TDZ results in a
 *    ReferenceError.
 *
 *    @example
 *    // console.log(x); // ❌ Uncaught ReferenceError: Cannot access 'x' before initialization
 *    let x = 5;
 *
 *
 * 3. ⚡ Common Pitfalls (Interview Traps)
 * --------------------
 *
 * a) TDZ Confusion
 *    The TDZ is a common point of confusion. It exists to prevent using a
 *    variable before it's declared, which is often a mistake.
 *
 *    @example
 *    {
 *      // Start of the TDZ for `a`
 *      // console.log(a); // ❌ ReferenceError
 *      // End of the TDZ for `a`
 *      let a = 20;
 *      console.log(a); // 20
 *    }
 *
 *
 * b) Loops with closures (The `var` problem, fixed!)
 *    `let` solves the classic loop problem because it creates a new binding
 *    for each iteration of the loop.
 *
 *    @example
 *    for (let i = 0; i < 3; i++) {
 *      // Each iteration has its own `i` in a new block scope.
 *      setTimeout(() => console.log(i), 1000);
 *    }
 *    // ✅ Output: 0, 1, 2
 *
 *
 * c) Block scope shadowing
 *    A variable declared with `let` in an inner scope can "shadow" (hide) a
 *    variable with the same name from an outer scope. This is valid and often
 *    useful, but important to be aware of.
 *
 *    @example
 *    let x = 1;
 *    {
 *      let x = 2; // This `x` is different from the outer `x`.
 *      console.log(x); // 2
 *    }
 *    console.log(x); // 1 (The outer `x` is unaffected).
 *
 *
 * 4. 🧠 Interview Brain-Benders (with Solutions)
 * --------------------
 *
 * Q1: What is the output?
 *    let a = 1;
 *    function test() {
 *      console.log(a); // ?
 *      let a = 2;
 *    }
 *    // test();
 *
 * Answer: ❌ ReferenceError
 * Explanation: The `let a` inside the function creates a new scope for `a`
 * within that function. The `console.log(a)` is inside the TDZ for the
 * function-scoped `a`, so it throws an error before it can look at the
 * outer-scoped `a`.
 *
 *
 * Q2: What is the output?
 *    let x = 10;
 *    if (true) {
 *      let x = 20;
 *      console.log(x); // ?
 *    }
 *    console.log(x); // ?
 *
 * Answer:
 * Inside block -> 20
 * Outside block -> 10
 * Explanation: The `let x = 20` inside the `if` block shadows the outer `x`.
 * The inner `console.log` sees the inner `x`. The outer `console.log` sees
 * the outer `x`.
 *
 *
 * Q3: What is the output?
 *    for (let i = 0; i < 3; i++) {
 *      setTimeout(() => console.log(i), 1000);
 *    }
 *
 * Answer: 0, 1, 2
 * Explanation: `let` creates a new block-scoped `i` for each loop iteration.
 * The closure created by `setTimeout` captures a different `i` each time.
 *
 *
 * 5. ⚙️ Hidden Internals
 * --------------------
 * During the compilation phase, the JavaScript engine processes `let`
 * declarations and registers them in the `LexicalEnvironment`. However, unlike
 * `var` (which is initialized to `undefined`), `let` variables remain in an
 * **uninitialized** state.
 *
 * Accessing an uninitialized variable is what triggers the TDZ ReferenceError.
 * The variable is only initialized when the `let` statement is executed during
 * the runtime phase. This mechanism prevents the bugs associated with `var`'s
 * hoisting behavior.
 *
 *
 * 6. 🔧 Real-World Best Practices
 * --------------------
 *
 * - **Use `const` by default**: Start by declaring all variables with `const`.
 *   Only change to `let` if you discover that you need to reassign the variable.
 *   This promotes immutability and makes code easier to reason about.
 *
 * - **Use `let` for mutable variables**: Use `let` for variables whose values
 *   are expected to change, such as loop counters or values that get updated
 *   based on application state.
 *
 * - **Avoid mixing `var` and `let`**: In modern code, avoid `var` entirely. If
 *   working in a legacy codebase, be extremely careful when mixing `var` with
 *   `let` and `const` in the same scope to avoid confusion with scoping rules.
 *
 *
 * 📌 Summary:
 * - `var`: Function-scoped, hoisted with `undefined`, can be re-declared, attaches to global object. (Avoid)
 * - `let`: Block-scoped, has a TDZ, cannot be re-declared in the same scope. (Use for mutable variables)
 *
 */


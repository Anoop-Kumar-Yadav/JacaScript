
















































/**
 * =============================================================================
 * JavaScript Learning Path: Deep Dive into `var`
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `var` keyword in
 * JavaScript, covering its history, internal mechanisms, common quirks,
 * performance optimizations, and typical interview questions.
 *
 * -----------------------------------------------------------------------------
 * 🔎 var in JavaScript (Deep Dive)
 * -----------------------------------------------------------------------------
 *
 * 1. Background
 * --------------------
 * `var` is the original way to declare variables in JavaScript, dating back to
 * its inception in 1995. While it still functions, modern JavaScript (ES6+)
 * favors `let` and `const` because `var` has certain characteristics that can
 * lead to subtle bugs. Understanding the differences between `var`, `let`, and
 * `const` is a common topic in technical interviews.
 *
 *
 * 2. Core Properties of `var`
 * --------------------
 *
 * a) Function-scoped (not block-scoped)
 *    Unlike `let` and `const`, which are scoped to the nearest enclosing block
 *    (e.g., `if` statements, `for` loops), `var` declarations are scoped to the
 *    enclosing function or the global scope if declared outside a function.
 *
 *    @example
 *    function testScope() {
 *      if (true) {
 *        var x = 10;
 *      }
 *      console.log(x); // Logs 10, because `var` "escapes" the if-block.
 *    }
 *    testScope();
 *
 *
 * b) Hoisting
 *    Variables declared with `var` are "hoisted" to the top of their scope
 *    (function or global) during the compilation phase. However, only the
 *    declaration is hoisted, not the initialization (the assignment). The
 *    variable exists but its value is `undefined` until the assignment line is
 *    executed.
 *
 *    @example
 *    console.log(a); // undefined (hoisted declaration, but not initialized)
 *    var a = 5;
 *    console.log(a); // 5
 *
 *    // The engine interprets the above as:
 *    var a; // Declaration is hoisted to the top.
 *    console.log(a); // Logs `undefined`.
 *    a = 5; // Assignment happens here.
 *    console.log(a); // Logs 5.
 *
 *
 * c) Can be re-declared
 *    You can re-declare the same variable using `var` within the same scope
 *    without any errors. This is not allowed with `let` or `const`.
 *
 *    @example
 *    var x = 1;
 *    var x = 2; // No error.
 *    console.log(x); // 2
 *
 *
 * d) Attaches to the global object
 *    When `var` is used in the global scope (outside any function), it creates
 *    a property on the global object (`window` in browsers, `global` in Node.js).
 *    `let` and `const` do not exhibit this behavior.
 *
 *    @example
 *    var globalName = "Anoop";
 *    // In a browser environment:
 *    console.log(window.globalName); // "Anoop"
 *
 *
 * e) Default value is `undefined`
 *    If a variable is declared with `var` but not initialized, it has a default
 *    value of `undefined`.
 *
 *    @example
 *    var y;
 *    console.log(y); // undefined
 *
 *
 * 3. ⚡ Common Pitfalls (Interview Traps)
 * --------------------
 *
 * a) Block leakage in loops
 *    Because `var` is function-scoped, when used in a loop, the same variable
 *    is used for every iteration. This is a classic problem with async
 *    operations inside loops.
 *
 *    @example <caption>Problem with var in loops</caption>
 *    for (var i = 0; i < 3; i++) {
 *      // The same `i` is shared across all timeout functions.
 *      // By the time they execute, the loop has finished and `i` is 3.
 *      setTimeout(() => console.log(i), 1000);
 *    }
 *    // Output: 3, 3, 3 (not 0, 1, 2)
 *
 *    @example <caption>Fix with let</caption>
 *    for (let i = 0; i < 3; i++) {
 *      // `let` creates a new `i` for each iteration.
 *      setTimeout(() => console.log(i), 1000);
 *    }
 *    // Output: 0, 1, 2
 *
 *
 * b) Redeclaration bugs
 *    The ability to re-declare variables can lead to accidentally overwriting
 *    a variable from an outer scope.
 *
 *    @example
 *    var score = 50;
 *    if (true) {
 *      var score = 100; // This re-declares and overwrites the same variable.
 *    }
 *    console.log(score); // 100 (The original value was unintentionally changed)
 *
 *
 * c) Hoisting confusion
 *    Hoisting can lead to unexpected behavior where a variable is read as
 *    `undefined` instead of throwing a ReferenceError, which might be what a
 *    developer expects.
 *
 *    @example
 *    console.log(msg); // undefined, not a ReferenceError
 *    var msg = "Hello";
 *
 *
 * 4. 🧠 Interview Brain-Benders (with Solutions)
 * --------------------
 *
 * Q1: What is the output?
 *    var a = 1;
 *    function test() {
 *      console.log(a);
 *      var a = 2;
 *    }
 *    test();
 *
 * Answer: `undefined`
 * Explanation: Inside `test()`, the declaration `var a` is hoisted to the top
 * of the function. This local `a` shadows the global `a`. When `console.log(a)`
 * is called, the local `a` has been declared but not yet assigned the value of 2,
 * so it is `undefined`.
 *
 *
 * Q2: What is the output?
 *    var x = 5;
 *    (function() {
 *      console.log(x); // ?
 *      var x = 10;
 *    })();
 *
 * Answer: `undefined`
 * Explanation: Same reasoning as Q1. The IIFE (Immediately Invoked Function
 * Expression) has its own scope. The `var x` inside it is hoisted to the top
 * of that function's scope, shadowing the global `x`.
 *
 *
 * Q3: What is the output?
 *    if (true) {
 *      var foo = "bar";
 *    }
 *    console.log(foo); // ?
 *
 * Answer: `"bar"`
 * Explanation: `var` is not block-scoped. The `foo` variable is declared in the
 * global scope (or the enclosing function's scope), so it is accessible
 * outside the `if` block.
 *
 *
 * 5. 🔧 Real-World Optimizations & Best Practices
 * --------------------
 *
 * - **Avoid `var`**: In modern JavaScript (ES6+), prefer `let` for variables
 *   that will be reassigned and `const` for variables that won't. This avoids
 *   all the pitfalls associated with `var`.
 *
 * - **If you must use `var`** (e.g., in legacy codebases):
 *   1. Declare all variables at the top of their function scope. This makes the
 *      hoisting behavior explicit and prevents confusion.
 *   2. Use IIFEs to create block-like scope and prevent variables from leaking.
 *
 *      @example (Using an IIFE for scope)
 *      (function() {
 *        var temp = "isolated";
 *        console.log(temp); // "isolated"
 *      })();
 *      // console.log(temp); // This would cause a ReferenceError, as `temp` is not defined here.
 *
 *
 * 6. ⚙️ Hidden Internals
 * --------------------
 *
 * During the compilation phase of JavaScript execution, the engine creates an
 * Execution Context. `var` declarations are registered in the
 * `VariableEnvironment` of this context.
 *
 * - **Compilation Phase**: The engine scans for function and variable declarations.
 *   All `var` declarations are found and a property is created for them in the
 *   scope, initialized with `undefined`.
 * - **Execution Phase**: The code is executed line by line. When an assignment
 *   to a `var` variable is encountered, its value is updated.
 *
 * This two-phase process is why `var` variables are hoisted and accessible as
 * `undefined` before their declaration line. It's also why they do not have a
 * "Temporal Dead Zone" (TDZ), unlike `let` and `const`, which cannot be
 * accessed before their declaration is executed.
 *
 */



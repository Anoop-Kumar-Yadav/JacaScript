
/**
 * =============================================================================
 * JavaScript Learning Path: Deep Dive into `const`
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `const` keyword,
 * the most common way to declare variables in modern JavaScript. We will cover
 * its rules, examples, common pitfalls, internal behavior, and interview traps.
 *
 * -----------------------------------------------------------------------------
 * 🔎 const in JavaScript (Deep Dive)
 * -----------------------------------------------------------------------------
 *
 * 1. Background
 * --------------------
 * `const` was introduced in ES6 (2015) alongside `let`. It is designed for
 * variables that should not be reassigned after their initial declaration.
 * Using `const` is a best practice as it encourages immutability, making code
 * safer and easier to understand.
 *
 *
 * 2. Core Rules of `const`
 * --------------------
 *
 * a) Must be Initialized at Declaration
 *    Unlike `var` or `let`, a `const` variable must be given a value when it is
 *    declared.
 *
 *    @example
 *    // const x; // ❌ Uncaught SyntaxError: Missing initializer in const declaration
 *    const y = 10; // ✅ This is required.
 *
 *
 * b) Block-scoped
 *    Just like `let`, `const` variables are scoped to the nearest enclosing
 *    block (`{...}`).
 *
 *    @example
 *    if (true) {
 *      const a = 5;
 *    }
 *    // console.log(a); // ❌ Uncaught ReferenceError: a is not defined
 *
 *
 * c) No Re-declaration
 *    You cannot re-declare a `const` variable in the same scope.
 *
 *    @example
 *    const a = 10;
 *    // const a = 20; // ❌ Uncaught SyntaxError: Identifier 'a' has already been declared
 *
 *
 * d) No Reassignment
 *    The core feature of `const` is that the variable's binding (reference)
 *    cannot be changed.
 *
 *    @example
 *    const PI = 3.14;
 *    // PI = 3.14159; // ❌ Uncaught TypeError: Assignment to constant variable.
 *
 *
 * e) Hoisted but in Temporal Dead Zone (TDZ)
 *    Like `let`, `const` declarations are hoisted but remain in the TDZ until
 *    the line of declaration is executed, preventing access before declaration.
 *
 *    @example
 *    // console.log(num); // ❌ Uncaught ReferenceError: Cannot access 'num' before initialization
 *    const num = 100;
 *
 *
 * 3. ⚠️ The Tricky Part — `const` Objects & Arrays
 * --------------------
 * A common point of confusion is that `const` does not make the *value*
 * immutable, only the *variable binding*. This means if the variable holds an
 * object or an array, the contents of that object or array can still be changed.
 *
 * a) Objects with `const`
 *    You can mutate the properties of an object declared with `const`, but you
 *    cannot reassign the variable to a new object.
 *
 *    @example
 *    const person = { name: "Anoop" };
 *    person.name = "Rahul"; // ✅ Allowed. We are mutating the object's property.
 *    console.log(person.name); // "Rahul"
 *
 *    // person = { name: "Vikas" }; // ❌ TypeError: Assignment to constant variable.
 *
 *
 * b) Arrays with `const`
 *    Similarly, you can add, remove, or change elements in an array declared
 *    with `const`.
 *
 *    @example
 *    const arr = [1, 2, 3];
 *    arr.push(4); // ✅ Allowed.
 *    console.log(arr); // [1, 2, 3, 4]
 *
 *    // arr = [5, 6]; // ❌ TypeError: Assignment to constant variable.
 *
 * 👉 To make an object's properties truly immutable, you can use `Object.freeze()`.
 *
 *
 * 4. 🧠 Interview Traps
 * --------------------
 *
 * Q1: What is the output?
 *    const a = 10;
 *    {
 *      const a = 20;
 *      console.log(a);
 *    }
 *    console.log(a);
 *
 * Answer:
 * Inside block -> 20
 * Outside block -> 10
 * Explanation: Block scope shadowing works the same for `const` as it does for `let`.
 * The inner `a` is a completely different variable from the outer `a`.
 *
 *
 * Q2: What is the output?
 *    const obj = { x: 1 };
 *    obj.x = 2;
 *    console.log(obj.x);
 *
 * Answer: 2
 * Explanation: This is a valid mutation. The `const` keyword prevents `obj` from
 * being reassigned to a new object, but it does not prevent the properties of
 * the existing object from being changed.
 *
 *
 * Q3: What happens here?
 *    const obj = { x: 1 };
 *    obj = { y: 2 };
 *
 * Answer: ❌ TypeError
 * Explanation: This is an attempt to reassign the `obj` variable, which is not
 * allowed for a constant.
 *
 *
 * 5. ⚙️ Internals
 * --------------------
 * The internal behavior of `const` is nearly identical to `let`. During the
 * compilation phase, it is registered in the `LexicalEnvironment` and enters
 * the TDZ. The only difference is that the engine flags its binding as
 * immutable, preventing any future reassignment.
 *
 *
 * 6. 🔧 Best Practices
 * --------------------
 *
 * - **Use `const` by default**: This is the cornerstone of modern JavaScript
 *   variable declaration. It signals that a variable's reference should not change,
 *   which makes code more predictable.
 *
 * - **Switch to `let` only when needed**: Only use `let` if you know a variable's
 *   value needs to be reassigned later (e.g., loop counters, state flags).
 *
 * - **Avoid `var`**: There is no reason to use `var` in modern ES6+ codebases.
 *
 * - **True Immutability**: If you need to ensure an object or array cannot be
 *   mutated, use `Object.freeze()` for shallow freezing or look into libraries
 *   like `Immutable.js` for deep, performant immutability.
 *
 *
 * 📌 Summary:
 * - `const` is block-scoped, has a TDZ, and must be initialized.
 * - It creates an immutable binding, not an immutable value.
 * - The reference cannot be changed, but the contents of objects/arrays can be.
 * - It is the default and recommended choice for declaring variables in modern JavaScript.
 *
 */


/**
 * @fileoverview A side-by-side comparison cheatsheet for `var`, `let`, and `const`.
 * This file covers scope, hoisting, reassignment, and other key differences
 * with examples and interview questions.
 */

/**
 * =============================================================================
 * ⚔️ var vs let vs const in JavaScript
 * =============================================================================
 *
 * This document serves as a complete cheatsheet and deep-dive comparison of
 * JavaScript's three variable declaration keywords.
 *
 *
 * 1. Scope
 * --------------------
 * Scope determines where a variable is accessible.
 *
 * | Feature    | `var`           | `let`         | `const`       |
 * | :--------- | :-------------- | :------------ | :------------ |
 * | Scope type | Function-scoped | Block-scoped  | Block-scoped  |
 *
 * @example <caption>var is function-scoped</caption>
 * if (true) {
 *   var x = 10;
 * }
 * console.log(x); // 10 ✅ (Accessible outside the block)
 *
 * @example <caption>let is block-scoped</caption>
 * if (true) {
 *   let y = 20;
 * }
 * // console.log(y); // ❌ ReferenceError: y is not defined
 *
 * @example <caption>const is block-scoped</caption>
 * if (true) {
 *   const z = 30;
 * }
 * // console.log(z); // ❌ ReferenceError: z is not defined
 *
 *
 * 2. Hoisting
 * --------------------
 * Hoisting is JavaScript's behavior of moving declarations to the top of their
 * scope before code execution.
 *
 * | Feature                        | `var`           | `let`         | `const`       |
 * | :----------------------------- | :-------------- | :------------ | :------------ |
 * | Hoisted?                       | ✅ Yes          | ✅ Yes        | ✅ Yes        |
 * | Initialized before declaration?| ✅ `undefined`  | ❌ No (TDZ)   | ❌ No (TDZ)   |
 *
 * TDZ = Temporal Dead Zone: The period where a variable is hoisted but not yet accessible.
 *
 * @example <caption>var is hoisted and initialized to undefined</caption>
 * console.log(a); // undefined
 * var a = 5;
 *
 * @example <caption>let is in the TDZ</caption>
 * // console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
 * let b = 5;
 *
 * @example <caption>const is in the TDZ</caption>
 * // console.log(c); // ❌ ReferenceError: Cannot access 'c' before initialization
 * const c = 5;
 *
 *
 * 3. Redeclaration & Reassignment
 * --------------------
 *
 * | Feature                  | `var`           | `let`         | `const`         |
 * | :----------------------- | :-------------- | :------------ | :-------------- |
 * | Redeclare in same scope? | ✅ Allowed      | ❌ Error      | ❌ Error        |
 * | Reassign value?          | ✅ Allowed      | ✅ Allowed     | ❌ Not allowed  |
 *
 * @example
 * var x = 1;
 * var x = 2; // ✅ Works
 *
 * let y = 1;
 * // let y = 2; // ❌ SyntaxError
 * y = 3; // ✅ Reassignment is fine
 *
 * const z = 1;
 * // const z = 2; // ❌ SyntaxError
 * // z = 3; // ❌ TypeError
 *
 *
 * 4. Global Object Binding
 * --------------------
 * In the global scope, `var` creates a property on the global object (`window`
 * in browsers), while `let` and `const` do not.
 *
 * | Feature                      | `var`           | `let`         | `const`       |
 * | :--------------------------- | :-------------- | :------------ | :------------ |
 * | Added to `window` (browser)? | ✅ Yes          | ❌ No          | ❌ No          |
 *
 * @example
 * var globalVar = "JS";
 * let globalLet = "JS";
 * const globalConst = "JS";
 *
 * // In a browser:
 * // console.log(window.globalVar);   // "JS"
 * // console.log(window.globalLet);   // undefined
 * // console.log(window.globalConst); // undefined
 *
 *
 * 5. Loop Behavior
 * --------------------
 * `let` and `const` create a new binding for each loop iteration, fixing a
 * common bug with `var` in closures.
 *
 * | Feature                      | `var`           | `let`         | `const`       |
 * | :--------------------------- | :-------------- | :------------ | :------------ |
 * | Same variable reused in loop?| ✅ Yes (buggy)  | ❌ No          | ❌ No          |
 *
 * @example <caption>var reuses the same variable</caption>
 * for (var i = 0; i < 3; i++) {
 *   setTimeout(() => console.log(i), 100); // Logs 3, three times
 * }
 *
 * @example <caption>let creates a new binding per iteration</caption>
 * for (let i = 0; i < 3; i++) {
 *   setTimeout(() => console.log(i), 100); // Logs 0, 1, 2
 * }
 *
 * @example <caption>const in a for-loop</caption>
 * // for (const i = 0; i < 3; i++) {
 * //   // This would throw a TypeError on the second iteration (i++)
 * //   // because `i` cannot be reassigned.
 * // }
 * // Note: `for...of` loops work fine with const: for (const item of [1,2,3])
 *
 *
 * 6. Objects & Arrays
 * --------------------
 * `const` only makes the variable binding constant, not the value itself.
 *
 * | Feature                      | `var`           | `let`         | `const`         |
 * | :--------------------------- | :-------------- | :------------ | :-------------- |
 * | Object/Array mutation?       | ✅ Allowed      | ✅ Allowed     | ✅ Allowed      |
 * | Reassignment of object/array?| ✅ Allowed      | ✅ Allowed     | ❌ Not allowed  |
 *
 * @example <caption>const allows mutation but not reassignment</caption>
 * const obj = { a: 1 };
 * obj.a = 2; // ✅ Allowed
 * // obj = { b: 3 }; // ❌ TypeError
 *
 *
 * 7. Interview Brain-Benders
 * --------------------
 *
 * Q1: `var` hoisting
 *    function testVar() { console.log(a); var a = 10; }
 *    // testVar();
 *    // ✅ Output: undefined. `var a` is hoisted and initialized as `undefined`.
 *
 * Q2: `let` TDZ
 *    function testLet() { console.log(b); let b = 20; }
 *    // testLet();
 *    // ❌ Output: ReferenceError. `b` is in the Temporal Dead Zone (TDZ).
 *
 * Q3: `const` object mutation
 *    const obj_q3 = { x: 1 };
 *    obj_q3.x = 2;
 *    // console.log(obj_q3.x);
 *    // ✅ Output: 2. The object's property is mutated, not the reference.
 *
 * Q4: `var` in a loop closure
 *    for (var i_q4 = 0; i_q4 < 2; i_q4++) {
 *      setTimeout(() => console.log(i_q4), 0);
 *    }
 *    // ✅ Output: 2, 2. The same `i_q4` variable (which is 2 after the loop) is captured.
 *
 * Q5: `let` in a loop closure
 *    for (let i_q5 = 0; i_q5 < 2; i_q5++) {
 *      setTimeout(() => console.log(i_q5), 0);
 *    }
 *    // ✅ Output: 0, 1. A new `i_q5` is created for each iteration.
 *
 *
 * 8. Best Practices & Final Rule of Thumb
 * --------------------
 *
 * ### Best Practices:
 * - ✅ **Use `const` by default.** This makes your code more predictable by
 *   preventing accidental reassignments.
 * - ✅ **Use `let` only if the variable's value must change.**
 * - ❌ **Avoid `var`** in all modern JavaScript code to prevent scope and
 *   hoisting issues.
 * - ✅ For true immutability of objects, use `Object.freeze(obj)` for a shallow
 *   freeze or libraries like `Immutable.js` for deep immutability.
 *
 * ### Final Rule of Thumb:
 * - `var`:   Old, function-scoped, buggy. **Avoid.**
 * - `let`:   Modern, block-scoped, for **mutable** values.
 * - `const`: Modern, block-scoped, for **immutable** bindings. **Default choice.**
 *
 */

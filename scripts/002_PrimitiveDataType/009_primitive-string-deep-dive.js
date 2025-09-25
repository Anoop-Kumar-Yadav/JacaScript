/**
 * @fileoverview A deep dive into the 'String' primitive in JavaScript.
 * This file covers its definition, immutability, Unicode representation,
 * common methods, and interview traps with runnable examples.
 */

/**
 * =============================================================================
 * 🔹 JavaScript Learning Path: Primitive 3: String
 * =============================================================================
 *
 * This document provides a comprehensive exploration of the `String` type. While
 * it seems simple, its handling of character encodings, immutability, and
 * hidden engine optimizations makes it a rich and sometimes tricky primitive.
 *
 *
 * ✅ What is a String?
 * --------------------
 * A string is a sequence of characters used to represent textual data. In
 * JavaScript, strings can be created using:
 * - Single quotes: 'hello'
 * - Double quotes: "hello"
 * - Backticks (Template Literals, ES6+): `hello`
 */

console.log("--- String Definition ---");
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello ${str2}`; // Template literals allow for interpolation.
console.log("Single quotes:", str1);
console.log("Double quotes:", str2);
console.log("Template literal:", str3);

/**
 * ⚙️ Internal Representation & The `.length` Quirk
 * -------------------------------------------------
 * JavaScript strings are stored as a sequence of UTF-16 code units. Each code
 * unit is 16 bits.
 *
 * Most common characters (like those in English) fit into a single 16-bit unit.
 * However, some characters (like many emojis or symbols from non-Latin scripts)
 * require TWO 16-bit units to be represented. This pair is called a "surrogate pair".
 *
 * ⚠️ Interview Trap: A string's `.length` property counts the number of UTF-16
 * code units, NOT the number of visible characters.
 */

console.log('\n--- Internal Representation & .length ---');
console.log('"JavaScript".length:', "JavaScript".length); // 10 characters, 10 code units
console.log('"😀".length:', "😀".length); // 1 visible character, but 2 code units!

/**
 * 🌟 Key Properties
 * --------------------
 */

console.log('\n--- Key Properties ---');

// 1. Immutability
// Strings cannot be changed in place. Any operation that seems to modify a
// string actually creates and returns a new one.
let s = "hello";
s[0] = "H"; // This attempt to modify fails silently.
console.log("Attempting to modify 'hello' to 'Hello':", s); // "hello" (unchanged)

// 2. Indexed Access
// You can access individual characters (code units) by their index.
let word = "JS";
console.log("word[0]:", word[0]); // "J"
console.log("word.charAt(1):", word.charAt(1)); // "S"

/**
 * 🔧 Common Operations
 * --------------------
 * All these operations return a NEW string.
 */

console.log('\n--- Common Operations ---');
let msg = "JavaScript";
console.log(`Original message: "${msg}"`);
console.log("msg.slice(0, 4):", msg.slice(0, 4)); // "Java"
console.log('msg.replace("Java", "Type"):', msg.replace("Java", "Type")); // "TypeScript"
console.log("msg.toUpperCase():", msg.toUpperCase()); // "JAVASCRIPT"
console.log('Concatenation with +:', "Hello" + " " + "World"); // "Hello World"
console.log('Concatenation with template literal:', `Hello ${"World"}`); // "Hello World"

/**
 * ⚡ Performance & Memory
 * --------------------
 * Because strings are immutable, repeatedly concatenating with `+=` inside a
 * large loop can be inefficient, as it creates many intermediate strings.
 * For performance-critical code, using an array and `join()` is often better.
 *
 * @example <caption>Inefficient concatenation in a loop</caption>
 * // let slowStr = "";
 * // for (let i = 0; i < 100000; i++) { slowStr += i; } // Creates many strings
 *
 * @example <caption>More efficient approach</caption>
 * // let arr = [];
 * // for (let i = 0; i < 100000; i++) { arr.push(i); }
 * // const result = arr.join(''); // Creates one final string
 */

/**
 * ⚠️ Tricky Cases & Unicode Deep Dive
 * ------------------------------------
 */

console.log('\n--- Tricky Cases & Unicode Deep Dive ---');

// 1. Unicode Quirks & Surrogate Pairs
// As seen before, characters outside the "Basic Multilingual Plane" (BMP) are
// stored as two code units (a surrogate pair).
console.log('"💖".length:', "💖".length); // 2

// The correct way to count *visible characters* is to iterate over the string's
// code points, which the spread syntax (...) and Array.from() do automatically.
console.log('[..."💖"].length:', [..."💖"].length); // 1
console.log('Array.from("💖").length:', Array.from("💖").length); // 1
console.log('[..."😀👍"].length:', [..."😀👍"].length); // 2

// Splitting by an empty string also operates on code units, not characters.
console.log('"💖".split("").length:', "💖".split("").length); // 2

// Accessing by index can break multi-unit characters.
console.log('"💖"[0]:', "💖"[0]); // Returns the high surrogate, a meaningless symbol
console.log('"💖"[1]:', "💖"[1]); // Returns the low surrogate

// 2. String Comparisons
// Strings are compared lexicographically based on their UTF-16 code unit values.
// Uppercase letters have lower values than lowercase letters.
console.log('"Z" > "a" is', "Z" > "a"); // false (code unit for 'Z' is 90, 'a' is 97)

// 3. Falsy String
// The only falsy string is the empty string. All other strings are truthy.
console.log('Boolean("") is', Boolean("")); // false
console.log('Boolean(" ") is', Boolean(" ")); // true (a string with a space is not empty)
console.log('Boolean("false") is', Boolean("false")); // true

/**
 * 🧩 Mini-Exercises with Solutions
 * --------------------
 */

console.log("\n--- Mini-Exercises with Solutions ---");

// Q1: What will this print?
console.log('Q1: "hello".toUpperCase()[1] ->', "hello".toUpperCase()[1]);
// ✅ Output: "E"
// Step-by-step:
// 1. "hello".toUpperCase() returns a new string: "HELLO".
// 2. [1] accesses the character at index 1 of "HELLO", which is "E".

// Q2: What is the output?
console.log('Q2.1: "💖".length ->', "💖".length);
console.log('Q2.2: [..."💖"].length ->', [..."💖"].length);
// ✅ Output: 2, then 1
// Step-by-step:
// 1. .length counts UTF-16 code units. The "💖" emoji is a surrogate pair, consisting of two code units. So, the length is 2.
// 2. The spread syntax `...` iterates over Unicode code points (visible characters). It sees "💖" as a single character. The resulting array has one element, so its length is 1.

// Q3: Predict the output:
console.log('Q3.1: "2" + 2 ->', "2" + 2);
console.log('Q3.2: "2" - 2 ->', "2" - 2);
// ✅ Output: "22", then 0
// Step-by-step:
// 1. The `+` operator performs string concatenation if either operand is a string. So, the number `2` is converted to the string `"2"`, and `"2" + "2"` results in `"22"`.
// 2. The `-` operator is exclusively for numeric subtraction. It coerces the string `"2"` into the number `2`. The operation becomes `2 - 2`, which results in `0`.

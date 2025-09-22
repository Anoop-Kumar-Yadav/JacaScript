/**
 * @fileoverview A deep dive into Bitwise Operators in JavaScript, focusing on
 * real-world optimizations, performance tricks, and interview-level brain-benders.
 */

// =============================================================================
// ⚡ JavaScript Learning Path: Bitwise Operator Optimizations
// =============================================================================
console.log("=============================================================================");
console.log("⚡ JavaScript Learning Path: Bitwise Operator Optimizations");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 🔹 1. ~~ (Double Bitwise NOT) → Fast Math.floor() (for positives)
// -----------------------------------------------------------------------------
console.log("\n--- 1. Double NOT (~~) for Fast Truncation ---");
// Why it works: The first NOT `~` inverts all bits and converts the float to a
// 32-bit integer, effectively truncating the decimal. The second `~` inverts
// the bits back, resulting in the final truncated integer.
console.log("~~4.9 ->", ~~4.9); // 4

// ⚠️ Caveat: For negative numbers, it truncates towards zero, unlike Math.floor().
console.log("~~-4.9 ->", ~~-4.9); // -4
console.log("Math.floor(-4.9) ->", Math.floor(-4.9)); // -5

// -----------------------------------------------------------------------------
// 🔹 2. num & 1 → Even/Odd Check
// -----------------------------------------------------------------------------
console.log("\n--- 2. Bitwise AND (& 1) for Even/Odd Check ---");
// Why it works: The binary representation of any odd number ends in 1, and any
// even number ends in 0. The `& 1` operation (a "bitmask") isolates this last
// bit. If the result is 1, the number is odd; if 0, it's even. This is often
// faster than `num % 2 === 0`.
console.log("5 & 1 (is 1, so odd) ->", 5 & 1); // 1
console.log("8 & 1 (is 0, so even) ->", 8 & 1); // 0
console.log(5 & 1 ? "odd" : "even"); // "odd"
console.log(8 & 1 ? "odd" : "even"); // "even"

// -----------------------------------------------------------------------------
// 🔹 3. XOR Swap Trick (Swap without Temp Variable)
// -----------------------------------------------------------------------------
console.log("\n--- 3. XOR (^) Swap Trick ---");
// Why it works: The XOR operator has the property that `(x ^ y) ^ y = x`. By
// applying it three times in a specific sequence, the values of `a` and `b`
// are swapped without needing a temporary variable. This is more of a classic
// computer science puzzle than a practical JS optimization today.
let a = 5; // binary 101
let b = 3; // binary 011
a = a ^ b; // a is now 6 (110)
b = a ^ b; // b is now 5 (110 ^ 011 = 101)
a = a ^ b; // a is now 3 (110 ^ 101 = 011)
console.log("a, b after XOR swap:", a, b); // 3 5

// -----------------------------------------------------------------------------
// 🔹 4. Force to 32-bit Integer using | 0
// -----------------------------------------------------------------------------
console.log("\n--- 4. Bitwise OR (| 0) to Truncate to Integer ---");
// Why it works: The bitwise OR operator `|` forces its operands to be treated
// as 32-bit integers. OR-ing with 0 has no effect on the integer bits but
// effectively truncates any decimal part. It behaves like Math.trunc().
console.log("3.7 | 0 ->", 3.7 | 0);   // 3
console.log("-3.7 | 0 ->", -3.7 | 0); // -3

// -----------------------------------------------------------------------------
// 🔹 5. Bit Masking (Extract specific bits)
// -----------------------------------------------------------------------------
console.log("\n--- 5. Bit Masking with AND (&) ---");
// Why it works: A "mask" is a binary number with specific bits set to 1.
// Using the AND `&` operator with a mask effectively zeroes out any bits that
// are not set in the mask, allowing you to extract or check for specific bits.
let permissions = 0b1011; // 11 in decimal
let READ_PERMISSION = 0b0100; // 4
console.log("Has read permission?", (permissions & READ_PERMISSION) > 0); // true

let mask = 0b1111; // A mask to keep the last 4 bits
console.log("123 & mask (binary 1111011 & 00001111) ->", 123 & mask); // 11 (binary 1011)

// -----------------------------------------------------------------------------
// 🔹 6. Fast Power of Two Multiplication/Division
// -----------------------------------------------------------------------------
console.log("\n--- 6. Bitwise Shifts (<<, >>) for Fast Math ---");
// Why it works: Shifting bits to the left is equivalent to multiplying by 2 for
// each position shifted. Shifting to the right is equivalent to dividing by 2.
// This is much faster than standard multiplication/division.
console.log("5 << 1 (5 * 2^1) ->", 5 << 1);   // 10
console.log("5 << 3 (5 * 2^3) ->", 5 << 3);   // 40
console.log("20 >> 1 (20 / 2^1) ->", 20 >> 1);  // 10
console.log("20 >> 2 (20 / 2^2) ->", 20 >> 2);  // 5

// -----------------------------------------------------------------------------
// 🔹 7. Convert Negative Numbers to Unsigned (>>>)
// -----------------------------------------------------------------------------
console.log("\n--- 7. Unsigned Right Shift (>>>) ---");
// Why it works: The standard right shift `>>` is "sign-propagating" (it fills
// new bits with the sign bit). The unsigned right shift `>>>` always fills
// new bits with 0, effectively treating the number as an unsigned 32-bit integer.
console.log("-5 >> 0 ->", -5 >> 0);     // -5 (sign is preserved)
console.log("-5 >>> 0 ->", -5 >>> 0); // 4294967291 (interpreted as a large positive unsigned integer)

// =============================================================================
// 🎯 Quick Summary of Use Cases
// =============================================================================
/*
| Trick        | Use Case                | Notes                                       |
| :----------- | :---------------------- | :------------------------------------------ |
| `~~x`        | Fast truncation         | Beware negative numbers (differs from `Math.floor`) |
| `x & 1`      | Even/Odd check          | Faster than modulo                          |
| `a^=b^=a^=b` | Memory swap trick       | Interview use, not production               |
| `x | 0`      | Truncate to int         | Similar to `Math.trunc()`                   |
| `& mask`     | Extract bits            | Used in graphics/flags                      |
| `<<`, `>>`   | Multiply/div by 2^k     | Fastest, but only for ints                  |
| `>>>`        | Unsigned conversion     | Useful in binary ops                        |
*/

// =============================================================================
// 🧠 Interview Brain-Bender
// =============================================================================
/*
 * ❓ Imagine you want to floor a negative decimal properly using bitwise operators
 * (so -3.7 becomes -4).
 *
 * How can you modify the `~~` or `|0` trick to achieve that?
 */
console.log("\n--- Brain-Bender ---");
console.log("How can you properly floor -3.7 to -4 using bitwise operators?");


/**
 * =============================================================================
 * 🟣 JavaScript Learning Path: Primitive 7: Symbol
 * =============================================================================
 *
 * This document provides an in-depth exploration of the `Symbol` primitive,
 * explaining why it exists, how it works internally, and its important edge cases.
 *
 *
 * 1. 🔹 Why did we need `Symbol`?
 * ---------------------------------
 * Before ES6, object properties could only be strings. This created a risk of
 * "key collisions," where different libraries or parts of an application might
 * accidentally overwrite each other's properties on a shared object.
 *
 * @example <caption>The Problem: Key Collisions</caption>
 * const user = { id: 1, name: "Alice" };
 * // Library A adds a property
 * user.id = "lib-a-identifier";
 * // Library B, unaware of Library A, overwrites it
 * user.id = 42; // 💥 Collision! Library A's data is lost.
 *
 * `Symbol` solves this by creating guaranteed-unique values that can be used as
 * object keys.
 */

console.log("--- The Uniqueness of Symbol ---");
const a = Symbol("id");
const b = Symbol("id");
console.log("Symbol('id') === Symbol('id') is", a === b); // false ✅
// Even with the same description, they are unique internal values.

/**
 * 2. 🔹 Creating Symbols
 * -----------------------
 * A symbol is created by calling the `Symbol()` function. The string passed to it
 * is an optional description used only for debugging.
 */

console.log("\n--- Creating Symbols ---");
const sym = Symbol("optional description");
console.log("A new symbol:", sym);

/**
 * 3. 🔹 Symbols as Object Keys
 * ------------------------------
 * Symbols are primarily used as non-enumerable ("hidden") object keys.
 */

console.log("\n--- Symbols as Object Keys ---");
const idKey = Symbol("id");
const userWithSymbol = {
  name: "Alice",
  [idKey]: 123, // Using a symbol as a computed property key
};

console.log("User object with symbol key:", userWithSymbol);

// Symbol keys are ignored by most standard enumeration methods:
console.log("Object.keys(userWithSymbol):", Object.keys(userWithSymbol)); // ["name"]
console.log("for...in loop:");
for (let key in userWithSymbol) {
  console.log("  -", key); // logs only "name"
}
console.log("JSON.stringify(userWithSymbol):", JSON.stringify(userWithSymbol)); // {"name":"Alice"}

// To access symbol keys, you must use specific methods:
console.log("Object.getOwnPropertySymbols(userWithSymbol):", Object.getOwnPropertySymbols(userWithSymbol));

// You can access the value directly if you have a reference to the symbol:
console.log("Accessing value via symbol:", userWithSymbol[idKey]); // 123

/**
 * 4. 🔹 Global Symbol Registry
 * ------------------------------
 * If you need to create a shared symbol that can be accessed across different
 * files or parts of an application, use the global symbol registry.
 *
 * - `Symbol.for(key)`: Checks the registry for a symbol with the given key. If it
 *   exists, it returns it. Otherwise, it creates a new symbol, adds it to the
 *   registry, and returns it.
 * - `Symbol.keyFor(symbol)`: Retrieves the key for a registered symbol.
 */

console.log("\n--- Global Symbol Registry ---");
const s1 = Symbol.for("app.id");
const s2 = Symbol.for("app.id");
console.log("Symbol.for('app.id') === Symbol.for('app.id') is", s1 === s2); // true ✅
console.log("Symbol.keyFor(s1):", Symbol.keyFor(s1)); // "app.id"

/**
 * 5. 🔹 Well-Known Symbols (Meta Programming)
 * --------------------------------------------
 * JavaScript has built-in symbols that allow you to hook into and override the
 * default behavior of objects.
 */

console.log("\n--- Well-Known Symbols ---");

// a) Symbol.iterator — The "How to Loop Me" Hook
// The Problem: By default, you cannot use a `for...of` loop on a plain object.
// The `for...of` loop needs to know *how* to iterate.
// How it Works: The loop looks for a method on the object named `[Symbol.iterator]`.
// This method must return an "iterator" object, which has a `next()` method.
// The `next()` method is called repeatedly to get each value.
const range = {
  from: 1, 
  to: 3,
  // By adding this method with a computed property name, we make the object "iterable".
  [Symbol.iterator]() {   
    let current = this.from;
    const last = this.to;

    // This method must return an iterator object.
    return {
      // The iterator object must have a `next()` method. `for...of` calls this.
      next: () => ({
        // `value` is the next item in the sequence.
        value: current <= last ? current++ : undefined,
        // `done` is a boolean that tells the loop when to stop.
        done: current > last,
      }),
    };
  },
};
console.log("Custom iterator with for...of:");
// Now this works, because our object has provided the instructions.
for (let n of range) {
  console.log("  -", n); // 1, 2, 3
}

// b) Symbol.toPrimitive — The "How to Convert Me" Hook
// The Problem: By default, using an object in a math or string context results
// in "[object Object]", which is not useful.
// How it Works: When JavaScript needs to convert an object to a primitive, it
// looks for a method named `[Symbol.toPrimitive]`. It passes a "hint" to this
// method: "string", "number", or "default".
const money = {
  value: 1000,
  // This method gets called by the engine during type coercion.
  [Symbol.toPrimitive](hint) {
    console.log(`   (hint: ${hint})`);
    // We can return different values based on the context.
    return hint === "string" ? `$${this.value}` : this.value;
  },
};
console.log("Custom coercion with Symbol.toPrimitive:");
console.log("  String context:", String(money)); // "$1000"
console.log("  Number context:", +money); // 1000
console.log("  Default context (addition):", money + 500); // 1500 (hint is "default", falls back to number)

// c) Symbol.hasInstance — The "What is an Instance of Me?" Hook
// The Problem: The `instanceof` operator normally checks an object's prototype
// chain. This is rigid.
// How it Works: When you write `value instanceof MyClass`, the engine looks for a
// *static* method on `MyClass` named `[Symbol.hasInstance]`. If found, it calls
// that method with `value` and uses its boolean result, ignoring prototypes.
class Even {
  // This static method hijacks the `instanceof` operator for this class.
  static [Symbol.hasInstance](n) {
    // Our custom logic: is `n` an even number?
    return typeof n === "number" && n % 2 === 0;
  }
}
console.log("Custom `instanceof` with Symbol.hasInstance:");
console.log("  2 instanceof Even:", 2 instanceof Even); // true
console.log("  3 instanceof Even:", 3 instanceof Even); // false

/**
 * 6. 🔹 Edge Cases
 * ------------------
 */

console.log("\n--- Edge Cases ---");

// ❌ No constructor: `Symbol` is a factory function, not a class.
try {
  new Symbol("id");
} catch (e) {
  console.log("`new Symbol()` throws error:", e.message);
}

// ❌ Cannot be implicitly converted to a string for concatenation.
try {
  "User ID: " + Symbol("id");
} catch (e) {
  console.log("Implicit string concatenation throws error:", e.message);
}
// ✅ Must be converted manually.
console.log("Explicit conversion works:", "User ID: " + Symbol("id").toString());

/**
 * 7. 🔹 Interview Corner Cases & Recap
 * -------------------------------------
 *
 * Q1: Why not just use `_privateKey` instead of a Symbol?
 * A: A string key like `_privateKey` is just a convention. It's still enumerable
 *    and can be accidentally overwritten. A `Symbol` is truly unique and hidden
 *    from normal iteration, preventing accidental clashes.
 *
 * Q2: Difference between `Symbol("id")` and `Symbol.for("id")`?
 * A: `Symbol("id")` creates a new, unique symbol every time. `Symbol.for("id")`
 *    checks a global registry and reuses an existing symbol if one with that
 *    key is found, otherwise it creates a new one.
 *
 * Q3: Can Symbols be used as `WeakMap` keys?
 * A: Yes. Both objects and symbols can be keys in a `WeakMap`.
 *
 * ✅ Final Recap:
 * - `Symbol` is a unique, immutable primitive type.
 * - Its main use is for non-string object property keys to avoid name collisions.
 * - Symbol properties are hidden from `for...in`, `Object.keys`, and `JSON.stringify`.
 * - `Symbol.for()` creates shareable symbols via a global registry.
 * - Well-known symbols (`Symbol.iterator`, etc.) allow for powerful meta-programming.
 */

/**
 * 8. 🧩 Exercises with Solutions
 * -------------------------------
 */

console.log("\n--- Exercises with Solutions ---");

// Exercise 1: Object with string and symbol keys
console.log("\nExercise 1: Iterating over mixed keys");
const nameKey = "name";
const idKeyEx1 = Symbol("id");
const secretKey = Symbol("secret");
const userEx1 = {
  [nameKey]: "Alice",
  age: 25,
  [idKeyEx1]: 12345,
  [secretKey]: "hidden-data",
};

console.log("  Object.keys:", Object.keys(userEx1));
console.log("  for...in loop keys:");
for (let key in userEx1) console.log(`    - ${key}`);
console.log("  Object.getOwnPropertySymbols:", Object.getOwnPropertySymbols(userEx1));
console.log("  Reflect.ownKeys (shows all):", Reflect.ownKeys(userEx1));

// Exercise 2: Custom class with well-known symbols
console.log("\nExercise 2: Customizing a class with symbols");
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  // Define custom type conversion behavior
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return `Balance: $${this.balance}`;
    if (hint === "number") return this.balance;
    return `Account(${this.balance})`; // default
  }
  // Define a custom tag for Object.prototype.toString
  get [Symbol.toStringTag]() {
    return "BankAccount";
  }
}

const acc = new BankAccount(1500);
console.log("  String(acc):", String(acc));
console.log("  +acc:", +acc);
console.log("  acc + 500:", acc + 500);
console.log("  Object.prototype.toString.call(acc):", Object.prototype.toString.call(acc));

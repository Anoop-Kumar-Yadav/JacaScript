
// =============================================================================
// 🔥 JavaScript Learning Path: Logical Operators Deep Dive
// =============================================================================
console.log("=============================================================================");
console.log("🔥 JavaScript Learning Path: Logical Operators Deep Dive");
console.log("=============================================================================");

// -----------------------------------------------------------------------------
// 🧠 Logical Operators in JS
// -----------------------------------------------------------------------------
// Unlike in many other languages, JS logical operators don't always return a
// boolean. They return one of the actual operand values.

// --- 1. OR ( || ) ---
// Evaluates operands from left to right and returns the *first truthy* value.
// If all values are falsy, it returns the *last falsy* value.
console.log("\n--- 1. OR ( || ) Operator ---");
console.log('"hello" || "world" ->', "hello" || "world"); // "hello"
console.log('"" || "fallback" ->', "" || "fallback"); // "fallback"
console.log("0 || null || 'ok' ->", 0 || null || "ok"); // "ok"
console.log("0 || null || undefined ->", 0 || null || undefined); // undefined (the last falsy value)

// --- 2. AND ( && ) ---
// Evaluates operands from left to right and returns the *first falsy* value.
// If all values are truthy, it returns the *last truthy* value.
console.log("\n--- 2. AND ( && ) Operator ---");
console.log('"hello" && "world" ->', "hello" && "world"); // "world"
console.log("0 && 'ignored' ->", 0 && "ignored"); // 0
console.log("42 && true && 'ok' ->", 42 && true && "ok"); // "ok"

// --- 3. NOT ( ! ) ---
// Converts its operand to a boolean and then inverts it. Always returns a boolean.
console.log("\n--- 3. NOT ( ! ) Operator ---");
console.log("!0 ->", !0); // true
console.log('!"" ->', !""); // true
console.log("!42 ->", !42); // false
// Double negation (!!) is a common trick to coerce any value to its boolean equivalent.
console.log('!!"hello" ->', !!"hello"); // true
console.log("!!0 ->", !!0); // false

// --- 4. Short-Circuiting ---
// Both `&&` and `||` stop evaluating as soon as the result is determined.
console.log("\n--- 4. Short-Circuiting ---");
function expensiveOperation() {
  console.log("   (Expensive operation was called!)");
  return true;
}
console.log("true || expensiveOperation(): The second part is never evaluated.");
true || expensiveOperation();
console.log("false && expensiveOperation(): The second part is never evaluated.");
false && expensiveOperation();

// -----------------------------------------------------------------------------
// 🚀 Brain-Benders (Round 1) with Solutions
// -----------------------------------------------------------------------------
console.log("\n--- Brain-Benders (Round 1) with Solutions ---");

// Q1: console.log("foo" || "bar" && "baz");
console.log('Q1: "foo" || "bar" && "baz" ->', "foo" || ("bar" && "baz"));
// ✅ Answer: "foo"
// Reasoning: `&&` has higher precedence than `||`.
// 1. `"bar" && "baz"` is evaluated first. Both are truthy, so it returns the last one: `"baz"`.
// 2. The expression becomes `"foo" || "baz"`.
// 3. `||` returns the first truthy value, which is `"foo"`.

// Q2: console.log(0 || (false && "hello"));
console.log("Q2: 0 || (false && 'hello') ->", 0 || (false && "hello"));
// ✅ Answer: false
// Reasoning:
// 1. The parentheses are evaluated first: `false && "hello"`.
// 2. `&&` finds the first falsy value, which is `false`.
// 3. The expression becomes `0 || false`.
// 4. `||` finds the first truthy value. Since both are falsy, it returns the last one: `false`.

// Q3: console.log(null && "ignored" || "fallback");
console.log("Q3: null && 'ignored' || 'fallback' ->", (null && "ignored") || "fallback");
// ✅ Answer: "fallback"
// Reasoning: `&&` has higher precedence.
// 1. `null && "ignored"` is evaluated. `null` is falsy, so it returns `null`.
// 2. The expression becomes `null || "fallback"`.
// 3. `||` finds the first truthy value. `null` is falsy, so it returns `"fallback"`.

// Q4: console.log(!!"false" == !!"true");
console.log('Q4: !!"false" == !!"true" ->', !!"false" == !!"true");
// ✅ Answer: true
// Reasoning:
// 1. `"false"` is a non-empty string, which is truthy. `!!"false"` becomes `true`.
// 2. `"true"` is also a non-empty string, which is truthy. `!!"true"` becomes `true`.
// 3. The comparison is `true == true`, which is `true`.

// Q5: a() || b();
console.log("Q5: a() || b()");
let a_q5 = () => console.log("   (A was called)"); // returns undefined
let b_q5 = () => console.log("   (B was called)"); // returns undefined
a_q5() || b_q5();
// ✅ Console Output: (A was called), then (B was called)
// ✅ Final Result Value: undefined
// Reasoning:
// 1. `a_q5()` is executed. It logs "(A was called)" and returns `undefined`.
// 2. Since `undefined` is a falsy value, the `||` operator must evaluate the right side.
// 3. `b_q5()` is executed. It logs "(B was called)" and returns `undefined`.
// 4. The final result of the expression is the value of the last evaluated part, which is `undefined`.

// =============================================================================
// ⚡ Advanced Corner Cases with Logical Operators
// =============================================================================
console.log("\n--- Advanced Corner Cases ---");

// --- Case 1: `||` vs `??` (Nullish Coalescing Operator) ---
console.log("\n--- Case 1: || vs ?? ---");
// `||` treats any falsy value (0, "", false) as "empty".
console.log("0 || 'default' ->", 0 || "default"); // "default"
// `??` ONLY treats `null` and `undefined` as "empty".
console.log("0 ?? 'default' ->", 0 ?? "default"); // 0 (safer for defaults when 0 is a valid value)

// --- Case 2: Function calls inside short-circuit ---
console.log("\n--- Case 2: Short-circuiting function calls ---");
function log(x) {
  console.log(`   (log function called with: ${x})`);
  return x;
}
console.log("Result of log(0) && log(1):", log(0) && log(1)); // Only logs 0
console.log("Result of log(1) || log(2):", log(1) || log(2)); // Only logs 1

// --- Case 3: Double Negation + Type Confusion ---
console.log("\n--- Case 3: Truthiness of empty objects/arrays ---");
console.log("!![] ->", !![]);     // true
console.log("!!{} ->", !!{});     // true
console.log('!!"0" ->', !!"0");   // true
console.log("!!0 ->", !!0);       // false

// --- Case 4: Operator Precedence Trap (&& > ||) ---
console.log("\n--- Case 4: Precedence Trap ---");
console.log("true || false && false ->", true || (false && false)); // true

// --- Case 5: Assignment inside Logical Expression ---
console.log("\n--- Case 5: Assignment in Expression ---");
let x_case5;
console.log("Result of (x = 0) || (x = 5):", (x_case5 = 0) || (x_case5 = 5)); // 5
console.log("Final value of x:", x_case5); // 5

// --- Case 6: Mixing `||` and `??` ---
console.log("\n--- Case 6: Mixing || and ?? ---");
try {
  // This is a SyntaxError because `||` and `??` cannot be mixed without parentheses.
  // eval('null || undefined ?? "fallback"');
  console.log("`null || undefined ?? 'fallback'` would throw a SyntaxError.");
} catch (e) {
  console.log("Error from mixing || and ??:", e.message);
}
console.log("Correct way with parentheses: null || (undefined ?? 'fallback') ->", null || (undefined ?? 'fallback')); // "fallback"

// --- Case 7: Arrays and Strings in Logical Ops ---
console.log("\n--- Case 7: Arrays and Strings ---");
console.log('[] && "hello" ->', [] && "hello"); // "hello" (since [] is truthy)
console.log('"" || [] ->', "" || []); // [] (since "" is falsy)

// =============================================================================
// 🧠 Final Brain-Benders with Solutions
// =============================================================================
console.log("\n--- Final Brain-Benders with Solutions ---");

// Q1: console.log(false || {} && []);
console.log("Q1: false || {} && [] ->", false || ({} && []));
// ✅ Answer: []
// Reasoning: `&&` has higher precedence. `{}` is truthy, so `{} && []` evaluates to the last operand, `[]`.
// The expression becomes `false || []`. `false` is falsy, so it returns `[]`.

// Q2: console.log(null ?? false || 0);
console.log("Q2: null ?? false || 0 ->", null ?? (false || 0));
// ✅ Answer: 0
// Reasoning: `||` has higher precedence than `??`.
// 1. `false || 0` is evaluated first. `false` is falsy, so it returns `0`.
// 2. The expression becomes `null ?? 0`.
// 3. `??` checks if the left side is `null` or `undefined`. It is, so it returns the right side, `0`.

// Q3: let y; console.log(y ?? (y = 10) && 20);
let y_q3;
console.log("Q3: y ?? (y = 10) && 20 ->", y_q3 ?? ((y_q3 = 10) && 20));
console.log("   (Final value of y is:", y_q3, ")");
// ✅ Answer: 20
// Reasoning: `&&` has higher precedence than `??`.
// 1. The initial value of `y_q3` is `undefined`.
// 2. The `??` operator checks `y_q3`. Since it's `undefined`, it must evaluate the right-hand side.
// 3. The right side is `(y_q3 = 10) && 20`.
// 4. The assignment `y_q3 = 10` happens, and the result of the assignment is `10`, which is truthy.
// 5. Since the left of `&&` is truthy, it evaluates the right side, `20`. The result of the `&&` expression is `20`.
// 6. The result of the `??` expression is therefore `20`. After this line, `y_q3` is `10`.

// Q4: console.log(([] || 0) && "done");
console.log("Q4: ([] || 0) && 'done' ->", ([] || 0) && "done");
// ✅ Answer: "done"
// Reasoning:
// 1. `[] || 0` is evaluated. `[]` is truthy, so it returns `[]`.
// 2. The expression becomes `[] && "done"`.
// 3. `[]` is truthy, so `&&` returns the last operand, `"done"`.

// Q5: console.log("" && "yes" || "no");
console.log("Q5: '' && 'yes' || 'no' ->", ("" && "yes") || "no");
// ✅ Answer: "no"
// Reasoning: `&&` has higher precedence.
// 1. `"" && "yes"` is evaluated. `""` is falsy, so it returns `""`.
// 2. The expression becomes `"" || "no"`.
// 3. `""` is falsy, so `||` returns the other operand, `"no"`.


"use strict"; // This enables strict mode which helps catch common coding errors

var firstName = "Anoop";

// lastName = "Yadav"; // This will throw an error in strict mode

// Using a variable
console.log(firstName);

// change the value of the variable
firstName = "Anil"; 
console.log(firstName);

// Rules for naming variables
// 1. Cannot start with a number
// var 1name = "Anoop"; // This will throw an error 
var name1 = "Anoop"; // This is valid

// 2. Cannot use reserved keywords
// var var = "Anoop"; // This will throw an error
var myVar = "Anoop"; // This is valid

// 3. Cannot contain spaces or hyphens
// var my-name = "Anoop"; // This will throw an error
var my_name = "Anoop"; // This is valid
var myName = "Anoop"; // This is also valid (camelCase)

// 4. Case sensitive
var myname = "Anoop";
console.log(myName); // "Anoop"
console.log(myname); // "Anoop" - different variable

// 5. Should be meaningful
var a = "Anoop"; // Not meaningful
var userFirstName = "Anoop"; // Meaningful

// 6. Cannot be a reserved keyword
// var function = "Anoop"; // This will throw an error
var myFunction = "Anoop"; // This is valid

// 7. Use camelCase for multi-word variables
var userFirstName = "Anoop"; // This is valid
var user_first_name = "Anoop"; // This is also valid but not preferred in JS    
var UserFirstName = "Anoop"; // This is valid but not preferred for variables (used for classes)

// 8. Avoid using single character variable names
var x = 10; // Not meaningful
var userAge = 10; // Meaningful 

// 9. Avoid using underscores at the beginning or end
// var _userName = "Anoop"; // Not preferred
// var userName_ = "Anoop"; // Not preferred
var userName = "Anoop"; // Preferred
console.log(userName);

// 10. Avoid using dollar signs unless necessary
// var $userName = "Anoop"; // Not preferred
var userName2 = "Anoop"; // Preferred
console.log(userName2);

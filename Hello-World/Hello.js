// const math = require("./math");

// console.log("Math Value is " + math.subFn(2, 4));

const fs = require("fs");

//Blocking function
const result = fs.readFileSync("Exolorer.txt", "utf-8");
console.log(result);

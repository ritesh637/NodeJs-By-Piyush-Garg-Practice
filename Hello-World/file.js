// const fs = require("fs");
//  Synchronous access
// fs.writeFileSync("./Test.txt", "Hey Ritesh");

//  ASync access
// fs.writeFile("./Test.txt", "Hey Ritesh asynchronously",(errored) => {});

//  const result =  fs.readFileSync("./Exolorer.txt", "utf-8");
// console.log(result);

// fs.readFile("./Exolorer.txt", "utf-8", (err, result) => {
//         if (err) {
//             console.log("Error",err);
//         } else{
//             console.log(result);
//         }
//     });

// FOR UPDETE PREVIOUS NOTE
// fs.appendFileSync("./Exolorer.txt", '${Date.now ()} Hey Ritesh\n');

// copy data from another directory
// fs.cpSync("./Test.txt", "./copy.text");

// // for delete in
// fs.unlinkSync("./copy.text");

// //for file status  seen will used this function
// console.log(fs.statSync("./Test.txt").isFile());

//Blocking function
// console.log("1");

// const result = fs.readFileSync("Exolorer.txt", "utf-8");
// console.log(result);

// console.log("2");
// console.log("3");
// console.log("4");

// // Non Blocking...
// console.log("1");
// fs.readFile("Exolorer.txt", "utf-8", (err, result) => {
//   console.log(result);
// });

// console.log("2");
// console.log("3");
// console.log("4");
// console.log("5");

////// default thread Pool Size = 4
////// max? - 8core cpu-8

// const fs = require("fs");
// const os = require("os");
// console.log(os.cpus().length);

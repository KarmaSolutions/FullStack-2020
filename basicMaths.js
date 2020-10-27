console.log(process.argv);

const a = parseInt(process.argv[2]);
const b = parseInt(process.argv[3]);

console.log("---------------------------")
console.log("RESULTS");
console.log("---------------------------")
console.log("Sum: " + (a+b));
console.log("Difference: " + (Math.abs(a-b)));
console.log("Fraction: " + (a/b));
console.log("Product: " + (a*b));
console.log("Average: " + ((a+b)/2))

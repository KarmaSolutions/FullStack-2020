console.log(process.argv);

const a = parseInt(process.argv[2]);
const b = parseInt(process.argv[3]);
const c = process.argv[4];

if (a > b) {
    console.log("a is bigger than b.");
} else if (a < b) {
    console.log("b is bigger than a.")
} else if (a === b && c === "hello world") {
    console.log("Yay, you guessed the password!")
} else {
    console.log("a and b are equal.")
}
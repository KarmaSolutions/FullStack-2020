console.log(process.argv);

const n = parseInt(process.argv[2]);
let factorial = n;

for(let i = n-1; i > 0; i--) {
    factorial = factorial * i;
}

console.log(n + "! = " + factorial);
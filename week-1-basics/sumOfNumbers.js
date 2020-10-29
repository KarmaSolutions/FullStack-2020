console.log(process.argv);

const n = parseInt(process.argv[2]);

if(isNaN(n)) {
    console.log("please enter a number");
}

let sum = 0;
for (let i = 1; i <= n; i++){
    sum += i;
}
console.log("Sum of numbers from 1 to "+n+" = " + sum +".");
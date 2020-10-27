console.log(process.argv);

const n = parseInt(process.argv[2]);

console.log("The numbers that are multiples of 3 and 5 are: ")
for (let i = 1; i <= n; i++){
    if (i%3 === 0 || i%5 === 0){
        console.log(i);
    }
}
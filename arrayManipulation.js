const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

const divisibleByThree = arr.filter(number => number%3 === 0);
console.log("Numbers divisible by three: " + divisibleByThree);

const multipliedByTwo = arr.map(number => number*2);
console.log("All numbers multiplied by two: " + multipliedByTwo);

const sumOfNumbers = arr.reduce((accumulator, currentNumber) => accumulator + currentNumber);
console.log("The sum of all numbers: " + sumOfNumbers);
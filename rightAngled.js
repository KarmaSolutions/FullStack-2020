console.log(process.argv);

const n = process.argv[2];
let triangleLine = "";

for (let i = 1; i <= n; i++){
    for(let j = 0; j < i; j++){
        triangleLine += "&";
    }
    console.log(triangleLine);
    triangleLine = "";
}
// Tuples (fixed length + known types)
let point: [number, number] = [10, 20];
let rgba: [number, number, number, number] = [255, 0, 0, 0.5];
console.log(point, rgba);
// [ 10, 20 ] [ 255, 0, 0, 0.5 ]
type TPerson = [string, number]; // [name, age]
let bob: TPerson = ["Bob", 25];
let carol: TPerson = ["Carol", 30];
console.log(bob, carol);
function inchesToCentimeters(inches:number) {
    return inches * 2.54;
}
console.log(inchesToCentimeters(10));

const multiply = (a: number, b: number): number => a * b; // Arrow function with type annotations
console.log(multiply(5, 8));

// Function without return value are declared with a return type of void
function logMessage(): void {
    let  date = new Date();
    console.log(date);
}

//functions over arrays
function sumArray(numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0);
}
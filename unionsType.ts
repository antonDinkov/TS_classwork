function padLeft(value:string | number, padChar: string, length: number): string {
    let stringValue = value.toString();
    while (stringValue.length < length) {
        stringValue = padChar + stringValue;
    }
    return stringValue;
}

console.log(padLeft("X2", "0", 7)); // "00000X2"
console.log(padLeft(12.5, " ", 7)); // "   12.5"
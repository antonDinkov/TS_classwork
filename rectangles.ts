interface Rectangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
// calculate area of a rectangle
function calculateArea(rect: Rectangle): number {
    const width = rect.x2 - rect.x1;
    const height = rect.y2 - rect.y1;
    return width * height;
}

//sort array of rectangles by their area
function sortRectanglesByArea(rects: Rectangle[]): Rectangle[] {
    return rects.sort((a, b) => calculateArea(a) - calculateArea(b));
}

const rectangles: Rectangle[] = [
  { x1: 0, y1: 0, x2: 5, y2: 4 },  // area: 20
  { x1: 0, y1: 0, x2: 3, y2: 3 },  // area: 9
  { x1: 5, y1: 0, x2: 10, y2: 2 }, // area: 10
  { x1: 0, y1: 0, x2: 2, y2: 6 }   // area: 12
];

console.log(calculateArea({ x1: 0, y1: 0, x2: 5, y2: 4 })); // Output: 20
console.log(calculateArea({ x1: 0, y1: 0, x2: 3, y2: 3 })); // Output: 9
console.log(calculateArea({ x1: 5, y1: 0, x2: 10, y2: 2 }));// Output: 10
console.log(calculateArea({ x1: 0, y1: 0, x2: 2, y2: 6 }));// Output: 12

console.log(sortRectanglesByArea(rectangles));
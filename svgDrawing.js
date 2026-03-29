export class Circle {
    x;
    y;
    radius;
    color;
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    drawAsSVG() {
        return `<circle cx="${this.x}" cy="${this.y}" r="${this.radius}" fill="${this.color}" />`;
    }
}
export class Rectangle {
    x;
    y;
    width;
    height;
    color;
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    drawAsSVG() {
        return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.color}" />`;
    }
}
export class Line {
    x;
    y;
    x2;
    y2;
    color;
    strokeWidth;
    constructor(x, y, x2, y2, color, strokeWidth = 2) {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.strokeWidth = strokeWidth;
    }
    drawAsSVG() {
        return `<line x1="${this.x}" y1="${this.y}" x2="${this.x2}" y2="${this.y2}" stroke="${this.color}" stroke-width="${this.strokeWidth}" />`;
    }
}
export class SVGDrawing {
    objects = [];
    add(obj) {
        this.objects.push(obj);
    }
    clear() {
        this.objects = [];
    }
    toSVG(width = 600, height = 300) {
        const content = this.objects.map((obj) => obj.drawAsSVG()).join('\n');
        return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
    }
}
export function makeCar() {
    const drawing = new SVGDrawing();
    // Body of car
    drawing.add(new Rectangle(80, 120, 240, 60, '#0074D9'));
    // Roof/trapezoid
    drawing.add(new Polygon(120, 120, 70, 40, '#7FDBFF'));
    // Windows
    drawing.add(new Rectangle(130, 128, 45, 25, '#BFDFFF'));
    drawing.add(new Rectangle(205, 128, 45, 25, '#BFDFFF'));
    // Wheels
    drawing.add(new Circle(135, 190, 20, '#111'));
    drawing.add(new Circle(265, 190, 20, '#111'));
    return drawing;
}
// Extra helper: not requested but used for trapezoid car roof.
export class Polygon {
    x;
    y;
    width;
    height;
    color;
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    drawAsSVG() {
        const points = `${this.x},${this.y} ${this.x + this.width},${this.y} ${this.x + this.width - 20},${this.y - this.height} ${this.x + 20},${this.y - this.height}`;
        return `<polygon points="${points}" fill="${this.color}" />`;
    }
}

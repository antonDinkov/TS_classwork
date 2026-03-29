export interface SVGObject {
  x: number;
  y: number;
  drawAsSVG(): string;
}

export class Circle implements SVGObject {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string
  ) {}

  drawAsSVG(): string {
    return `<circle cx="${this.x}" cy="${this.y}" r="${this.radius}" fill="${this.color}" />`;
  }
}

export class Rectangle implements SVGObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string
  ) {}

  drawAsSVG(): string {
    return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.color}" />`;
  }
}

export class Line implements SVGObject {
  constructor(
    public x: number,
    public y: number,
    public x2: number,
    public y2: number,
    public color: string,
    public strokeWidth = 2
  ) {}

  drawAsSVG(): string {
    return `<line x1="${this.x}" y1="${this.y}" x2="${this.x2}" y2="${this.y2}" stroke="${this.color}" stroke-width="${this.strokeWidth}" />`;
  }
}

export class SVGDrawing {
  private objects: SVGObject[] = [];

  add(obj: SVGObject): void {
    this.objects.push(obj);
  }

  clear(): void {
    this.objects = [];
  }

  toSVG(width = 600, height = 300): string {
    const content = this.objects.map((obj) => obj.drawAsSVG()).join('\n');
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }
}

export function makeCar(): SVGDrawing {
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
export class Polygon implements SVGObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string
  ) {}

  drawAsSVG(): string {
    const points = `${this.x},${this.y} ${this.x + this.width},${this.y} ${this.x + this.width - 20},${this.y - this.height} ${this.x + 20},${this.y - this.height}`;
    return `<polygon points="${points}" fill="${this.color}" />`;
  }
}

export enum LedId {
    LedStripe = "LedStripe",
    Fan = "Fan",
    MousePad = "Mousepad",
    Mainboard = "Mainboard",
    Custom = "Custom",
}

export enum LedShape {
    Circle = "Circle",
    Rectangle = "",
}

export class LedData {
    ledId: LedId;
    ledNumber: number;
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    ledShape: LedShape;

    constructor(ledId: LedId, ledNumber: number, xPos: number, yPos: number, width: number, height: number, ledShape: LedShape) {
        this.ledId = ledId;
        this.ledNumber = ledNumber;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.ledShape = ledShape;
    }
}

function addX(xmlDoc: Document, ledData: LedData, led: HTMLElement) {
    const x = xmlDoc.createElement('X');
    x.textContent = ledData.xPos.toFixed(3);
    led.appendChild(x);
}

function addY(xmlDoc: Document, ledData: LedData, led: HTMLElement) {
    const y = xmlDoc.createElement('Y');
    y.textContent = ledData.yPos.toFixed(3);
    led.appendChild(y);
}

function addWidth(xmlDoc: Document, ledData: LedData, led: HTMLElement) {
    const widthTag = xmlDoc.createElement('Width');
    widthTag.textContent = ledData.width.toString();
    led.appendChild(widthTag);
}

function addHeight(xmlDoc: Document, ledData: LedData, led: HTMLElement) {
    const heightTag = xmlDoc.createElement('Height');
    heightTag.textContent = ledData.height.toString();
    led.appendChild(heightTag);
}

function addShape(ledData: LedData, xmlDoc: Document, led: HTMLElement) {
    if (ledData.ledShape) {
        const shape = xmlDoc.createElement('Shape');
        shape.textContent = ledData.ledShape;
        led.appendChild(shape);
    }
}

export function addLed(xmlDoc: Document, ledData: LedData) {
    const led = xmlDoc.createElement('Led');
    led.setAttribute('Id', ledData.ledId + ledData.ledNumber);

    addX(xmlDoc, ledData, led);
    addY(xmlDoc, ledData, led);
    addWidth(xmlDoc, ledData, led);
    addHeight(xmlDoc, ledData, led);
    addShape(ledData, xmlDoc, led);

    const ledsElement = xmlDoc.querySelector('Leds');
    ledsElement!.appendChild(led);
}

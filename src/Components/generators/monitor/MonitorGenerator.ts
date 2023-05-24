import {LedId, LedShape} from "../ArtemisLayout";

export enum StartLocation {
    TopLeft = "Top Left",
    TopRight = "Top Right",
    BottomRight = "Bottom Right",
    BottomLeft = "Bottom Left",
}

export type GenerateMonitorParams = {
    startLocation: StartLocation,
    cw: boolean;

    startId: number,
    ledSize: number,
    ledShape: LedShape;
    ledId: LedId;

    width: number,
    height: number,

    left: number,
    top: number,
    right: number,
    bot: number,
}

function createXml(width: number, height: number) {
    const xmlTemplate =
        `<?xml version="1.0" encoding="utf-8"?>
<Device xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Name>${width}mm x ${height}mm Monitor Leds</Name>
  <Description>Auto generated</Description>
  <Author>Aytackydln</Author>
  <Type>Monitor</Type>
  <Vendor>Any</Vendor>
  <Model>${width}x${height}mm-generated</Model>
  <Width>${width}</Width>
  <Height>${height}</Height>
  <LedUnitWidth>1</LedUnitWidth>
  <LedUnitHeight>1</LedUnitHeight>
  <Leds>
  </Leds>
</Device>`;

    const parser = new DOMParser();
    return parser.parseFromString(xmlTemplate, 'text/xml');
}

export function createMonitorLedLayout(params: GenerateMonitorParams): Document {
    const xmlDoc = createXml(params.width, params.height);

    const functions = [
        (ledId: number) => addHorizontal(xmlDoc, params, ledId, params.top, 0, params.cw), //top border
        (ledId: number) => addVertical(xmlDoc, params, ledId, params.left, params.width - params.ledSize, params.cw),   //right
        (ledId: number) => addHorizontal(xmlDoc, params, ledId, params.bot, params.height - params.ledSize, !params.cw), //bot
        (ledId: number) => addVertical(xmlDoc, params, ledId, params.right, 0, !params.cw), //left border
    ];

    let currentLedId = params.startId;
    let startSide;
    switch (params.startLocation) {
        case StartLocation.TopLeft:
            startSide = 0;
            break
        case StartLocation.TopRight:
            startSide = 1;
            break
        case StartLocation.BottomRight:
            startSide = 2;
            break
        case StartLocation.BottomLeft:
            startSide = 3;
            break
    }

    if (params.cw){
        for (let i = 0; i < 4; i++) {   //4 sides
            currentLedId = functions[(i + startSide)%4](currentLedId);
        }
    } else {
        for (let i = 4; i > 0; i--) {   //4 sides
            currentLedId = functions[(i + startSide)%4](currentLedId);
        }
    }

    return xmlDoc;
}

function addHorizontal(xmlDoc: Document, params: GenerateMonitorParams, ledId: number, ledCount: number, yPos: number, leftToRight: boolean = true) {
    const step = params.width / ledCount;

    if (leftToRight){
        let xPos = 0;
        for (let i = 0 ; i < ledCount; i++) {
            createLed(xmlDoc, params, xPos, yPos, ledId++, step, params.ledSize);
            xPos += step;
        }
    }else {
        let xPos = params.width - step;
        for (let i = ledCount ; i > 0; i--) {
            createLed(xmlDoc, params, xPos, yPos, ledId++, step, params.ledSize);
            xPos -= step;
        }
    }
    return ledId;
}

function addVertical(xmlDoc: Document, params: GenerateMonitorParams, ledId: number, ledCount: number, xStart: number, topToBottom: boolean = true) {
    const step = params.height / ledCount;

    if (topToBottom){
        let yPos = step;   //skip first and last leds, corner leds are for horizontal lines
        for (let i = 1 ; i < ledCount - 1; i++) {
            createLed(xmlDoc, params, xStart, yPos, ledId++, step, params.ledSize);
            yPos += step;
        }
    } else {
        let yPos = params.height - 2 * step;
        for (let i = ledCount - 1 ; i > 1; i--) {
            createLed(xmlDoc, params, xStart, yPos, ledId++, step, params.ledSize);
            yPos -= step;
        }
    }
    return ledId;
}

function createLed(xmlDoc: Document, params: GenerateMonitorParams, xPos: number, yPos: number, ledId: number, width: number, height: number) {
    const led = xmlDoc.createElement('Led');
    led.setAttribute('Id', params.ledId + ledId);

    const x = xmlDoc.createElement('X');
    x.textContent = xPos.toFixed(3);
    led.appendChild(x);

    const y = xmlDoc.createElement('Y');
    y.textContent = yPos.toFixed(3);
    led.appendChild(y);

    const widthTag = xmlDoc.createElement('Width');
    widthTag.textContent = width.toString();
    led.appendChild(widthTag);

    const heightTag = xmlDoc.createElement('Height');
    heightTag.textContent = height.toString();
    led.appendChild(heightTag);

    if (params.ledShape){
        const shape = xmlDoc.createElement('Shape');
        shape.textContent = params.ledShape;
        led.appendChild(shape);
    }

    const ledsElement = xmlDoc.querySelector('Leds');
    ledsElement!.appendChild(led);
}

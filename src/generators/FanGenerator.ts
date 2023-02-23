import {FanRing, GenerateFanParams} from "./FanLayoutForm";
import {LedShape} from "./ArtemisLayout";

function createXml(width: number) {
    const xmlTemplate = `<?xml version="1.0" encoding="utf-8"?>
<Device xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Name>${width}mm Fan</Name>
  <Description>Auto generated</Description>
  <Author>Aytackydln</Author>
  <Type>Fan</Type>
  <Vendor>Any</Vendor>
  <Model>${width}Sxx</Model>
  <Width>${width}</Width>
  <Height>${width}</Height>
  <LedUnitWidth>1</LedUnitWidth>
  <LedUnitHeight>1</LedUnitHeight>
  <Leds>
  </Leds>
</Device>`;

    const parser = new DOMParser();
    return parser.parseFromString(xmlTemplate, 'text/xml');
}

export function createLayout(params: GenerateFanParams): Document {
    const width = params.fanSize;
    const center = width / 2;
    const xmlDoc = createXml(width);

    let ledId = params.startId;
    params.fanRings.forEach(ring => {
        ledId = addRing(xmlDoc, ring, params, center, ledId++);
    });

    return xmlDoc;
}

function addRing(xmlDoc: Document, ring: FanRing, params: GenerateFanParams, center: number, startId: number) {
    let angleStep = (Math.PI * 2) / ring.ledCount;
    const ringRadius = Math.min(ring.radius, params.fanSize/2 - params.fanSize*0.07);
    const ledSize = params.ledShape === LedShape.Circle ?
        calculatePerfectLedSize(angleStep, ringRadius) : 20;

    let angle = ring.startOffset * (Math.PI / 180);
    for (let i = 0 ; i < ring.ledCount; i++) {

        const xPos = Math.max(center + Math.cos(angle) * ringRadius - ledSize/2, 0);
        const yPos = Math.max(center + Math.sin(angle) * ringRadius - ledSize/2, 0);

        createLed(xmlDoc, xPos, yPos, startId++, params, ledSize);
        angle += ring.cw ? -angleStep : angleStep;
    }
    return startId;
}

function createLed(xmlDoc: Document, xPos: number, yPos: number, ledId: number, params: GenerateFanParams, ledSize: number) {
    const led = xmlDoc.createElement('Led');
    led.setAttribute('Id', params.ledId + ledId);

    const x = xmlDoc.createElement('X');
    x.textContent = xPos.toFixed(3);
    led.appendChild(x);

    const y = xmlDoc.createElement('Y');
    y.textContent = yPos.toFixed(3);
    led.appendChild(y);

    const width = xmlDoc.createElement('Width');
    width.textContent = ledSize.toString();
    led.appendChild(width);

    const height = xmlDoc.createElement('Height');
    height.textContent = ledSize.toString();
    led.appendChild(height);

    if (params.ledShape){
        const shape = xmlDoc.createElement('Shape');
        shape.textContent = params.ledShape;
        led.appendChild(shape);
    }

    const ledsElement = xmlDoc.querySelector('Leds');
    ledsElement!.appendChild(led);
}

function calculatePerfectLedSize(angle: number, radius: number): number {
    return Math.sqrt(
        2 * Math.pow(radius, 2) * (1 - Math.cos(angle))
    );
}

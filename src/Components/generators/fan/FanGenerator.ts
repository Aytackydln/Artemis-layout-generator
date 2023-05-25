import {FanRing, GenerateFanParams} from "./FanLayoutForm";
import {addLed, LedData, LedShape} from "../ArtemisLayout";

function createXml(width: number) {
    const xmlTemplate = `<?xml version="1.0" encoding="utf-8"?>
<Device xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Name>${width}mm Fan</Name>
  <Description>Auto generated</Description>
  <Author>Aytackydln</Author>
  <Type>Fan</Type>
  <Vendor>Any</Vendor>
  <Model>${width}mm-generated</Model>
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

export function createFanLayout(params: GenerateFanParams): Document {
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

        addLed(xmlDoc, new LedData(params.ledId, startId++, xPos, yPos, ledSize, ledSize, params.ledShape));
        angle += ring.cw ? angleStep : -angleStep;
    }
    return startId;
}

function calculatePerfectLedSize(angle: number, radius: number): number {
    return Math.round(Math.sqrt(
        2 * Math.pow(radius, 2) * (1 - Math.cos(angle))
    ) * 100) / 100;
}

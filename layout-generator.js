const ledSize = 20;

const ledShapeInpt = document.getElementById('ledShapeInpt');
const ledIdInpt = document.getElementById('ledIdInpt');
const startIdInpt = document.getElementById('startIdInpt');

function createLayout(width, height, ledCount) {
    width = Number(width);
    height = Number(height);
    const xmlTemplate = `<?xml version=\"1.0\" encoding=\"utf-8\"?>
<Device xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">
  <Name>${width}mm Single Ring Fan</Name>
  <Description>Auto generated</Description>
  <Author>Aytackydln</Author>
  <Type>Fan</Type>
  <Vendor>Any</Vendor>
  <Model>${width}S${ledCount}</Model>
  <Width>${width + ledSize}</Width>
  <Height>${height + ledSize}</Height>
  <LedUnitWidth>${ledSize}</LedUnitWidth>
  <LedUnitHeight>${ledSize}</LedUnitHeight>
  <Leds>
  </Leds>
</Device>`;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlTemplate, 'text/xml');

    const centerX = (width) / 2;
    const centerY = (height) / 2;

    for (let i = 0 ; i < ledCount; i++) {
        const angle = ((Math.PI * 2) / ledCount) * i;

        const xPos = centerX + Math.cos(angle) * centerX;
        const yPos = centerY + Math.sin(angle) * centerY;

        createLed(xmlDoc, xPos, yPos, i + Number(startIdInpt.value));
    }

    return xmlDoc;
}

function createLed(xmlDoc, xPos, yPos, ledId) {
    const led = xmlDoc.createElement('Led');
    led.setAttribute('Id', ledIdInpt.value + ledId);

    const x = xmlDoc.createElement('X');
    x.textContent = xPos.toString();
    led.appendChild(x);

    const y = xmlDoc.createElement('Y');
    y.textContent = yPos.toString();
    led.appendChild(y);


    if (ledShapeInpt.value){
        const shape = xmlDoc.createElement('Shape');
        shape.textContent = ledShapeInpt.value;
        led.appendChild(shape);
    }

    const ledsElement = xmlDoc.querySelector('Leds');
    ledsElement.appendChild(led);
}

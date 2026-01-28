import {addLed, LedData, LedId, LedShape} from "../ArtemisLayout";

export default class MatrixGenerator {
    ledWidth = 5
    ledHeight = 5

    ledSpaceX = 4
    ledSpaceY = 4

    ledShape = LedShape.Rectangle;
    ledId = LedId.Matrix
    startId = 1

    rows = 10
    columns = 10

    createXml() {
        const width = (this.ledWidth + this.ledSpaceX) * this.columns
        const height = (this.ledHeight + this.ledSpaceY) * this.rows

        const xmlTemplate = `<?xml version="1.0" encoding="utf-8"?>
<Device xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Name>${this.rows}x${this.columns} Matrix</Name>
  <Description>Auto generated</Description>
  <Author>Aytackydln's Layout Generator</Author>
  <Type>Fan</Type>
  <Vendor>Any</Vendor>
  <Model>${this.rows}x${this.columns}-matrix-generated</Model>
  <Width>${width}</Width>
  <Height>${height}</Height>
  <LedUnitWidth>1</LedUnitWidth>
  <LedUnitHeight>1</LedUnitHeight>
  <Leds>
  </Leds>
</Device>`

        const parser = new DOMParser()
        const document = parser.parseFromString(xmlTemplate, 'text/xml')
        this.addRowsAndColumns(document)
        return document
    }

    addRowsAndColumns(xmlDoc: Document) {
        let ledId = this.startId
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            this.addRow(xmlDoc, rowIndex, ledId)
            ledId += this.columns
        }
    }

    addRow(xmlDoc: Document, rowIndex: number, startId: number) {
        for (let colIndex = 0; colIndex < this.columns; colIndex++) {
            const xPos = colIndex * this.ledWidth + this.ledSpaceX
            const yPos = rowIndex * this.ledHeight + this.ledSpaceY

            addLed(xmlDoc, new LedData(
                this.ledId,
                startId++,
                xPos,
                yPos,
                this.ledWidth,
                this.ledHeight,
                this.ledShape
            ))
        }
    }
}

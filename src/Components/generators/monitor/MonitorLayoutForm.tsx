import React, {useState} from 'react';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import {LedId, LedShape} from '../ArtemisLayout';
import {GenerateMonitorParams, StartLocation} from "./MonitorGenerator";
import {ToggleComponent} from "../../ToggleComponent";
import {ArrowClockwise, ArrowCounterclockwise} from "react-bootstrap-icons";

const defaultStartLocation = StartLocation.TopLeft;
const defaultCw = true;

const defaultWidth = 500;
const defaultHeight = 300;

const defaultTop = 20;
const defaultRight = 15;
const defaultBot = 20;
const defaultLeft = 15;

const defaultLedShape = LedShape.Rectangle;
const defaultLedId = LedId.LedStripe;
const defaultStartId = 1;
const defaultLedSize = 20;

export function MonitorLayoutForm(props: { onSubmit: (args: GenerateMonitorParams) => void }) {
    const [startLocation, setStartLocation] = useState<StartLocation>(defaultStartLocation);
    const [cw, setCw] = useState<boolean>(defaultCw);

    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);

    const [top, setTop] = useState(defaultTop);
    const [right, setRight] = useState(defaultRight);
    const [bot, setBot] = useState(defaultBot);
    const [left, setLeft] = useState(defaultLeft);

    const [ledShape, setLedShape] = useState<LedShape>(defaultLedShape);
    const [ledId, setLedId] = useState<LedId>(defaultLedId);
    const [startId, setStartId] = useState(defaultStartId);
    const [ledSize, setLedSize] = useState(defaultLedSize);

    const submitClicked = () => {
        props.onSubmit({
            startLocation,
            cw,
            width,
            height,
            ledShape,
            ledSize,
            ledId,
            startId,
            left,
            top,
            right,
            bot,
        });
    };

    return <Row className='justify-content-md-center'>
        <Col className="bg-body-secondary" lg={4} sm={12}>
            <h3>Sides</h3>
            <Row>
                <Form.Label>
                    Dimensions(mm)
                    <InputGroup>
                        <InputGroup.Text>
                            Width
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={defaultWidth} onChange={
                            (event) => setWidth(Number(event.target.value))
                        }/>
                        <InputGroup.Text>
                            Height
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={defaultHeight} onChange={
                            (event) => setHeight(Number(event.target.value))
                        }/>
                    </InputGroup>
                </Form.Label>
                <Form.Label>
                    LED Counts
                    <InputGroup>
                        <InputGroup.Text>
                            Top
                        </InputGroup.Text>
                        <Form.Control type='number' aria-describedby='ledCountsHelpBlock' defaultValue={defaultTop} onChange={
                            (event) => setTop(Number(event.target.value))
                        }/>
                        <InputGroup.Text>
                            Right
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={defaultRight} onChange={
                            (event) => setRight(Number(event.target.value))
                        }/>
                        <InputGroup.Text>
                            Bottom
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={defaultBot} onChange={
                            (event) => setBot(Number(event.target.value))
                        }/>
                        <InputGroup.Text>
                            Left
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={defaultLeft} onChange={
                            (event) => setLeft(Number(event.target.value))
                        }/>
                    </InputGroup>
                    <Form.Text id='ledCountsHelpBlock'>
                        Corner leds should be counted in top/bottom
                    </Form.Text>
                </Form.Label>
                <Form.Label>
                    LED Size(mm)
                    <Form.Control type='number' defaultValue={defaultLedSize} onChange={
                        (event) => setLedSize(Number(event.target.value))
                    }/>
                </Form.Label>
            </Row>
            <br/>
            <Button id='generateBtn' variant='primary' type='button' onClick={submitClicked}>Generate</Button>
            <br/>
            Recommended location for layouts are:
            <div className="text-nowrap">C:\ProgramData\Artemis\user layouts\Brand\Monitor</div>
        </Col>
        <Col className="bg-body-tertiary" lg={4} sm={12}>
            <h3>Options</h3>
            <Row>
                <Form.Label>
                    LED Shape
                    <Form.Select defaultValue={defaultLedShape} onChange={
                        (event) => setLedShape(event.target.value as LedShape)
                    }>
                        <option value={LedShape.Circle}>Circle</option>
                        <option value={LedShape.Rectangle}>Rectangle</option>
                    </Form.Select>
                </Form.Label>
            </Row>
            <Row>
                <Form.Label>
                    LED Id
                    <Form.Select aria-describedby='ledIdHelpBlock' defaultValue={defaultLedId} onChange={
                        (event) => setLedId(event.target.value as LedId)
                    }>
                        <option value={LedId.LedStripe}>LedStripe#</option>
                        <option value={LedId.Fan}>Fan#</option>
                        <option value={LedId.MousePad}>Mousepad#</option>
                        <option value={LedId.Mainboard}>Mainboard#</option>
                        <option value={LedId.Custom}>Custom#</option>
                    </Form.Select>
                    <Form.Text id='ledIdHelpBlock'>
                        LED id differs depending on device controller.<br/>
                        OpenRGB - LedStripe#<br/>
                        Others - Fan# (usually)<br/>
                    </Form.Text>
                </Form.Label>
            </Row>
            <Form.Label>
                Starting led id
                <Form.Control id='startIdInpt' type='number'
                              aria-describedby='startIdHelpBlock' defaultValue={defaultStartId} onChange={
                    (event) => setStartId(Number(event.target.value))
                }/>
                <Form.Text id='startIdHelpBlock'>
                    Depending on device connector different connected devices may start from different numbers.
                    Check device properties in surface editor to determine this.
                </Form.Text>
            </Form.Label>

            <Form.Label>
                Start Corner
                <InputGroup>
                    <Form.Select aria-describedby='startLocationHelpBlock' defaultValue={defaultStartLocation} onChange={
                        (event) => setStartLocation(event.target.value as StartLocation)
                    }>
                        <option value={defaultStartLocation}>Top Left</option>
                        <option value={StartLocation.TopRight}>Top Right</option>
                        <option value={StartLocation.BottomRight}>Bottom Right</option>
                        <option value={StartLocation.BottomLeft}>Bottom Left</option>
                    </Form.Select>
                    <ToggleComponent
                        value={cw}
                        buttonProps={{variant: 'light'}}
                        on={<ArrowClockwise/>}
                        off={<ArrowCounterclockwise/>}
                        onToggled={(newValue) => setCw(newValue)}
                    />
                </InputGroup>
                <Form.Text id='startLocationHelpBlock'>
                    The corner starting led will begin.
                    Also make sure rotation is right.
                </Form.Text>
            </Form.Label>
        </Col>
    </Row>;
}

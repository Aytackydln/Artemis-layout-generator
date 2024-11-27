import React, { useState } from 'react';
import { Button, Col, Form, Row, InputGroup } from 'react-bootstrap';
import { LedId, LedShape } from '../ArtemisLayout';
import { ArrowClockwise, ArrowCounterclockwise, Plus } from 'react-bootstrap-icons';
import { ToggleComponent } from '../../ToggleComponent';

let fanRingId = 0;

export interface FanRing {
    id: number;
    ledCount: number;
    radius: number;
    startOffset: number;
    cw: boolean;
}

export interface GenerateFanParams {
    fanSize: number;
    ledShape: LedShape;
    ledId: LedId;
    startId: number;
    fanRings: FanRing[];
}

const defaultFanSize = 120;
const defaultLedShape = LedShape.Circle;
const defaultLedId = LedId.LedStripe;
const defaultStartId = 1;

const defaultFanRing: FanRing = {
    id: fanRingId++,
    ledCount: 20,
    radius: 60,
    startOffset: 0,
    cw: true,
};

export function FanLayoutForm(props: { onSubmit: (args: GenerateFanParams) => void }) {
    const [fanSize, setFanSize] = useState<number>(defaultFanSize);
    const [ledShape, setLedShape] = useState<LedShape>(defaultLedShape);
    const [ledId, setLedId] = useState<LedId>(defaultLedId);
    const [startId, setStartId] = useState(defaultStartId);

    const [fanRings, setFanRings] = useState<FanRing[]>([defaultFanRing]);

    const submitClicked = () => {
        props.onSubmit({
            fanSize,
            ledShape,
            ledId,
            startId,
            fanRings,
        });
    };

    function addFanRing() {
        let newFanRings = [...fanRings, {
            id: fanRingId++,
            ledCount: 8,
            ledSize: 0,
            radius: fanSize / 2,
            cw: true,
            startOffset: 0,
        }];
        setFanRings(newFanRings);
    }

    function removeFanRing(ring: FanRing) {
        const newFanRings = fanRings.filter(r => r !== ring);
        setFanRings(newFanRings);
    }

    return <Row className='justify-content-md-center'>
        <Col className="bg-body-secondary" lg={3} sm={12}>
            <h3>Options</h3>
            <Row>
                <Form.Label>
                    Fan Size(mm)
                    <Form.Control type='number' defaultValue={defaultFanSize} onChange={
                        (event) => setFanSize(Number(event.target.value))
                    }/>
                </Form.Label>
                <Form.Label>
                    Led Shape
                    <Form.Select defaultValue={defaultLedShape} onChange={
                        (event) => setLedShape(event.target.value as LedShape)
                    }>
                        <option value={LedShape.Circle}>Circle</option>
                        <option value={LedShape.Rectangle}>Rectangle</option>
                    </Form.Select>
                </Form.Label>
            </Row>
            <Form.Label>
                Led Id
                <Form.Select aria-describedby='ledIdHelpBlock' defaultValue={defaultLedId} onChange={
                    (event) => setLedId(event.target.value as LedId)
                }>
                    <option value={LedId.LedStripe}>LedStripe#</option>
                    <option value={LedId.Fan}>Fan#</option>
                    <option value={LedId.Mainboard}>Mainboard#</option>
                    <option value={LedId.Custom}>Custom#</option>
                </Form.Select>
                <Form.Text id='ledIdHelpBlock'>
                    Led id differs depending on device controller.<br/>
                    OpenRGB - LedStripe#<br/>
                    Others - Fan# (usually)<br/>
                </Form.Text>
            </Form.Label>
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
            <Button id='generateBtn' variant='primary' type='button' onClick={submitClicked}>Generate</Button>
            <br/>
            Recommended location for layouts are:
            <div className="text-nowrap">C:\ProgramData\Artemis\user layouts\Brand\Fan</div>
        </Col>
        <Col className="bg-body-tertiary" lg={6} sm={12}>
            <h3>Rings</h3>
            {
                fanRings.map((ring, index) => {
                    return <InputGroup key={ring.id}>
                        <InputGroup.Text>
                            Leds
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={ring.ledCount} onChange={
                            (event) => ring.ledCount = Number(event.target.value)
                        }/>
                        <ToggleComponent
                            value={ring.cw}
                            buttonProps={{variant: 'light'}}
                            on={<ArrowClockwise/>}
                            off={<ArrowCounterclockwise/>}
                            onToggled={(newValue) => ring.cw = newValue}
                        />
                        <InputGroup.Text>
                            Radius
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={ring.radius} onChange={
                            (event) => ring.radius = Number(event.target.value)
                        }/>
                        <InputGroup.Text>
                            Offset (°)
                        </InputGroup.Text>
                        <Form.Control type='number' defaultValue={ring.startOffset} onChange={
                            (event) => ring.startOffset = Number(event.target.value)
                        }/>
                        <Button variant='danger' disabled={index <= 0} onClick={() => removeFanRing(ring)}>X</Button>
                    </InputGroup>;
                })
            }
            <Button variant='secondary' onClick={addFanRing}><Plus/></Button>
        </Col>
    </Row>;
}

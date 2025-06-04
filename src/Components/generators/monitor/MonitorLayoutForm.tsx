import React from 'react';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import {LedId, LedShape} from '../ArtemisLayout';
import {GenerateMonitorParams, StartLocation} from "./MonitorGenerator";
import {ToggleComponent} from "../../ToggleComponent";
import {ArrowClockwise, ArrowCounterclockwise} from "react-bootstrap-icons";
import {useForm} from "react-hook-form";

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

export function MonitorLayoutForm(props: Readonly<{ onSubmit: (args: GenerateMonitorParams) => void }>) {
    const {register, handleSubmit, getValues, setValue} = useForm<GenerateMonitorParams>({
        defaultValues: {
            startLocation: defaultStartLocation,
            cw: defaultCw,
            width: defaultWidth,
            height: defaultHeight,
            ledShape: defaultLedShape,
            ledSize: defaultLedSize,
            ledId: defaultLedId,
            startId: defaultStartId,
            left: defaultLeft,
            top: defaultTop,
            right: defaultRight,
            bot: defaultBot,
        },
    });

    const submitClicked = (formData: GenerateMonitorParams) => {
        props.onSubmit(formData);
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
                        <Form.Control {...register("width")} />
                        <InputGroup.Text>
                            Height
                        </InputGroup.Text>
                        <Form.Control {...register("height")} />
                    </InputGroup>
                </Form.Label>
                <Form.Label>
                    LED Counts
                    <InputGroup>
                        <InputGroup.Text>
                            Top
                        </InputGroup.Text>
                        <Form.Control {...register("top")}/>
                        <InputGroup.Text>
                            Right
                        </InputGroup.Text>
                        <Form.Control {...register("right")}/>
                        <InputGroup.Text>
                            Bottom
                        </InputGroup.Text>
                        <Form.Control {...register("bot")}/>
                        <InputGroup.Text>
                            Left
                        </InputGroup.Text>
                        <Form.Control {...register("left")}/>
                    </InputGroup>
                    <Form.Text>
                        Corner leds should be counted in top/bottom
                    </Form.Text>
                </Form.Label>
                <Form.Label>
                    LED Size(mm)
                    <Form.Control {...register("ledSize")}/>
                </Form.Label>
            </Row>
            <br/>
            <Button variant='primary' type='button' onClick={handleSubmit(submitClicked)}>Generate</Button>
            <br/>
            Recommended location for layouts are:
            <div className="text-nowrap">C:\ProgramData\Artemis\user layouts\Brand\Monitor</div>
        </Col>
        <Col className="bg-body-tertiary" lg={4} sm={12}>
            <h3>Options</h3>
            <Row>
                <Form.Label>
                    LED Shape
                    <Form.Select {...register("ledShape")}>
                        <option value={LedShape.Circle}>Circle</option>
                        <option value={LedShape.Rectangle}>Rectangle</option>
                    </Form.Select>
                </Form.Label>
            </Row>
            <Row>
                <Form.Label>
                    LED Id
                    <Form.Select aria-describedby='ledIdHelpBlock' {...register("ledId")}>
                        <option value={LedId.LedStripe}>LedStripe#</option>
                        <option value={LedId.Fan}>Fan#</option>
                        <option value={LedId.MousePad}>Mousepad#</option>
                        <option value={LedId.Mainboard}>Mainboard#</option>
                        <option value={LedId.Custom}>Custom#</option>
                    </Form.Select>
                    <Form.Text>
                        LED id differs depending on device controller.<br/>
                        OpenRGB - LedStripe#<br/>
                        Others - Fan# (usually)<br/>
                    </Form.Text>
                </Form.Label>
            </Row>
            <Form.Label>
                Starting led id
                <Form.Control aria-describedby='startIdHelpBlock' {...register("startId")}/>
                <Form.Text>
                    Depending on device connector different connected devices may start from different numbers.
                    Check device properties in surface editor to determine this.
                </Form.Text>
            </Form.Label>

            <Form.Label>
                Start Corner
                <InputGroup>
                    <Form.Select aria-describedby='startLocationHelpBlock' {...register("startLocation")}>
                        <option value={defaultStartLocation}>Top Left</option>
                        <option value={StartLocation.TopRight}>Top Right</option>
                        <option value={StartLocation.BottomRight}>Bottom Right</option>
                        <option value={StartLocation.BottomLeft}>Bottom Left</option>
                    </Form.Select>
                    <InputGroup.Text>
                        Direction:
                    </InputGroup.Text>
                    <ToggleComponent
                        value={getValues()["cw"]}
                        buttonProps={{variant: 'light'}}
                        on={<ArrowClockwise/>}
                        off={<ArrowCounterclockwise/>}
                        onToggled={(newValue) => setValue("cw", newValue)}
                    />
                </InputGroup>
                <Form.Text>
                    The corner starting led will begin.
                    Also make sure rotation is right.
                </Form.Text>
            </Form.Label>
        </Col>
    </Row>;
}

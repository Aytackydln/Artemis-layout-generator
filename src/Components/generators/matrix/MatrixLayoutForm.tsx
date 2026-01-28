import {useForm} from "react-hook-form";
import MatrixGenerator from "./MatrixGenerator";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {LedId, LedShape} from "../ArtemisLayout";
import React from "react";

export function MatrixLayoutForm(props: Readonly<{ onSubmit: (args: MatrixGenerator) => void }>) {
    const {register, handleSubmit} = useForm<MatrixGenerator>({
        defaultValues: new MatrixGenerator()
    });

    const submitClicked = (formData: MatrixGenerator) => {
        props.onSubmit(formData);
    };

    return <Row className='justify-content-md-center'>
        <Col className="bg-body-secondary" lg={4} sm={12}>
            <h3>Main</h3>
            <Row>
                <Form.Label>
                    LED Dimensions (mm)
                    <InputGroup>
                        <InputGroup.Text>
                            Width
                        </InputGroup.Text>
                        <Form.Control {...register("ledWidth")} />
                        <InputGroup.Text>
                            Height
                        </InputGroup.Text>
                        <Form.Control {...register("ledHeight")} />
                    </InputGroup>
                </Form.Label>
                <Form.Label>
                    LED Counts
                    <InputGroup>
                        <InputGroup.Text>
                            Rows (X-axis)
                        </InputGroup.Text>
                        <Form.Control {...register("rows")}/>
                        <InputGroup.Text>
                            Columns (Y-axis)
                        </InputGroup.Text>
                        <Form.Control {...register("columns")}/>

                    </InputGroup>
                </Form.Label>
                <Form.Label>
                    Margins (mm)
                    <InputGroup>
                        <InputGroup.Text>
                            Horizontal
                        </InputGroup.Text>
                        <Form.Control {...register("ledSpaceX")}/>
                        <InputGroup.Text>
                            Vertical
                        </InputGroup.Text>
                        <Form.Control {...register("ledSpaceY")}/>
                    </InputGroup>
                    <Form.Text>
                        It's good idea to choose size/margins divisible by your render scale
                    </Form.Text>
                </Form.Label>
            </Row>
            <br/>
            <Button variant='primary' type='button' onClick={handleSubmit(submitClicked)}>Generate</Button>
            <br/>
            Recommended location for layouts are:
            <div className="text-nowrap">C:\ProgramData\Artemis\user layouts\Brand\Matrix</div>
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
                        <option value={LedId.Matrix}>LEDMatrix#</option>
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
        </Col>
    </Row>;
}
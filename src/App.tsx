import React, { useState } from 'react';
import './App.css';
import { Button, Container, Form, Row, Col, Nav } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Clipboard, Download, Github } from 'react-bootstrap-icons';
import { FanLayoutForm, GenerateFanParams } from './generators/FanLayoutForm';
import { createLayout } from './generators/FanGenerator';

function App() {
    const [result, setResult] = useState('');
    const [fileName, setFileName] = useState('');

    const generateSubmitted = (args: GenerateFanParams) => {
        const document = createLayout(args);
        setResult(document.documentElement.outerHTML);
        let rings: string;
        switch (args.fanRings.length) {
            case 1:
                rings = 'S';
                break;
            case 2:
                rings = 'D';
                break;
            default:
                rings = 'M';
                break;
        }
        setFileName(`${args.fanSize}${rings}${args.fanRings[0].ledCount}.xml`);
    };

    const onDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.download = fileName;

        const textFileAsBlob = new Blob([result], {type: 'text/xml'});
        downloadLink.href = URL.createObjectURL(textFileAsBlob);

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const onCopy = async () => {
        return navigator.clipboard.writeText(result);
    }

    return (
        <Container fluid className="align-items-center vh-100 d-flex flex-column">
            <Row>
                <Col lg={1} sm={0}>
                    <Nav variant='tabs' className='flex-lg-column flex-row' style={{height: '100%', width: '100%'}}>
                        <Nav.Link active>Fan</Nav.Link>
                        <Nav.Link disabled>Monitor</Nav.Link>
                        <div className="align-self-stretch" style={{marginLeft: 'auto'}} />{/* //seperate links*/}
                        <Nav.Link style={{marginTop: 'auto'}}//, marginLeft: 'auto'
                                  className="align-self-lg-center align-self-stretch"
                                  href='https://github.com/Aytackydln/Artemis-layout-generator' target='_blank'>
                            <Github/>
                        </Nav.Link>
                    </Nav>
                </Col>
                <Col lg={11} sm={12}>
                    <CardHeader><h1>Fan layout generator for Artemis</h1></CardHeader>
                    <FanLayoutForm onSubmit={generateSubmitted}/>
                </Col>
            </Row>

            <div className="flex-fill align-self-stretch textarea-container">
                <Form.Control as="textarea" className='flex-fill align-self-stretch' readOnly value={result}/>
                <div className="buttons">
                    <Button variant="outline-primary" onClick={onDownload}><Download/></Button>
                    <Button id="copyBtn" variant="outline-primary" onClick={onCopy}><Clipboard/></Button>
                </div>
            </div>
        </Container>
    );
}

export default App;

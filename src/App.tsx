import React, {useState} from 'react';
import './App.css';
import { Button, Container, Form, Row, Col, Stack } from 'react-bootstrap';
import CardHeader from "react-bootstrap/CardHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Clipboard, Download, Github } from 'react-bootstrap-icons';
import {FanLayoutForm, GenerateFanParams} from "./generators/FanLayoutForm";
import {createLayout} from './generators/FanGenerator';

function App() {
    const [result, setResult] = useState("");
    const [fileName, setFileName] = useState("");

    const generateSubmitted = (args: GenerateFanParams) => {
        let document = createLayout(args);
        setResult(document.documentElement.outerHTML);
        setFileName(`${args.fanSize}S${args.fanRings[0].ledCount}.xml`)
    };

    const onDownload = () => {
        const downloadLink = document.createElement("a");
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

    const openGithub = () => {
        window.open('https://github.com/Aytackydln/Artemis-layout-generator', '_blank');
    }

    return (
        <Container fluid className="align-items-center vh-100 d-flex flex-column">
            <Row>
                <Col sm={'auto'}>
                    <Stack direction='vertical' style={{height: '100%'}}>
                        <Button variant='info'>Fan</Button>
                        <div  style={{height: '100%'}}></div>
                        <Button variant='link' onClick={openGithub}><Github/></Button>
                    </Stack>
                </Col>
                <Col>
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

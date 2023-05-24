import React, { useState } from 'react';
import './App.css';
import { Button, Container, Form, Row, Col, Nav } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Clipboard, Download, Github } from 'react-bootstrap-icons';
import { FanLayoutForm, GenerateFanParams } from './Components/generators/fan/FanLayoutForm';
import { createFanLayout } from './Components/generators/fan/FanGenerator';
import {Outlet, RouteObject, useLocation, useRoutes} from "react-router-dom";
import {MonitorLayoutForm} from "./Components/generators/monitor/MonitorLayoutForm";
import { createMonitorLedLayout, GenerateMonitorParams} from "./Components/generators/monitor/MonitorGenerator";


function App() {

    const [result, setResult] = useState('');
    const [fileName, setFileName] = useState('');

    const fanGenerateSubmitted = (args: GenerateFanParams) => {
        const document = createFanLayout(args);
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

    const monitorGenerateSubmitted = (args: GenerateMonitorParams) => {
        const document = createMonitorLedLayout(args);
        setResult(document.documentElement.outerHTML);
        setFileName(`${args.width}x${args.height}MonitorLeds.xml`);
    };

    const fanLayoutForm = <FanLayoutForm onSubmit={fanGenerateSubmitted}/>
    const monitorLayoutForm = <MonitorLayoutForm onSubmit={monitorGenerateSubmitted}/>

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout result={result} fileName={fileName} />,
            children: [
                { index: true, element: fanLayoutForm },
                { path: "/fan", element: fanLayoutForm },
                { path: "/monitor", element: monitorLayoutForm },
            ],
        },
    ]

    return useRoutes(routes, process.env.REACT_APP_PUBLIC_URL);
}

const Layout = (props: {result: string, fileName: string}) => {
    const { pathname } = useLocation();

    const onDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.download = props.fileName;

        const textFileAsBlob = new Blob([props.result], {type: 'text/xml'});
        downloadLink.href = URL.createObjectURL(textFileAsBlob);

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const onCopy = async () => {
        return navigator.clipboard.writeText(props.result);
    }

    return (
        <Container fluid className="align-items-center vh-100 d-flex flex-column">
            <Row>
                <Col lg={1} sm={0}>
                    <Nav variant='tabs'
                         className='flex-lg-column flex-row'
                         style={{height: '100%', width: '100%'}}
                        activeKey={pathname.slice(1)}
                    >
                        <Nav.Link href="fan">Fan</Nav.Link>
                        <Nav.Link href="monitor">Monitor</Nav.Link>
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
                    <Outlet />
                </Col>
            </Row>

            <div className="flex-fill align-self-stretch textarea-container">
                <Form.Control as="textarea" className='flex-fill align-self-stretch' readOnly value={props.result}/>
                <div className="buttons">
                    <Button variant="outline-primary" onClick={onDownload}><Download/></Button>
                    <Button id="copyBtn" variant="outline-primary" onClick={onCopy}><Clipboard/></Button>
                </div>
            </div>
        </Container>
    );
};

export default App;

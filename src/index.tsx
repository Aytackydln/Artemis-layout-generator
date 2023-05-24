import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const headElement = document.getElementsByTagName("head").item(0)!;
const baseRef = headElement.getElementsByTagName("base").item(0)!;
const baseName = baseRef.getAttribute("href")!;
root.render(
  <React.StrictMode>
      <BrowserRouter basename={baseName}>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';

import './reset.css';
import './vars.css';
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // Not to forget, 'StrictMode' causes an initial
  // double rendering on 'development' mode
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

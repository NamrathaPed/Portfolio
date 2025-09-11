import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { routing } from './routes';
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className='flex flex-col min-h-screen'>
      {routing}
    </div>
    </BrowserRouter>
  </React.StrictMode>
);

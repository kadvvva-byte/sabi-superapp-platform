import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./styles.css";
import "./admin-select-visibility.css";

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Admin UI root element #root was not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

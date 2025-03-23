import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Set the app title
document.title = 'Trivia-PS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  
);

// npm install bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// npm install --save-dev @fortawesome/fontawesome-free
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/App';
import 'fontsource-roboto';
import index from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={index}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

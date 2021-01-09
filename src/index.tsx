import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupServer } from './services/mirage/server';
// import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';
if (process.env.NODE_ENV === 'development') {
  setupServer();
}
ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

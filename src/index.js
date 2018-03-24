import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from '../store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');

// const alertButton = document.getElementById('alertClose')
// console.log(alertButton)

// alertButton.addEventListener('click', () => {
//   console.log('click!')
// })

render((
  <Provider store={store}>
    <App />
  </Provider>
), root);

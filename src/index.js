import React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import 'emojione-picker/css/picker.css'
import 'style/main.scss';

/* Redux Store */
import { Provider } from 'react-redux';
import store from 'redux/store/store.js'; // Redux store if using

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

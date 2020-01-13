import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './components/Root';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'));

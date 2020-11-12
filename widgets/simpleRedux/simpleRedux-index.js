/**
 * КОРНЕВОЙ СКРИПТ ПРИЛОЖЕНИЯ НА REDUX
 *
 */

import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import FormReducer from './reducers/FormReducer';
import Form from './components/Form';

render(
  <Provider store={createStore(FormReducer)}>
    <Form />
  </Provider>,
  document.getElementById('reactContainer')
)
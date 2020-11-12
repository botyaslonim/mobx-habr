/**
 * КОРНЕВОЙ СКРИПТ ПРИЛОЖЕНИЯ НА MOBX
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import Form from "./components/Form";
import FormStore from "./stores/FormStore";
// для IE11
require("es6-object-assign").polyfill();
require( "./static/less/main.less");

const stores = {
  FormStore: new FormStore(),
};

ReactDOM.render((
  <Provider {...stores}>
    <Form />
  </Provider>
), document.getElementById('reactContainer'));
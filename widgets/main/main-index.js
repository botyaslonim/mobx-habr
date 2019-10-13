/**
 * КОРНЕВОЙ СКРИПТ ПРИЛОЖЕНИЯ НА MOBX
 *
 * Хранилище commonStore является старшим по отношению к остальным хранилищам (кроме optionsStore)
 * Поток данных однонаправленный: commonStore слушает все изменения, которые происходят в зависимых хранилищах
 * Другие хранилища ничего никуда не передают, только изменяют своё состояние и взаимодействуют со своим отображением
 * optionsStore является статическим хранилищем параметров, пришедших от бэка в шаблон при отрисовке
 */

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import App from "./components/App";
import mainStore from "./stores/mainStore";
import optionsStore from "./stores/optionsStore";
// для IE11
require("es6-object-assign").polyfill();
require( "./static/less/main.less");

const stores = {
    mainStore,
    optionsStore,
    ButtonStore : mainStore.ButtonStore,    
    FioStore : mainStore.FioStore,
    EmailStore : mainStore.EmailStore
};

ReactDOM.render((
    <Provider {...stores}>
        <App />
    </Provider>
), document.getElementById('reactContainer'));
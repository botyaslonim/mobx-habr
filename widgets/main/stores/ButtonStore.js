/**
 * ХРАНИЛИЩЕ ПЕРЕИСПОЛЬЗУЕМЫХ КОМПОНЕНТОВ BUTTON
 *
 * Количество экземпляров компонента не ограничено. Каждый экземпляр обязательно регистрирует себя в @action registration
 * Возможные параметры при регистрации экземпляра:
 * @param name {String} - имя поля, по которому оно однозначно идентифицируется в хранилищах (обязательно)
 * @param value {String} - предзаданное значение поля (необязательно)
 * @param disabled {Boolean} - поле выключено или нет (необязательно)
 */

import {action, observable, get, set} from 'mobx';
import {blockValidate} from "../../../helpers/functions";

export default class ButtonStore {

    constructor() {}

    /**
     * В объект items записываются данные каждого из экзепляров компонента Button при их создании
     */
    @observable items = new Map([])    

    /**
     * Регистрация экземпляра компонента
     */
    @action registration = (params) => {        
        const nameExists = get(this.items, params.name);      
        if (!blockValidate({params, nameExists, type: "Button"})) return false;
        // расширяем items новым объектом
        const value = {           
            disabled : params.disabled,       
            isClicked : false     
        };
        set(this.items, params.name, value);      
    };

    /**
     * Открепление экземпляра компонента
     */
    @action unmount = (name) => {
        this.items.delete(name);
    };

    /**
     * Нажатие на кнопку
     */
    @action bindClick = (e, name) => {
        e.preventDefault();       
        get(this.items, name).isClicked = true;       
    };

}
/**
 * ХРАНИЛИЩЕ ПЕРЕИСПОЛЬЗУЕМЫХ КОМПОНЕНТОВ FIO
 *
 * Количество экземпляров компонента не ограничено. Каждый экземпляр обязательно регистрирует себя в @action registration
 * Возможные параметры при регистрации экземпляра:
 * @param name {String} - имя поля, по которому оно однозначно идентифицируется в хранилищах (обязательно)
 * @param value {String} - предзаданное значение поля (необязательно)
 * @param disabled {Boolean} - поле выключено или нет (необязательно)
 * @param daData {Boolean} - нужно подключать сервис подсказок или нет (необязательно)
 */

import {action, autorun, observable, get, set} from 'mobx';
import reactTriggerChange from "react-trigger-change";
import Validators from "../../../helpers/Validators";
import {
    getDaData, 
    blockValidate
} from "../../../helpers/functions";
import {
    getAttrValue,
    scrollToElement,
    getTarget
} from "../../../helpers/elementaries";

export default class FioStore {

    constructor() { 
        autorun(() => {
            /**
             * Клик по любому полю для закрытия окна подсказок. Клик по самому полю подсказок обрабатывается отдельно в setSuggestion()
             */
            const self = this;
            $("body").click((e) => {
                if (e.target.className !== "suggestion-item" && e.target.className !== "suggestion-text") {
                    const items = self.items.entries(); 
                    for (var [key, value] of items) {
                        value.suggestions = [];                       
                    }                                             
                }
            });
        })
    }

    /**
     * В объект items записываются данные каждого из экзепляров компонента Fio при их создании
     */
    @observable items = new Map([]);

    /**
     * Регистрация экземпляра компонента
     */
    @action registration = (params) => {        
        const nameExists = get(this.items, params.name);      
        if (!blockValidate({params, nameExists, type: "Fio"})) return false; 
        // расширяем items новым объектом
        const value = {
            value : params.value, 
            disabled : params.disabled,
            isCorrect : null,
            isWrong : null,
            suggestions : [],        
            daData : params.daData,
            startValidation : true,
            // элемент был однажды положительно валидирован
            onceValidated : false,
            // элемент был провалидирован при открытии
            prevalidated : false
        };
        set(this.items, params.name, value);         
        this.validate(params.name);  
    };

    /**
     * Открепление экземпляра компонента
     */
    @action unmount = (name) => {
        this.items.delete(name);
    };

    /**
     * Ввод пользовательских данных
     * Может сопровождаться подсказками
     */
    @action bindData = (e, name) => {
        const value = getTarget(e).value;
        const item = get(this.items, name);
        /**
         * Запрашиваем подсказку в сервисе DaData
         */
        if (item.daData && !item.startValidation) {
            getDaData({value, type: "fio", name})
                .then((result) => {
                    item.suggestions = result.suggestions;                    
                })
                .catch((error) => {console.log(error)})
        } else {
            item.startValidation = false;
            item.value = value;
        }
    };

    /**
     * Выбор подсказки
     */
    @action setSuggestion = (e, name) => {
        if (e) e.preventDefault();       
        get(this.items, name).value = getAttrValue(e);
        // закрываем окно с подсказками
        get(this.items, name).suggestions = [];
        get(this.items, name).isCorrect = true; 
        get(this.items, name).isWrong = false;
    };

    /**
     * Валидация поля
     */
    @action validate = (name) => {
        const callbacks = {
            success : (formatedValue) => {        
                get(this.items, name).value = formatedValue;
                get(this.items, name).isCorrect = true;
                get(this.items, name).isWrong = false;      
                get(this.items, name).onceValidated = true;
            },
            fail : (formatedValue) => {                         
                get(this.items, name).value = formatedValue;
                get(this.items, name).isCorrect = false;
                get(this.items, name).isWrong = true;             
            }
        };
        const options = {
            type : "fio"
        };
        const element = document.getElementById(name);
        new Validators(element, options, callbacks).init();
        // превалидация данных поля
        reactTriggerChange(element);            
        get(this.items, name).prevalidated = true;
    };   

}
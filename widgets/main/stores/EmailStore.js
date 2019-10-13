/**
 * ХРАНИЛИЩЕ КОМПОНЕНТА EMAIL
 */

import {action, observable} from 'mobx';
import reactTriggerChange from "react-trigger-change";
import Validators from "../../../helpers/Validators";
import {
    getTarget
} from "../../../helpers/elementaries";

export default class EmailStore {

    @observable params = {
        value : "",  
        disabled : null,
        isCorrect : null,
        isWrong : null,
        onceValidated : null,
        prevalidated : null
    }
   
    /**
     * Ввод пользовательских данных  
     */
    @action bindData = (e, name) => {      
        this.params.value = getTarget(e).value;        
    };    
    
    /**
     * Валидация поля
     */
    @action validate = (name) => {
        const callbacks = {
            success : (formatedValue) => {                                 
                this.params.value = formatedValue;
                this.params.isCorrect = true;
                this.params.isWrong = false;    
                this.params.onceValidated = true;
            },
            fail : (formatedValue) => {                                          
                this.params.value = formatedValue;
                this.params.isCorrect = false;
                this.params.isWrong = true;                    
            }
        };
        const options = {
            type : "email"
        };
        const element = document.getElementById(name);
        new Validators(element, options, callbacks).init();
        // превалидация данных поля
        reactTriggerChange(element);        
        this.params.prevalidated = true;
    };   

}
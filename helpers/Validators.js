/**
 *  sumFreeze: Boolean  - говорит, нужно ли пересчитывать размер поля ввода во время валидации. Временная мера, логику убрать в виджеты
 *
 *  если в options передать bankDetermintaion, то будет произведена автоматическая проверка имени банка
 *
 */

import {
    cardDetect,
    isSet,
    isString,
    isMeta,
    getChar,
    getCaretPosition,
    setCaretPosition,
    setVal,
    isNumeric,
    makeNumeric,
    hasTextSelected,
    isIE11,
    isIE,
    isAndroid,
    isAndroidBrowserFn
} from "./elementaries";

const needInputTimeout = !!isAndroid || !!isIE || !!isAndroidBrowserFn;

export default class Validators {

    constructor(element, options, callbacks) {
        this.type              = options.type || null;
        this.mask              = options.mask || null;
        this.success = callbacks.success;
        this.fail = callbacks.fail;
        this.element = element;
    }  

    validateEmail = () => {
        const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        $(this.element)
            .on('keyup', (e) => {})
            .on('input', (e) => {
                const value = $(this.element).val();
                if (emailRegexp.test(value)) {
                    this.success(value);               
                }
                else {
                    this.fail(value);             
                }
            })
            .on('focusout', (e) => {});
    };

    validateFio = () => {

        const ru = 'йцукенгшщзфывапролдячсмитьЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ';
        const en = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

        function clearValue(value) {
            let lastChar = value[value.length - 1];
            if (lastChar === '.' || lastChar === '-' || lastChar === ' ')
                return clearValue(value.substr(0, value.length - 1));

            let firstChar = value[0];

            if (firstChar === '.' || firstChar === '-' || firstChar === ' ')
                return clearValue(value.substr(1, value.length));

            return value;
        }

        const getValueObject = (e, customValue) => {

            const initial   = isSet(customValue) ?
                customValue : e.currentTarget.value;
            const formatted = initial
                .replace(/^./, str => str.toUpperCase())
                // .replace(/[a-zA-Z]/g,
                //     (s) => en.indexOf(s) > -1 ? ru[en.indexOf(s)] : ''
                // );
            const notuseful = initial.replace(/[a-zA-Zа-яА-Я\-\. ]/g, '').trim();
            const cursor    = isSet(customValue) ? 0 : getCaretPosition(e);

            return {initial, formatted, cursor, notuseful};
        };

        let previousValue = getValueObject(null, '');

        const handleInput = (e) => {
            const value = getValueObject(e);
            if (isIE11 && value.initial === previousValue.initial) return false;

            if (value.initial.length === value.formatted.length) {
                if (value.cursor !== value.initial.length)
                    setCaretPosition(e, value.cursor);
            } else {
                setCaretPosition(e, value.cursor - value.notuseful.length);
            }
            previousValue = value;

            if (value.formatted.length > 0) {
                this.success(value.formatted);
            } else {
                this.fail(value.formatted);
            }

        };

        $(this.element)
            .on('input', (e) => {
                if (!!needInputTimeout)
                    setTimeout(() => handleInput(e), 0);
                else
                    handleInput(e);
            })

            /**
             * При изменении положения курсора обновляем его в previousValue
             * таймаут нужен так как не все устройства сразу обновляют
             * положение курсора
             */
            .on('click touchend', (e) => {
                setTimeout(() => {
                    previousValue.cursor = getCaretPosition(e);
                }, 30);
            })

            .on('focusout', (e) => {
                let trimmedVal = clearValue(e.currentTarget.value);
                if (trimmedVal !== '') {
                    if (trimmedVal.length < 1) {
                        this.fail(trimmedVal);
                    } else {
                        if (trimmedVal.indexOf(' ') > -1) {
                            this.fail(trimmedVal);
                        } else {
                            this.success(trimmedVal)
                        }
                    }
                }
            });
    };

   
   
    init = () => {
        switch (this.type) {            
            case "fio" :
                this.validateFio();
                break;
            case "email" :
                this.validateEmail();
                break;            
            default : break
        }       

        return Promise.resolve();
    };

}
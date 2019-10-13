function identifyIsFramed() {
    let isFramed = false;
    try {
        isFramed = window != window.top || document != top.document || self.location != top.location;
    } catch (e) {
        isFramed = true;
    }
    return isFramed;
}

const classListExists = "classList" in document.documentElement;

export const isIE = (() => {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    return false;
})();

export const detectIE10 = (() => {
    if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
        return true;
    }
    else return false;
})();

export const isTouchDevice = (() => {
    try{document.createEvent("TouchEvent");
        return true;}
    catch(e){
        return false;}
})

export const isAndroid = (() => {
    const ua    = navigator.userAgent.toLowerCase();
    const match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
})();

export const isAndroidBrowserFn = (() => {
    var navU = navigator.userAgent;

// Android Mobile
    var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;

// Apple webkit
    var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
    var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
    var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));

// Chrome
    var regExChrome = new RegExp(/Chrome\/([\d.]+)/);
    var resultChromeRegEx = regExChrome.exec(navU);
    var chromeVersion = (resultChromeRegEx === null ? null : parseFloat(regExChrome.exec(navU)[1]));

//     Native Android Browser
    const isAndroidBrowser = isAndroidMobile && (appleWebKitVersion !== null && appleWebKitVersion < 537) || (chromeVersion !== null && chromeVersion < 37);
    return isAndroidBrowser ? true : false;
})();

export const isIE11 = !!(navigator.userAgent.match(/Trident/) && !!navigator.userAgent.match(/rv[ :]11/));

export const getWWidth = () => window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;

export const getWHeight = () => window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

export const getMobilBrowser = () => !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || getWWidth() < 481);

export const isFramed = identifyIsFramed();

export const isFunction = (obj) => !!obj && typeof obj === 'function';

export const isArray = (obj) => Array.isArray(obj);

export const isObject = (obj) => !!obj && Object.prototype.toString.call(obj) === '[object Object]';

export const isString = (obj) => (!!obj || obj === '') && typeof obj === 'string';

export const isElement = (obj) => typeof HTMLElement === "object" ?
obj instanceof HTMLElement :
obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";

export const returnJSON = (str) => {
    if (isObject(str))
        return str;
    else {

        if (!isSet(str) || !isString(str))
            return {};

        else if (str.slice(0, 1) === '{' && str.slice(-1) === '}') {

            let json = str;

            try {
                json = JSON.parse(
                    str
                        .replace(new RegExp("\'", "g"), "\"")
                        .replace(new RegExp("True", "g"), "true")
                        .replace(new RegExp("False", "g"), "false")
                );
            } catch (e) {
                console.error(e);
            }

            return json;
        }

        else
            return str;
    }
};

export const getFirstProperty = (object) => {
    for (var i in object) return i;
};

export const checkEmpty = (object) => {
    for (var i in object) return false;
    return true;
};

export const isSet = (object) => typeof object !== 'undefined';

export const ready = (f) => {
    setTimeout(() => {
        const st = document.readyState;
        if (st == "complete" || st == "interactive") {
            f()
        } else {
            ready(f)
        }
    }, 50);
};

export const hasClass = (el, cls) => {
    if (!el.className) return false;
    else if (classListExists) return el.classList.contains(cls);
    else return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') !== -1;
};

export const addClass = (el, cls) => {
    if (hasClass(el, cls)) return el;
    else if (classListExists) el.classList.add(cls);
    else if (!hasClass(el, cls)) el.className = el.className + ' ' + cls;
    return el;
};

export const removeClass = (el, cls) => {
    if (!hasClass(el, cls)) return el;
    else if (classListExists) el.classList.remove(cls);
    else {
        let classes = el.className.split(' ');

        for (let i = 0; i < classes.length; i++) {
            if (classes[i] == cls) {
                classes.splice(i, 1);
                i--;
            }
        }
        el.className = classes.join(' ');
    }
    return el;
};

export const addEvent = (el, type, handler) => {
    el.addEventListener ?
        el.addEventListener(type, handler, false) :
        el.attachEvent("on" + type, handler);
    return el;
};

export const empty = (el) => {
    while (el.firstChild) el.removeChild(el.firstChild);
};

export const getEnding = (number, forms) => {
    let n = parseInt(number, 10);
    if (isNaN(n)) return forms[0];
    let plural = (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    plural     = (n == 0) ? 0 : plural + 1;
    if (forms.length > plural)
        return forms[plural].replace("$", n);
    return "";
};

export const isMeta = (e) => e.metaKey || e.ctrlKey || e.altKey || e.which < 32;

export const isSpace = (e) => e.which === 32;

export const getChar = (e) => {
    if (e.which == null)
        return isMeta(e) ? null : String.fromCharCode(e.keyCode);
    if (e.which != 0 && e.charCode != 0)
        return isMeta(e) ? null : String.fromCharCode(e.which);
    return null;
};

export const getCaretPosition = (e) => {
    let el = e.currentTarget;
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();

        var r = document.selection.createRange();
        if (r == null) {
            return 0;
        }

        var re = el.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);

        return rc.text.length;
    }
    return 0;
};


// перевод курсора в нужную позицию в поле ввода
export const setCaretPosition = (e, pos, input) => {
    input = input || e.currentTarget;
    if (input.createTextRange) {
        let range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(pos, pos);
    }
};

export const setVal = (e, value) => {
    e.currentTarget.value = value;
};

export function getAttrValue(e) {
    if (e.currentTarget) {
        return e.currentTarget.getAttribute("value")
    } else {
        return e.target.getAttribute("value")
    }
}

export const isNumeric = (str) => /^\d+$/.test(str);

export const makeNumeric = (str) => str.replace(/\D+/g, '');

export const hasTextSelected = ($target) => {
    if (
        ($target.prop('selectionStart') != null &&
        $target.prop('selectionStart') !==
        $target.prop('selectionEnd')) ||
        (document.selection &&
        document.selection.createRange().text)
    ) return true;
    return false;
};

export const getProviderName = (oper_sub_id) => {
    let operEn;

    switch (oper_sub_id) {
        case 1:
            operEn = 'mts';
            break;
        case 2:
            operEn = 'bln';
            break;
        case 4:
            operEn = 'mgf';
            break;
        case 6:
            operEn = 'yota';
            break;
        case 87:
            operEn = 'tl2';
            break;
        case 200:
            operEn = 'card';
            break;
    }

    return operEn;
};

export const hideFormShowLoader = (DOM, OPTIONS) => {
    DOM.$form
        .removeClass('active')
        .addClass('inactive');
    if (OPTIONS.mobile)
        DOM.$bottom.hide();
    else
        DOM.$bottom.fadeOut(100);

    setTimeout(() => {
        RPC_Client.sayToParent('showLoader');
    }, 100);
};

export const hideLoaderShowForm = (DOM, OPTIONS) => {
    RPC_Client.sayToParent('hideLoader');

    setTimeout(() => {
        DOM.$form
            .removeClass('inactive')
            .addClass('active');
        if (OPTIONS.mobile)
            DOM.$bottom.show();
        else
            DOM.$bottom.fadeIn(100);
    }, 100);
};

export const debounce = (func, wait, immediate, timeout = null) => () => {
    let later   = () => {
        timeout = null;
        if (!immediate) func();
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func();
};

export const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const getUrlParams = (url_string) => {
    url_string = url_string.split('+').join(' ');

    const params = {};
    let tokens;
    const re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(url_string)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
};

// правильные окончания исчисляемых предметов
export const wordEndings = (value, vars) => {
    // value - значения, vars - массив из трёх вариантов
    value = parseInt(value, 10);
    if (value == 1 || (value > 20 && ((value/10 - Math.round(value/10)).toFixed(1) == 0.1))) {
        return vars[0];
    } else if (value > 1 && value < 5 || (value > 20 && ((value/10 - Math.round(value/10)).toFixed(1) > 0.1 && (value/10 - Math.round(value/10)).toFixed(1) < 0.5))) {
        return vars[1];
    } else {
        return vars[2];
    }
};

// ноль перед числом или месяцем
export const dateZero = (num) => {
    if (num < 10) num = "0" + num;
    return num;
};

// определение типа карт
export const cardDetect = (alias) => {
    if (alias.substr(0, 1) === '4')
        return "visa";
    else if (alias.match(/^(50|5[6-9]|6[0-9])/))
        return "maestro";
    else if (alias.match(/^(220[0-4])/))
        return "mir";
    else if (alias.match(/^(5[1-5]|222|22[3-9]|2[3-6])|27[0-2]/))
        return "mastercard";
    return null;
};

// валидация email
export const isEmail = (email) => {
    const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegexp.test(email);
};

// делаем массив объектов из объекта: каждый элемент массива - это поле и значение исходного объекта
export const objectsArrayFromObject = (obj) => {
    let arr = [];
    for (let i in obj) arr.push({i: obj[i]});
    return arr;
};

// Прокрутка экрана до элемента
export const scrollToElement = (element, padding) => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(element).offset().top - padding
    }, 500);
};

// Получение элемента из события
export const getTarget = (e) => {    
    if (e.currentTarget) {
        return e.currentTarget
    } else {
        return e.target
    }
};

// Приведение даты к нужному виду
export const formatDateZero = (data) => {
    data = data.split(".");
    data = data.map((item, i) => {
        if (item < 10) item = "0" + item;
        return item
    })
    return data.join(".")
};
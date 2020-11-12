// для IE11
require("es6-promise").polyfill();
require("isomorphic-fetch");

/**
 * Обычный AJAX-запрос
 *
 * @param url {String} - адрес запроса
 * @param request {String} - json-строка с объектом запроса
 * @param callbacks {Object} - коллбэк выполнения запроса
 *  - callbacks.success {Function}
 *  - callbacks.fail {Function}
 */
export function fetchOrdinary(url, request, callbacks) {
  fetch(url, {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body : request
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.code !== undefined && response.code == "0") {
        callbacks.success(response);
      } else {
        callbacks.fail(response);
      }
    })
    .catch(() => callbacks.fail())
}



/**
 * Получение подсказок с помощью сервиса DaData https://dadata.ru
 * @param value {String} - значение поля ввода, на которое нужна подсказка
 * @param type {String} - тип поля (ФИО, email)
 */
export function getDaData({value, type, name}) {
  let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/";
  switch (type) {
    case "fio" :
      url += "fio";
      break;
    case "email" :
      url += "email";
      break;
    case "address" :
      url += "address";
      break;
    default : break
  }
  return fetch(url, {
    method : "POST",
    headers : {
      "Authorization" : "Token e6d64244d04bf418dbd4074bae9e164432caf12d",
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body : JSON.stringify({
      query : value,
      parts : [name]
    })
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {console.log(error)})
}


/**
 * Проверка входных данных для типового переиспользуемого блока
 */
export function blockValidate(data) {
  if (!data.params.name) {
    console.error("Компонент " + data.type + ": отcутствует обязательный параметр [name]");
    return false
  }
  if (data.nameExists) {
    console.error("Компонент " + data.type + ": экземпляр с таким [name] уже существует");
    return false
  }
  return true
}

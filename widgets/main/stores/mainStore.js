/**
 * СТАРШИЙ КОМПОНЕНТ-ХРАНИЛИЩЕ
 *
 * Является старшим по отношению к остальным хранилищам (кроме optionsStore)
 * Слушает изменения всех остальных компонентов. Директивно изменяет параметры в observable дочерних компонентов
 * Поток данных однонаправленный: commonStore слушает все изменения, которые происходят в зависимых хранилищах
 * Другие хранилища ничего никуда не передают, только изменяют своё состояние и взаимодействуют со своим отображением
 * commonStore инициализируется последним, поэтому некоторые действия в дочерних хранилищах (например, в statusStore) запускаются при инициализации commonStore,
 * чтобы можно было слушать изменения в observable дочерних хранилищ
 */

import {observable, computed, autorun, reaction, get, action} from 'mobx';
import optionsStore from "./optionsStore";
import ButtonStore from "./ButtonStore";
import FioStore from "./FioStore";
import EmailStore from "./EmailStore";
import {
  fetchOrdinary,
} from "../../../helpers/functions";

class mainStore {

  constructor() {

    /**
     * Инициализация дочерних хранилищ
    */
    this.ButtonStore = new ButtonStore();
    this.FioStore = new FioStore();
    this.EmailStore = new EmailStore();

    autorun(() => {
      this.fillBlocks();
      this.fillData();
    });

    /**
     * Показ кнопки отправки первоначальных данных
     */
    reaction(
      () => this.dataInput,
      (result) => {
        let isIncorrect = false;
        for (let i in result) {
          for (let j in result[i]) {
            const res = result[i][j];
            if (!res.isCorrect) {
              isIncorrect = true;
            }
            this.userData[j] = res.value;
          }
        };
        if (!isIncorrect) {
          this.buttons.sendData.disabled = false;
        } else {
          this.buttons.sendData.disabled = true;
        };
      }
    );

    /**
     * Кнопка отправки первоначальных данных
     */
    reaction(
      () => this.sendDataButton,
      (result) => {
        if (result) {
          if (result.isClicked) {
            get(this.ButtonStore.items, "send_data").isClicked = false;
            const authRequestSuccess = () => {
              console.log("request is success!")
            };
            const authRequestFail = () => {
              console.log("request is fail!")
            };
            const request = {
              method : "send_userdata",
              params : {
                ...this.userData,
              }
            };
            console.log("Request body is:");
            console.log(request);
            fetchOrdinary(
              optionsStore.OPTIONS.sendIdentUrl,
              JSON.stringify(request),
              {
                success: authRequestSuccess,
                fail: authRequestFail
              }
            );
          }
        }
      }
    );
  }

  @observable userData = {
    name : "",
    surname : "",
    email : ""
  };

  @observable buttons = {
    sendData : {
      disabled : true
    }
  };

  /**
   * Схема компонентов на страницах
   * @key - имя страницы
   * @value - массив с последовательным перечислением компонентов (name, type), которые в этом порядке включаются в вёрстку на странице
  */
  componentsMap = {
    userData : [
      ["name", "fio"],
      ["surname", "fio"],
      ["email", "email"],
      ["send_data", "button"],
    ]
  };

  /**
   * Коллекции компонентов для работы listener'ов различных stores
   */
  @observable listenerBlocks = {};

  /**
   * Заполнение коллекций компонентов
   */
  @action fillBlocks = () => {
    for (let i in this.componentsMap) {
      const pageBlock = this.componentsMap[i];
      // преобразуем в объект типов компонентов (key) с массивами их имён (value)
      const blocks = {};
      pageBlock.forEach((item, i) => {
        const _name = item[0];
        const _type = item[1];
        if (!blocks[_type]) {
          blocks[_type] = [_name]
        } else {
          blocks[_type].push(_name)
        }
      })
      this.listenerBlocks[i] = blocks;
    }
  };

  /**
   * Предзаполнение полей ввода
   */
  @action fillData = () => {
    if (optionsStore.preset) {
      // проверки, чтобы избежать undefined, что поломает неконтролируемый компонент
      if (optionsStore.preset.name) {
        this.userData.name = optionsStore.preset.name;
      }
      if (optionsStore.preset.surname) {
        this.userData.surname = optionsStore.preset.surname;
      }
    }
  };

  /**
   * Listener для компонентов страницы
   */
  @computed get dataInput() {
    const mappedResult = {
      fio : {},
      email : {
        email : {},
      }
    };

    const {
      items,
      params,
    } = this.FioStore;

    if (items) {
      this.listenerBlocks.userData.fio.forEach((item) => {
        const i = get(items, item);
        if (i) {
          mappedResult.fio[item] = {
            isCorrect : i.isCorrect,
            value : i.value
          }
        }
      })
    }

    if (params) {
      mappedResult.email.email = {
        isCorrect : params.isCorrect,
        prevalidated : params.prevalidated,
        value : params.value
      }
    }

    return mappedResult
  }


  /**
   * Listener нажатия кнопки отправления данных
   */
  @computed get sendDataButton() {
    let result = {};
    const i = get(this.ButtonStore.items, "send_data");
    if (i) {
      result = {
        isClicked : i.isClicked,
      }
    }
    return result
  }

}

export default new mainStore();
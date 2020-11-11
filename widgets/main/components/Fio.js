/**
 * ПЕРЕИСПОЛЬЗУЕМЫЙ КОМПОНЕНТ ВВОДА ФИО
 *
 * Глупый компонент, предназначенный для ввода ФИО. Может предлагать подсказки с помощью сервиса DaData
 */

import React from "react";
import {inject, observer} from 'mobx-react';
import {get} from 'mobx';

@inject("FioStore")
@observer
export default class Fio extends React.Component {

  constructor(props) {
    super(props);
  };

  componentDidMount = () => {
    /**
      * Обязательная регистрация компонента с параметрами вызова
    */
    this.props.FioStore.registration(this.props);
  };

  componentWillUnmount = () => {
    this.props.FioStore.unmount(this.props.name);
  };

  render() {

    /**
     * Подсказки берутся соответственно типу запрашиваемых данных
     * Для DaData:
     * data.surname - Фамилия
     * data.name - Имя
     * https://dadata.ru/api/suggest/name
    */
    const {
      disabled,
      FioStore,
      label,
      name,
      value,
    } = this.props;

    const item = get(FioStore.items, name);
    if (item && item.isCorrect && item.onceValidated && !item.prevalidated) status = "valid";
    if (item && item.isWrong && item.onceValidated) status = "error";
    // до регистрации в store
    let _value = "";
    if (item) {
      _value = item.value;
    }

    return (
      <div className="form-group fio">
        <label htlmfor={name}>{label}</label>
        <input
          type="text"
          disabled={disabled}
          name={name}
          id={name}
          value={_value}
          onChange={(e) => FioStore.bindData(e, name)}
        />
        {(item && item.suggestions && item.suggestions.length > 0) &&
          <div className="hint-container" id={"hint-container-" + item.id}>{item.suggestions.map((suggestion, i) => {
            return (
              <div className={"suggestion-item fs-" + i} key={i} value={suggestion.data[name]} onClick={(e) => FioStore.setSuggestion(e, name)}>
                <span className="suggestion-text">{suggestion.data[name]}</span>
              </div>)
            })}
          </div>
        }
      </div>
    );
  }
}
/**
 * ПЕРЕИСПОЛЬЗУЕМЫЙ КОМПОНЕНТ КНОПКИ BUTTON
 *
 * Глупый компонент, предназначенный для отображения кнопки
 */

import React from "react";
import {inject, observer} from 'mobx-react';

@inject("ButtonStore")
@observer
export default class CustomButton extends React.Component {

  constructor(props) {
    super(props);
  };

  componentDidMount = () => {
    /**
      * Обязательная регистрация компонента с параметрами вызова
    */
    this.props.ButtonStore.registration(this.props);
  };

  componentWillUnmount = () => {
    this.props.ButtonStore.unmount(this.props.name);
  };

  render() {
    const {
      ButtonStore,
      disabled,
      name,
      text,
    } = this.props;

    return (
      <div className="form-group button">
        <button
          disabled={disabled}
          onClick={(e) => ButtonStore.bindClick(e, name)}
          name={name}
          id={name}
        >{text}</button>
      </div>
    );
  }
}
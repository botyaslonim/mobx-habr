/**
 * КОМПОНЕНТ ВВОДА EMAIL
 *
 * Глупый компонент, предназначенный для ввода email
 */

import React from "react";
import {inject, observer} from 'mobx-react';

@inject("EmailStore")
@observer
export default class Email extends React.Component {

  constructor(props) {
    super(props);
  };

  componentDidMount = () => {
    this.props.EmailStore.validate(this.props.name);
  };

  render() {
    const {
      disabled,
      EmailStore,
      label,
      name,
    } = this.props;
    const {
      bindData,
      params: {
        isCorrect,
        isWrong,
        onceValidated,
        value,
      }
    } = EmailStore;

    let status = "form-group email ";
    if (onceValidated) {
      if (isCorrect) {
        status += "valid";
      }
      if (isWrong) {
        status += "error";
      }
    }

    return (
      <div className={status}>
        <label htmlFor={name}>{label}</label>
        <input
          type="email"
          disabled={disabled}
          name={name}
          id={name}
          value={value}
          onChange={(e) => bindData(e, name)}
        />
      </div>
    );
  }
}
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

  componentWillUnmount = () => {
    this.props.EmailStore.unmount(this.props.name);
  };

  render() {
    const {
      disabled,
      EmailStore,
      label,
      name,
    } = this.props;
    const { params } = EmailStore;

    let status = "form-group email ";
    if (params.isCorrect && params.onceValidated) status += "valid";
    if (params.isWrong && params.onceValidated) status += "error";

    return (
      <div className={status}>
        <label htmlFor={name}>{label}</label>
        <input
          type="email"
          disabled={disabled}
          name={name}
          id={name}
          value={params.value}
          onChange={(e) => EmailStore.bindData(e, name)}
        />
      </div>
    );
  }
}
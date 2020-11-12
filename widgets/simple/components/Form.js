import React from "react";
import { observer, inject } from "mobx-react";

@inject("FormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      FormStore: {
        handleChange,
        handleSubmit,
        userForm = {},
      }
    } = this.props;

    return (
      <div className="container">
        <div className="form-group button">
          <label>
            Имя
            <input
              type="text"
              onChange={(e) => handleChange({
                value: e.target.value,
                name: "firstName",
              })}
              value={userForm.firstName}
            />
          </label>
          <label>
            Фамилия
            <input
              type="text"
              onChange={(e) => handleChange({
                value: e.target.value,
                name: "lastName",
              })}
              value={userForm.lastName}
            />
          </label>
          <button
            className="button"
            type="submit"
            disabled={!userForm.isValid}
            onClick={handleSubmit}
          >Послать</button>
        </div>
      </div>
    );
  }
}
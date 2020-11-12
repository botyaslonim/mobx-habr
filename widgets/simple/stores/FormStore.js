/**
 * ХРАНИЛИЩЕ КОМПОНЕНТА FORM
 */

import { observable, computed, reaction, action } from 'mobx';

const initialForm = {
  firstName: "Richard",
  lastName: "",
  isValid: false,
}

export default class FormStore {
  constructor() {
    reaction(
      () => this.dataInput,
      (result) => {
        result ? this.userForm.isValid = true : this.userForm.isValid = false;
      }
    )
  }

  @observable userForm = initialForm;

  @action handleChange = ({ name, value }) => {
    this.userForm[name] = value;
  }

  @action handleSubmit = async () => {
    console.log('Submit!');
    await fetch('https://www.google.com').catch(e => console.log(e));
    console.log('Finish');
    this.userForm = initialForm;
  }

  @computed get dataInput() {
    const { firstName, lastName } = this.userForm;
    if (firstName && lastName) {
      if (firstName.length > 2 && lastName.length > 2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false
    }
  }

}
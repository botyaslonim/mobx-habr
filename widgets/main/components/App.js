import React from "react";
import {observer, inject} from "mobx-react";
import ButtonArea from "./ButtonArea";
import Email from "./Email";
import Fio from "./Fio";
import l10n from "../../../l10n/localization.js";

@inject("mainStore")
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      mainStore: {
        userData
      }
    } = this.props;

    const {
      ru: {
        profile
      }
    } = l10n;

    return (
      <div className="container">
        <Fio
          label={profile.name}
          name={"name"}
          value={userData.name}
          daData={false}
        />
        <Fio
          label={profile.patronymic}
          name={"patronymic"}
          value={userData.patronymic}
          daData={false}
        />
        <Email
          label={profile.email}
          name={"userEmail"}
          value={userData.userEmail}
        />
        <ButtonArea />
      </div>
    );
  }
}
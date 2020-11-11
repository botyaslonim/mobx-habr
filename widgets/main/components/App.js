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
          daData={true}
        />
        <Fio
          label={profile.surname}
          name={"surname"}
          value={userData.surname}
          daData={true}
        />
        <Email
          label={profile.email}
          name={"email"}
          value={userData.email}
        />
        <ButtonArea />
      </div>
    );
  }
}
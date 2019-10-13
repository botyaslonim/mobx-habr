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
        const mainStore = this.props.mainStore;       
        return (
            <div className="container">
                <Fio
                    label={l10n.ru.profile.name}
                    name={"name"}
                    value={mainStore.userData.name}
                    daData={true}                
                />
                <Fio
                    label={l10n.ru.profile.surname}
                    name={"surname"}
                    value={mainStore.userData.surname}
                    daData={true}                  
                />
               <Email
                    label={l10n.ru.profile.email}
                    name={"email"}
                    value={mainStore.userData.email}                     
                />
                <ButtonArea />                
            </div>            
        );
    }
}
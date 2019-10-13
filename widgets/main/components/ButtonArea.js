/**
 * КОМПОНЕНТ-ОБЁРТКА ДЛЯ КНОПОК BUTTON
 *
 * Глупый компонент
 */

import React from "react";
import {inject, observer} from 'mobx-react';
import l10n from "../../../l10n/localization.js";
import Button from "./Button";

@inject("mainStore", "optionsStore")
@observer
export default class ButtonArea extends React.Component {

    constructor(props) {
        super(props);        
    };      

    render() {
        return (            
            <div className="button-container">                
                <p>{this.props.optionsStore.OPTIONS.buttonsHeading}</p>
                <Button 
                    name={"send_data"}  
                    disabled={this.props.mainStore.buttons.sendData.disabled ? true : false}
                    text={l10n.ru.common.continue}                                         
                /> 
            </div>
        );
    }
}
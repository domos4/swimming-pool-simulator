import React from "react";
import styled from "styled-components";
import SwimmingPoolModel from "./model/SwimmingPool";
import SwimmingPool from "./components/swimming-pool/SwimmingPool";
import SettingsPanel from "./components/settings-panel/SettingsPanel";
import {HEIGHT} from "./components/settings-panel/SettingsPanel";

const PADDING = 50;
const SwimmingPoolContainer = styled.div`
    padding: ${PADDING}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default class AppContent extends React.PureComponent {

    state = {
        swimmingPool: new SwimmingPoolModel()
    };

    render() {
        return (
            <SwimmingPoolContainer>
                <SettingsPanel swimmingPool={this.state.swimmingPool}/>
                <SwimmingPool
                    swimmingPool={this.state.swimmingPool}
                    width={document.documentElement.clientWidth - 2 * PADDING}
                    height={document.documentElement.clientHeight - 2 * PADDING - HEIGHT}
                />
            </SwimmingPoolContainer>
        );
    }

}

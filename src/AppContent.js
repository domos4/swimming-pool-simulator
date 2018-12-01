import React from "react";
import styled from "styled-components";
import SwimmingPool from "./model/SwimmingPool";
import SwimmingPool2 from "./swimming-pool/SwimmingPool2"; // TODO rename this windows workaround
import SettingsPanel from "./settings-panel/SettingsPanel";

const PADDING = 50;
const SwimmingPoolContainer = styled.div`
    padding: ${PADDING}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default class AppContent extends React.PureComponent {

    state = {
        swimmingPool: new SwimmingPool()
    };

    render() {
        return (
            <SwimmingPoolContainer>
                <SettingsPanel swimmingPool={this.state.swimmingPool}/>
                <SwimmingPool2
                    swimmingPool={this.state.swimmingPool}
                    width={document.documentElement.clientWidth - 2 * PADDING}
                    height={document.documentElement.clientHeight - 2 * PADDING}
                />
            </SwimmingPoolContainer>
        );
    }

}

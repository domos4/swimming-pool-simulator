import _ from "lodash";
import React from "react";
import styled from "styled-components";
import Swimmer from "./model/Swimmer";
import swimmingPool from "./model/SwimmingPool";
import SwimmingPool2 from "./swimming-pool/SwimmingPool2"; // TODO rename this windows workaround
import SettingsPanel from "./settings-panel/SettingsPanel";

const PADDING = 50;
const SwimmingPoolContainer = styled.div`
    padding: ${PADDING}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const REFRESH_RATE = 50;

function createNewSwimmer(lane) {
    return new Swimmer({positionChangeInterval: REFRESH_RATE, lane});
}

export default class AppContent extends React.PureComponent {

    state = {
        swimmers: _.times(4, (idx) => createNewSwimmer(idx + 1))
    };

    render() {
        return (
            <SwimmingPoolContainer>
                <SettingsPanel onAddSwimmerClicked={this.addSwimmer}/>
                <SwimmingPool2
                    refreshRate={REFRESH_RATE}
                    swimmers={this.state.swimmers}
                    poolLength={swimmingPool.length}
                    width={document.documentElement.clientWidth - 2 * PADDING}
                    height={document.documentElement.clientHeight - 2 * PADDING}
                />
            </SwimmingPoolContainer>
        );
    }

    addSwimmer = () => {
        this.setState({
            swimmers: _.concat(
                this.state.swimmers,
                createNewSwimmer()
            )
        })
    };

}

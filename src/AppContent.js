import React from "react";
import styled from "styled-components";
import Swimmer from "./swimmer/Swimmer";
import swimmingPool from "./swimming-pool/swimmingPool";
import SwimmingPool2 from "./swimming-pool/SwimmingPool2"; // TODO rename this windows workaround

const PADDING = 50;
const SwimmingPoolContainer = styled.div`
    padding: ${PADDING}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const REFRESH_RATE = 50;

export default class AppContent extends React.PureComponent {

    state = {
        poolData: []
    };

    constructor() {
        super();
        this.state = {
            poolData: []
        };
        const swimmer0 = new Swimmer({positionChangeInterval: REFRESH_RATE});
        const swimmer1 = new Swimmer({positionChangeInterval: REFRESH_RATE});
        const swimmer2 = new Swimmer({positionChangeInterval: REFRESH_RATE});
        const swimmer3 = new Swimmer({positionChangeInterval: REFRESH_RATE});
        setInterval(() => {
            this.setState({
                poolData: [{
                    lane: 0,
                    position: swimmer0.getPosition()
                }, {
                    lane: 1,
                    position: swimmer1.getPosition()
                }, {
                    lane: 2,
                    position: swimmer2.getPosition()
                }, {
                    lane: 3,
                    position: swimmer3.getPosition()
                }]
            });
        }, REFRESH_RATE);
    }

    render() {
        return (
            <SwimmingPoolContainer>
                <SwimmingPool2
                    data={this.state.poolData}
                    poolLength={swimmingPool.length}
                    width={document.documentElement.clientWidth - 2 * PADDING}
                    height={document.documentElement.clientHeight - 2 * PADDING}
                />
            </SwimmingPoolContainer>
        );
    }

}

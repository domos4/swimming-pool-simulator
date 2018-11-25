import React, {Component} from 'react';
import './App.css';
import Swimmer from "./Swimmer";
import SwimmingPool2 from "./SwimmingPool2";
import styled, {createGlobalStyle} from "styled-components";
import swimmingPool from "./swimmingPool";

const GlobalStyle = createGlobalStyle`
    body {
      overflow: hidden;
    }
`;

const PADDING = 50;
const SwimmingPoolContainer = styled.div`
    padding: ${PADDING}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const REFRESH_RATE = 50;

class App extends Component {

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
            <React.Fragment>
                <GlobalStyle/>
                <SwimmingPoolContainer>
                    <SwimmingPool2
                        data={this.state.poolData}
                        poolLength={swimmingPool.length}
                        width={document.documentElement.clientWidth - 2 * PADDING}
                        height={document.documentElement.clientHeight - 2 * PADDING}
                    />
                </SwimmingPoolContainer>
            </React.Fragment>
        );
    }
}

export default App;

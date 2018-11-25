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

class App extends Component {

    state = {
        poolData: []
    };

    constructor() {
        super();
        this.state = {
            poolData: []
        };
        const swimmer = new Swimmer();
        // console.log("speed: ", swimmer.getSpeed());
        setInterval(() => {
            // console.log("position: ", swimmer.getPosition());
            this.setState({
                poolData: [{
                    x: 0,
                    y: swimmer.getPosition()
                }, {x: 1, y: 0}]
            });
        }, 1000);
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

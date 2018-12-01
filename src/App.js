import React from "react";
import AppContent from "./AppContent";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: sans-serif;
    }
`;

export default class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <GlobalStyle/>
                <AppContent/>
            </React.Fragment>
        );
    }
}

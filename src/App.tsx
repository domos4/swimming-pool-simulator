import React from "react";
import AppContent from "./AppContent";
import { createGlobalStyle } from "styled-components";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

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
        <GlobalStyle />
        <AppContent />
      </React.Fragment>
    );
  }
}

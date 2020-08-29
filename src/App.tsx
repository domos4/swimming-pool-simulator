import React, { Fragment, ReactElement } from "react";
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
    
    * {
      box-sizing: border-box;
    }
  }
`;

export default function App(): ReactElement {
  return (
    <Fragment>
      <GlobalStyle />
      <AppContent />
    </Fragment>
  );
}

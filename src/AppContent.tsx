import React from "react";
import styled from "styled-components";
import SwimmingPoolModel from "./model/SwimmingPool";
import SwimmingPool from "./components/swimming-pool/SwimmingPool";
import SettingsPanel from "./components/settings-panel/SettingsPanel";
import { HEIGHT } from "./components/settings-panel/SettingsPanel";
import { PureComponent } from "react";

const PADDING = 50;
const Container = styled.div`
  padding: ${PADDING}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SETTINGS_PANEL_PADDING = 20;
const StyledSettingsPanel = styled(SettingsPanel)`
  padding-bottom: ${SETTINGS_PANEL_PADDING}px;
`;

export default class AppContent extends PureComponent {
  state = {
    swimmingPool: new SwimmingPoolModel(),
  };

  render() {
    return (
      <Container>
        <StyledSettingsPanel swimmingPool={this.state.swimmingPool} />
        <SwimmingPool
          swimmingPool={this.state.swimmingPool}
          width={document.documentElement.clientWidth - 2 * PADDING}
          height={
            document.documentElement.clientHeight -
            2 * PADDING -
            HEIGHT -
            SETTINGS_PANEL_PADDING
          }
        />
      </Container>
    );
  }
}

import React, { ReactElement, useMemo } from "react";
import styled from "styled-components";
import SwimmingPoolModel from "./model/SwimmingPool";
import SwimmingPool from "./components/swimming-pool/SwimmingPool";
import SettingsPanel, {
  HEIGHT,
} from "./components/settings-panel/SettingsPanel";

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

export default function AppContent(): ReactElement {
  const swimmingPool = useMemo(() => new SwimmingPoolModel(), []);

  return (
    <Container>
      <StyledSettingsPanel swimmingPool={swimmingPool} />
      <SwimmingPool
        swimmingPool={swimmingPool}
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

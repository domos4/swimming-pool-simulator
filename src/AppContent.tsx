import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import makeSwimmingPool from "./model/SwimmingPool";
import SwimmingPool from "./components/swimming-pool/SwimmingPool";
import SettingsPanel, {
  HEIGHT,
} from "./components/settings-panel/SettingsPanel";
import { debounce, times } from "lodash";

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
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  const swimmingPool = useMemo(makeSwimmingPool, []);

  useEffect(() => {
    times(100, swimmingPool.addSwimmer);
  }, [swimmingPool]);

  const handleWindowResize = useCallback(
    debounce(() => {
      setWidth(document.documentElement.clientWidth);
      setHeight(document.documentElement.clientHeight);
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <Container>
      <StyledSettingsPanel swimmingPool={swimmingPool} />
      <SwimmingPool
        swimmingPool={swimmingPool}
        width={width - 2 * PADDING}
        height={height - 2 * PADDING - HEIGHT - SETTINGS_PANEL_PADDING}
      />
    </Container>
  );
}

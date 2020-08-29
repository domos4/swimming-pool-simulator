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
  height as settingsPanelHeight,
} from "./components/settings-panel/SettingsPanel";
import { debounce, times } from "lodash";

const padding = 50;
const Container = styled.div`
  padding: ${padding}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const settingsPanelPadding = 20;
const StyledSettingsPanel = styled(SettingsPanel)`
  padding-bottom: ${settingsPanelPadding}px;
`;

export default function AppContent(): ReactElement {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [height, setHeight] = useState(document.documentElement.clientHeight);

  const swimmingPool = useMemo(
    () =>
      makeSwimmingPool({
        length: 50,
        lanesCount: 10,
        refreshRate: 50,
      }),
    []
  );

  useEffect(() => {
    times(100, swimmingPool.addRandomSwimmer);
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
        width={width - 2 * padding}
        height={
          height - 2 * padding - settingsPanelHeight - settingsPanelPadding
        }
      />
    </Container>
  );
}

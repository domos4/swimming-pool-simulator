import React, { Fragment, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { SwimmingPoolModel } from "../../model/SwimmingPool";
import Lane from "./Lane";

interface BaseProps {
  width: number;
  height: number;
}

const borderWidth = 2;
const border = `${borderWidth}px solid black`;

const Container = styled.div<BaseProps>`
  display: flex;
  position: relative;
  border: ${border};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const LaneDivider = styled.div`
  border-right: ${border};
`;

interface Props extends BaseProps {
  swimmingPool: SwimmingPoolModel;
}

function useForceUpdate(): () => void {
  const [unusedCounter, setCounter] = useState(0);
  return () => setCounter((counter) => counter + 1);
}

export default function SwimmingPool({
  width,
  height,
  swimmingPool,
}: Props): ReactElement {
  const contentHeight = height - 2 * borderWidth;
  const laneWidth = width / swimmingPool.getLanesCount();

  // TODO update component on model update instead of this hack
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    setTimeout(() => {
      forceUpdate();
    }, 100);
  }, [forceUpdate]);

  return (
    <Container width={width} height={height}>
      {swimmingPool.getLanes().map((lane, index) => (
        <Fragment key={index}>
          <Lane
            model={lane}
            width={laneWidth - borderWidth}
            height={contentHeight}
            scaleFactor={contentHeight / swimmingPool.getLength()}
          />
          {index !== swimmingPool.getLanesCount() - 1 && <LaneDivider />}
        </Fragment>
      ))}
    </Container>
  );
}

import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Direction, SwimmerModel } from "../../model/Swimmer";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
`;

interface Props {
  model: SwimmerModel;
  width: number;
  height: number;
  scaleFactor: number; // TODO scale with svg
}

export default function Swimmer({
  model,
  width,
  height,
  scaleFactor,
}: Props): ReactElement {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const getX = useCallback(
    (direction: Direction) => {
      if (direction === "going") {
        return width / 4;
      }
      return (3 * width) / 4;
    },
    [width]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newX = getX(model.getDirection());
      const newY = model.getPosition() * scaleFactor;
      setX(newX);
      setY(newY);
    }, model.getRefreshRate()); // refresh the interface with the same refresh rate as the model
    return () => clearInterval(intervalId);
  }, [getX, model, scaleFactor]);

  return (
    <Container>
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <circle r="10" cx={x} cy={y} opacity={0.6} />
      </svg>
    </Container>
  );
}

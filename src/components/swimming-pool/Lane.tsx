import React, { ReactElement } from "react";
import styled from "styled-components";
import Swimmer from "./Swimmer";
import { LaneModel } from "../../model/Lane";

const Container = styled.div<{
  $width: number;
  $height: number;
}>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

interface Props {
  width: number;
  height: number;
  model: LaneModel;
  scaleFactor: number;
}

export default function Lane({
  model,
  width,
  height,
  scaleFactor,
}: Props): ReactElement {
  return (
    <Container $width={width} $height={height}>
      {model.getSwimmers().map((swimmer, index) => (
        <Swimmer
          key={index}
          model={swimmer}
          scaleFactor={scaleFactor}
          width={width}
          height={height}
        />
      ))}
    </Container>
  );
}

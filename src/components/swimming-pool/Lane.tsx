import React, { ReactElement } from "react";
import styled from "styled-components";

const Container = styled.div<{
  $width: number;
}>`
  width: ${(props) => props.$width}px;
`;

interface Props {
  width: number;
}

export default function Lane({ width }: Props): ReactElement {
  return (
    <Container $width={width}>
      <div />
    </Container>
  );
}

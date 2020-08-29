import React, { ReactElement } from "react";
import { times } from "lodash";
import styled from "styled-components";
import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { SwimmingPoolModel } from "../../model/SwimmingPool";

export const height = 30;
const Container = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  height: ${height}px;
  :not(:last-child) {
    margin-right: 16px;
  }
`;
const addSwimmersButtonValues = [1, 5, 10, 20, 50];

interface Props {
  className?: string;
  swimmingPool: SwimmingPoolModel;
}

export default function SettingsPanel({
  className,
  swimmingPool,
}: Props): ReactElement {
  function addSwimmers(howManySwimmers: number) {
    times(howManySwimmers, swimmingPool.addRandomSwimmer);
  }

  return (
    <Container className={className}>
      {addSwimmersButtonValues.map((howManySwimmers, idx) => (
        <StyledButton
          key={idx}
          icon={IconNames.ADD}
          onClick={() => addSwimmers(howManySwimmers)}
        >
          add {howManySwimmers} swimmers
        </StyledButton>
      ))}
    </Container>
  );
}

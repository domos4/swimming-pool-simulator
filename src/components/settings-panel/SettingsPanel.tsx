import React, { ReactElement } from "react";
import { times } from "lodash";
import styled from "styled-components";
import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import SwimmingPool from "../../model/SwimmingPool";

export const HEIGHT = 30;
const Container = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  height: ${HEIGHT}px;
  :not(:last-child) {
    margin-right: 16px;
  }
`;
const ADD_SWIMMERS_BUTTONS_OPTIONS = [1, 5, 10, 20, 50];

interface Props {
  className?: string;
  swimmingPool: SwimmingPool;
}

export default function SettingsPanel({
  className,
  swimmingPool,
}: Props): ReactElement {
  function addSwimmers(howManySwimmers: number) {
    times(howManySwimmers, swimmingPool.addSwimmer);
  }

  return (
    <Container className={className}>
      {ADD_SWIMMERS_BUTTONS_OPTIONS.map((howManySwimmers, idx) => (
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

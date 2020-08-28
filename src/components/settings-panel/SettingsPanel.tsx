import React from "react";
import { times } from "lodash";
import { PureComponent } from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import SwimmingPool from "../../model/SwimmingPool";

export const HEIGHT = 30;
const Container = styled.div`
    display: flex;
`;
const StyledButton = styled(Button)`
    height: ${HEIGHT}px;
`;
const ADD_SWIMMERS_BUTTONS_OPTIONS = [1, 5, 10, 20, 50];

export default class SettingsPanel extends PureComponent {

    static propTypes = {
        className: PropTypes.string,
        swimmingPool: PropTypes.instanceOf(SwimmingPool)
    };

    addSwimmers = (howManySwimmers) => {
        times(howManySwimmers, this.props.swimmingPool.addSwimmer);
    };

    renderButtons() {
        return ADD_SWIMMERS_BUTTONS_OPTIONS.map((howManySwimmers, idx) => (
            <StyledButton
                key={idx}
                icon={IconNames.ADD}
                onClick={() => this.addSwimmers(howManySwimmers)}>
                add {howManySwimmers} swimmers
            </StyledButton>
        ));
    }

    render() {
        return (
            <Container className={this.props.className}>
                {this.renderButtons()}
            </Container>
        );
    }

}

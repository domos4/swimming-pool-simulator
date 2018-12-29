import _ from "lodash";
import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import {Button} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import SwimmingPool from "../../model/SwimmingPool";

export const HEIGHT = 30
;
const Container = styled.div`
    display: flex;
`;
const StyledButton = styled(Button)`
    height: ${HEIGHT}px;
`;
const ADD_SWIMMERS_BUTTONS_OPTIONS = [1, 5, 10, 20, 50];


export default class SettingsPanel extends React.PureComponent {

    static propTypes = {
        swimmingPool: PropTypes.instanceOf(SwimmingPool)
    };

    addSwimmers = (howManySwimmers) => {
        _.times(howManySwimmers, this.props.swimmingPool.addSwimmer);
    };

    renderButtons() {
        return ADD_SWIMMERS_BUTTONS_OPTIONS.map((howManySwimmers) => (
            <StyledButton
                icon={IconNames.ADD}
                onClick={() => this.addSwimmers(howManySwimmers)}>
                add {howManySwimmers} swimmers
            </StyledButton>
        ));
    }

    render() {
        return (
            <Container>
                {this.renderButtons()}
            </Container>
        );
    }

}

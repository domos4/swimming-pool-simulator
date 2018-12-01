import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import {Button} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import SwimmingPool from "../model/SwimmingPool";

const Container = styled.div`
    display: flex;
`;

export default class SettingsPanel extends React.PureComponent {

    static propTypes = {
        swimmingPool: PropTypes.instanceOf(SwimmingPool)
    };

    render() {
        return (
            <Container>
                <Button
                    icon={IconNames.ADD}
                    onClick={this.props.swimmingPool.addSwimmer}>
                    add new swimmer
                </Button>
            </Container>
        );
    }

}

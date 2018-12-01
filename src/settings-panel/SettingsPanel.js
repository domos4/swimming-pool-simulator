import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Button} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";

const Container = styled.div`
    display: flex;
`;

export default class SettingsPanel extends React.PureComponent {

    static propTypes = {
        onAddSwimmerClicked: PropTypes.func
    };

    render() {
        return (
            <Container>
                <Button
                    icon={IconNames.ADD}
                    onClick={this.props.onAddSwimmerClicked}>
                    add new swimmer
                </Button>
            </Container>
        );
    }

}

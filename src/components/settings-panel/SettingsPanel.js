import _ from "lodash";
import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import {Button} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import {IconNames} from "@blueprintjs/icons";
import SwimmingPool from "../../model/SwimmingPool";

const Container = styled.div`
    display: flex;
`;
const Item = styled.div`
    cursor: pointer;
    text-align: center;
`;

export default class SettingsPanel extends React.PureComponent {

    static propTypes = {
        swimmingPool: PropTypes.instanceOf(SwimmingPool)
    };

    state = {
        selectedNumberOfSwimmersToAdd: 10
    };

    renderItem = (item, props) => {
        return (
            <Item key={props.index} onClick={props.handleClick}>{item}</Item>
        );
    };

    onItemChange = (item) => {
        this.setState({
            selectedNumberOfSwimmersToAdd: item
        });
    };

    addSwimmers = () => {
        _.times(this.state.selectedNumberOfSwimmersToAdd, this.props.swimmingPool.addSwimmer);
    };

    render() {
        return (
            <Container>
                <Select
                    items={[1, 5, 10, 20]}
                    filterable={false}
                    itemRenderer={this.renderItem}
                    onItemSelect={this.onItemChange}>
                    <Button>{this.state.selectedNumberOfSwimmersToAdd}</Button>
                </Select>
                <Button
                    icon={IconNames.ADD}
                    onClick={this.addSwimmers}>
                    add swimmers
                </Button>
            </Container>
        );
    }

}

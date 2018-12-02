import _ from "lodash";
import * as d3 from "d3";
import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import SwimmingPoolModel from "../../model/SwimmingPool";
import {DIRECTION_GOING, DIRECTION_RETURNING} from "../../model/Swimmer";

const Container = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 2px solid black;
`;

export default class SwimmingPool extends React.PureComponent {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        swimmingPool: PropTypes.instanceOf(SwimmingPoolModel)
    };

    ref = React.createRef();
    state = {
        data: []
    };
    refreshIntervalId;

    componentDidMount() {
        this.updateData();
        this.reDrawPool();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.swimmingPool.getSwimmers(), this.props.swimmingPool.getSwimmers()) ||
            !_.isEqual(prevProps.swimmingPool.getPositionChangeInterval(), this.props.swimmingPool.getPositionChangeInterval())) {
            this.updateData();
        }
        this.reDrawPool();
    }

    render() {
        const {width, height} = this.props;
        return (
            <Container
                width={width}
                height={height}
                ref={this.ref}
            />
        );
    }

    reDrawPool() {
        this.clearAll();
        this.drawPool();
    }

    updateData() {
        const {height, swimmingPool} = this.props;
        clearInterval(this.refreshIntervalId);
        const scaleFactor = height / swimmingPool.getLength();
        this.refreshIntervalId = setInterval(() => {
            this.setState({
                data: swimmingPool.getSwimmers().map((swimmer) => ({
                    x: this.getSwimmerXPosition(swimmer),
                    y: swimmer.getPosition() * scaleFactor
                }))
            });
        }, swimmingPool.getPositionChangeInterval());
    }

    getLaneWidth() {
        return this.props.width / this.props.swimmingPool.getLanesCount();
    }

    // lane starts indexing from 1
    getLaneRightBoundXPosition(lane) {
        return (this.getLaneWidth() * lane);
    }

    // lane starts indexing from 1
    getSwimmerXPosition(swimmer) {
        const direction = swimmer.getDirection();
        const laneWidth = this.getLaneWidth();
        const lanePosition = this.getLaneRightBoundXPosition(swimmer.getLane());
        switch (direction) {
            case DIRECTION_GOING:
                return lanePosition - (laneWidth / 4);
            case DIRECTION_RETURNING:
                return lanePosition - (laneWidth * 3 / 4);
            default:
                throw new Error(`direction=${direction} must be one of [${DIRECTION_GOING}, ${DIRECTION_RETURNING}]`);
        }
    }

    clearAll() {
        d3.select(this.ref.current)
            .selectAll("*")
            .remove();
    }

    drawPool() {
        const {width, height} = this.props;

        const chart = d3.select(this.ref.current)
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height);

        this.appendCircles(chart);
        this.appendLines(chart);
    }

    appendCircles = (graph) => {
        const {data} = this.state;
        const {width, height} = this.props;
        const x = d3.scaleLinear()
            .domain([0, width])
            .range([0, width]);
        const y = d3.scaleLinear()
            .domain([0, height])
            .range([height, 0]);

        graph.selectAll()
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("cy", (d) => y(d.y))
            .attr("cx", (d, idx) => x(data[idx].x))
            .attr("r", 10)
            .style("opacity", 0.6);
    };

    appendLines = (graph) => {
        const laneMarkers = _.times(this.props.swimmingPool.getLanesCount() - 1)
            .map((idx) => this.getLaneRightBoundXPosition(idx + 1));
        graph.selectAll()
            .data(laneMarkers)
            .enter()
            .append("line")
            .attr("x1", (d) => d)
            .attr("y1", 0)
            .attr("x2", (d) => d)
            .attr("y2", this.props.height)
            .attr("stroke-width", 2)
            .attr("stroke", "black");
    };

}

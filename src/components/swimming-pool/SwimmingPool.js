import _ from "lodash";
import * as d3 from "d3";
import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import SwimmingPoolModel from "../../model/SwimmingPool";

const Container = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 1px solid black;
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
        clearInterval(this.refreshIntervalId);
        const scaleFactor = this.props.height / this.props.swimmingPool.getLength();
        this.refreshIntervalId = setInterval(() => {
            this.setState({
                data: this.props.swimmingPool.getSwimmers().map((swimmer) => ({
                    lane: swimmer.getLane(),
                    position: swimmer.getPosition() * scaleFactor
                }))
            });
        }, this.props.swimmingPool.getPositionChangeInterval());
    }

    clearAll() {
        d3.select(this.ref.current)
            .selectAll("*")
            .remove();
    }

    drawPool() {
        const {data} = this.state;
        const {width, height} = this.props;
        // x and y scales, I've used linear here but there are other options
        // the scales translate data values to pixel values for you
        const x = d3.scaleLinear()
            .domain([1, this.props.swimmingPool.getLanesCount()])  // the range of the values to plot
            .range([0, width]);        // the pixel range of the x-axis

        const y = d3.scaleLinear()
            .domain([0, height])
            .range([height, 0]);

        // the chart object, includes all margins
        const chart = d3.select(this.ref.current)
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height);

        // the main object where the chart and axis will be drawn
        const main = chart.append("g")
            .attr("width", width)
            .attr("height", height);

        // draw the graph object
        const g = main.append("svg:g");

        g.selectAll("scatter-dots")
            .data(data)  // using the values in the ydata array
            .enter().append("svg:circle")  // create a new circle for each value
            .attr("cy", (d) => y(d.position)) // translate y value to a pixel
            .attr("cx", (d, idx) => x(data[idx].lane)) // translate x value
            .attr("r", 10) // radius of circle
            .style("opacity", 0.6); // opacity of circle
    }

}

import _ from "lodash";
import * as d3 from "d3";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 1px solid black;
`;

export default class SwimmingPool2 extends React.PureComponent {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                lane: PropTypes.number,
                position: PropTypes.number,
            })
        ),
        poolLength: PropTypes.number,
    };

    static defaultProps = {
        data: []
    };

    static getDerivedStateFromProps(props) {
        const scaleFactor = props.height / props.poolLength;
        return {
            data: props.data.map((e) => ({
                ...e,
                position: e.position * scaleFactor
            }))
        };
    }

    ref = React.createRef();
    state = {
        data: []
    };

    componentDidMount() {
        this.onUpdate();
    }

    componentDidUpdate() {
        this.onUpdate();
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

    onUpdate() {
        this.clearAll();
        this.drawPool();
    }

    clearAll() {
        d3.select(this.ref.current)
            .selectAll("*")
            .remove();
    }

    getMaxBy(key) {
        const max = _.maxBy(this.state.data, (e) => e[key]);
        return _.get(max, key, 0);
    }

    drawPool() {
        const {data} = this.state;
        const {width, height} = this.props;
        // x and y scales, I"ve used linear here but there are other options
        // the scales translate data values to pixel values for you
        const x = d3.scaleLinear()
            .domain([0, this.getMaxBy("lane")])  // the range of the values to plot
            .range([0, width]);        // the pixel range of the x-axis

        const y = d3.scaleLinear()
            .domain([0, height])
            .range([height, 0]);

        // the chart object, includes all margins
        const chart = d3.select(this.ref.current)
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "chart");

        // the main object where the chart and axis will be drawn
        const main = chart.append("g")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "main");

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

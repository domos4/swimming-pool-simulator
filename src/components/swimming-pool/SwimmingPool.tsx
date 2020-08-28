import React, { createRef, PureComponent, RefObject } from "react";
import { isEqual, times } from "lodash";
import * as d3 from "d3";
import styled from "styled-components";
import SwimmingPoolModel from "../../model/SwimmingPool";
import Swimmer, {
  DIRECTION_GOING,
  DIRECTION_RETURNING,
} from "../../model/Swimmer";

const BORDER_WIDTH = 2;
const Container = styled.div<{
  width: number;
  height: number;
  ref: RefObject<HTMLDivElement>;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: ${BORDER_WIDTH}px solid black;
`;

interface Props {
  width: number;
  height: number;
  swimmingPool: SwimmingPoolModel;
}

interface DataPoint {
  x: number;
  y: number;
}

interface State {
  data: Array<DataPoint>;
}

type Graph = d3.Selection<HTMLDivElement | null, DataPoint, null, undefined>;

export default class SwimmingPool extends PureComponent<Props, State> {
  ref = createRef<HTMLDivElement>();
  state: State = {
    data: [],
  };
  refreshIntervalId = 0;

  componentDidMount() {
    this.updateData();
    this.reDrawPool();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (
      !isEqual(
        prevProps.swimmingPool.getSwimmers(),
        this.props.swimmingPool.getSwimmers()
      ) ||
      !isEqual(
        prevProps.swimmingPool.getPositionChangeInterval(),
        this.props.swimmingPool.getPositionChangeInterval()
      )
    ) {
      this.updateData();
    }
    this.reDrawPool();
  }

  render() {
    const { width, height } = this.props;
    return <Container width={width} height={height} ref={this.ref} />;
  }

  reDrawPool() {
    this.clearAll();
    this.drawPool();
  }

  updateData() {
    const { swimmingPool } = this.props;
    const height = this.calculateHeight();
    clearInterval(this.refreshIntervalId);
    const scaleFactor = height / swimmingPool.getLength();
    this.refreshIntervalId = setInterval(() => {
      this.setState({
        data: swimmingPool.getSwimmers().map((swimmer) => ({
          x: this.getSwimmerXPosition(swimmer),
          y: swimmer.getPosition() * scaleFactor,
        })),
      });
    }, swimmingPool.getPositionChangeInterval());
  }

  calculateHeight() {
    return this.props.height - 2 * BORDER_WIDTH;
  }

  getLaneWidth() {
    return this.props.width / this.props.swimmingPool.getLanesCount();
  }

  // lane starts indexing from 1
  getLaneRightBoundXPosition(lane: number) {
    return this.getLaneWidth() * lane;
  }

  // lane starts indexing from 1
  getSwimmerXPosition(swimmer: Swimmer) {
    const direction = swimmer.getDirection();
    const laneWidth = this.getLaneWidth();
    const lanePosition = this.getLaneRightBoundXPosition(swimmer.getLane());
    switch (direction) {
      case DIRECTION_GOING:
        return lanePosition - laneWidth / 4;
      case DIRECTION_RETURNING:
        return lanePosition - (laneWidth * 3) / 4;
      default:
        throw new Error(
          `direction=${direction} must be one of [${DIRECTION_GOING}, ${DIRECTION_RETURNING}]`
        );
    }
  }

  clearAll() {
    d3.select(this.ref.current).selectAll("*").remove();
  }

  drawPool() {
    const graph = d3
      .select(this.ref.current)
      .append("svg:svg")
      .attr("width", this.props.width)
      .attr("height", this.calculateHeight());

    this.appendCircles(graph as Graph);
    this.appendLines(graph as Graph);
  }

  appendCircles = (graph: Graph) => {
    const { data } = this.state;
    const { width } = this.props;
    const height = this.calculateHeight();
    const x = d3.scaleLinear().domain([0, width]).range([0, width]);
    const y = d3.scaleLinear().domain([0, height]).range([height, 0]);

    graph
      .selectAll()
      .data(data)
      .enter()
      .append("svg:circle")
      .attr("cy", (d: DataPoint) => y(d.y))
      .attr("cx", (d: DataPoint, idx: number) => x(data[idx].x))
      .attr("r", 10)
      .style("opacity", 0.6);
  };

  appendLines = (graph: Graph) => {
    const laneMarkers = times(
      this.props.swimmingPool.getLanesCount() - 1
    ).map((idx) => this.getLaneRightBoundXPosition(idx + 1));
    graph
      .selectAll()
      .data(laneMarkers)
      .enter()
      .append("line")
      .attr("x1", (d) => d)
      .attr("y1", 0)
      .attr("x2", (d) => d)
      .attr("y2", this.calculateHeight())
      .attr("stroke-width", 2)
      .attr("stroke", "black");
  };
}

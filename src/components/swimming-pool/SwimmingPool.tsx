import React, {
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { times } from "lodash";
import * as d3 from "d3";
import styled from "styled-components";
import { SwimmingPoolModel } from "../../model/SwimmingPool";
import { SwimmerModel } from "../../model/Swimmer";

const borderWidth = 2;
const Container = styled.div<{
  width: number;
  height: number;
  ref: RefObject<HTMLDivElement>;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: ${borderWidth}px solid black;
`;

interface Props {
  width: number;
  height: number;
  swimmingPool: SwimmingPoolModel;
}

interface SwimmerPosition {
  x: number;
  y: number;
}

type Graph = d3.Selection<
  HTMLDivElement | null,
  SwimmerPosition,
  null,
  undefined
>;

export default function SwimmingPool({
  width,
  height: heightFromProps,
  swimmingPool,
}: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const refreshIntervalId = useRef<number | undefined>(undefined);
  const [swimmerPositions, setSwimmerPositions] = useState<
    Array<SwimmerPosition>
  >([]);

  const height = heightFromProps - 2 * borderWidth;
  const laneWidth = width / swimmingPool.getLanesCount();

  // lane starts indexing from 1
  const getLaneRightBoundXPosition = useCallback(
    (lane: number) => {
      return laneWidth * lane;
    },
    [laneWidth]
  );

  // lane starts indexing from 1
  const getSwimmerXPosition = useCallback(
    (swimmer: SwimmerModel) => {
      const direction = swimmer.getDirection();
      const lanePosition = getLaneRightBoundXPosition(swimmer.getLane());
      switch (direction) {
        case "going":
          return lanePosition - laneWidth / 4;
        case "returning":
          return lanePosition - (laneWidth * 3) / 4;
      }
    },
    [getLaneRightBoundXPosition, laneWidth]
  );

  const updateData = useCallback(() => {
    if (refreshIntervalId.current !== undefined) {
      clearInterval(refreshIntervalId.current);
    }
    const scaleFactor = height / swimmingPool.getLength();
    refreshIntervalId.current = setInterval(() => {
      setSwimmerPositions(
        swimmingPool.getSwimmers().map((swimmer) => ({
          x: getSwimmerXPosition(swimmer),
          y: swimmer.getPosition() * scaleFactor,
        }))
      );
    }, swimmingPool.getRefreshRate());
  }, [getSwimmerXPosition, height, refreshIntervalId, swimmingPool]);

  const appendCircles = useCallback(
    (graph: Graph) => {
      const xScaleLinear = d3
        .scaleLinear()
        .domain([0, width])
        .range([0, width]);
      const yScaleLinear = d3
        .scaleLinear()
        .domain([0, height])
        .range([height, 0]);

      graph
        .selectAll()
        .data(swimmerPositions)
        .enter()
        .append("svg:circle")
        .attr("cy", (swimmerPosition: SwimmerPosition) =>
          yScaleLinear(swimmerPosition.y)
        )
        .attr("cx", (swimmerPosition: SwimmerPosition, index) =>
          xScaleLinear(swimmerPositions[index].x)
        )
        .attr("r", 10)
        .style("opacity", 0.6);
    },
    [swimmerPositions, height, width]
  );

  const appendLines = useCallback(
    (graph: Graph) => {
      const laneMarkers = times(swimmingPool.getLanesCount() - 1).map((index) =>
        getLaneRightBoundXPosition(index + 1)
      );
      graph
        .selectAll()
        .data(laneMarkers)
        .enter()
        .append("line")
        .attr("x1", (d) => d)
        .attr("y1", 0)
        .attr("x2", (d) => d)
        .attr("y2", height)
        .attr("stroke-width", 2)
        .attr("stroke", "black");
    },
    [getLaneRightBoundXPosition, height, swimmingPool]
  );

  const drawPool = useCallback(() => {
    const graph = d3
      .select(ref.current)
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    appendCircles(graph as Graph);
    appendLines(graph as Graph);
  }, [appendCircles, appendLines, height, width]);

  const clearAll = useCallback(() => {
    d3.select(ref.current).selectAll("*").remove();
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    clearAll();
    drawPool();
  }, [clearAll, drawPool]);

  return <Container width={width} height={height} ref={ref} />;
}

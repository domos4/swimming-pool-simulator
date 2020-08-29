import React, {
  ReactElement,
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
const border = `${borderWidth}px solid black`;

const Container = styled.div<{
  width: number;
  height: number;
}>`
  display: flex;
  position: relative;
  border: ${border};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Lane = styled.div<{
  width: number;
  withBorder: boolean;
}>`
  height: 100%;
  width: ${(props) => props.width}px;
  ${(props) => (props.withBorder ? `border-right: ${border};` : undefined)}
`;

const GraphMountingElement = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
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
  height,
  swimmingPool,
}: Props): ReactElement {
  const graphMountingElementRef = useRef<HTMLDivElement>(null);
  const refreshIntervalId = useRef<number | undefined>(undefined);
  const [swimmerPositions, setSwimmerPositions] = useState<
    Array<SwimmerPosition>
  >([]);

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

  const drawPool = useCallback(() => {
    const graph = d3
      .select(graphMountingElementRef.current)
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    appendCircles(graph as Graph);
  }, [appendCircles, height, width]);

  const clearAll = useCallback(() => {
    d3.select(graphMountingElementRef.current).selectAll("*").remove();
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    clearAll();
    drawPool();
  }, [clearAll, drawPool]);

  return (
    <Container width={width} height={height}>
      <GraphMountingElement ref={graphMountingElementRef} />
      {times(swimmingPool.getLanesCount(), (index) => (
        <Lane
          key={index}
          width={laneWidth}
          withBorder={index !== swimmingPool.getLanesCount() - 1}
        />
      ))}
    </Container>
  );
}

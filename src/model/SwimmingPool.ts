import { random, times } from "lodash";
import makeLane, { LaneModel } from "./Lane";
import { SwimmerModel } from "./Swimmer";

interface Props {
  length: number; // in meters
  lanesCount: number;
  refreshRate: number; // in milliseconds
}

type LaneIndex = number; // starting from 1
type LanesMap = Record<LaneIndex, LaneModel>;

export interface SwimmingPoolModel {
  getLength: () => number;
  getLanesCount: () => number;
  getRefreshRate: () => number;
  addRandomSwimmer: () => SwimmerModel;
  getLanes: () => LanesMap;
}

export default function makeSwimmingPool({
  length,
  lanesCount,
  refreshRate,
}: Props): SwimmingPoolModel {
  const lanes: LanesMap = times(lanesCount, (index) =>
    makeLane({ index: index + 1, length, refreshRate })
  ).reduce((accumulator, lane) => {
    return {
      ...accumulator,
      [lane.getIndex()]: lane,
    };
  }, {});

  function addRandomSwimmer(): SwimmerModel {
    const randomLaneIndex = random(1, lanesCount);
    return lanes[randomLaneIndex].addSwimmer();
  }

  return {
    getLength: () => length,
    getLanesCount: () => lanesCount,
    getRefreshRate: () => refreshRate,
    addRandomSwimmer,
    getLanes: () => lanes,
  };
}

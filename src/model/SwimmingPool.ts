import makeSwimmer, { SwimmerModel } from "./Swimmer";
import { random } from "lodash";

interface Props {
  length?: number; // in meters
  lanesCount?: number;
  refreshRate?: number; // in milliseconds
}

export interface SwimmingPoolModel {
  getLength: () => number;
  getLanesCount: () => number;
  getRefreshRate: () => number;
  addSwimmer: () => void;
  getSwimmers: () => Array<SwimmerModel>;
}

export default function makeSwimmingPool({
  length = 50,
  lanesCount = 10,
  refreshRate = 50,
}: Props = {}): SwimmingPoolModel {
  const swimmers: Array<SwimmerModel> = [];

  function addSwimmer(): void {
    const randomLaneIndex = random(1, lanesCount);
    const swimmer = makeSwimmer({
      laneLength: length,
      laneIndex: randomLaneIndex,
      refreshRate,
    });
    swimmers.push(swimmer);
  }

  return {
    getLength: () => length,
    getLanesCount: () => lanesCount,
    getRefreshRate: () => refreshRate,
    addSwimmer,
    getSwimmers: () => swimmers,
  };
}

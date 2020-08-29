import Swimmer from "./Swimmer";
import { random } from "lodash";

export interface SwimmingPoolModel {
  getLength: () => number;
  getLanesCount: () => number;
  getPositionChangeInterval: () => number;
  addSwimmer: () => void;
  getSwimmers: () => Array<Swimmer>;
}

export default function makeSwimmingPool({
  length = 50,
  lanesCount = 10,
  positionChangeInterval = 50,
} = {}): SwimmingPoolModel {
  const swimmers: Array<Swimmer> = [];

  function addSwimmer(): void {
    const randomLaneIndex = random(1, lanesCount);
    swimmers.push(
      new Swimmer({
        laneLength: length,
        laneIndex: randomLaneIndex,
        positionChangeInterval,
      })
    );
  }

  return {
    getLength: () => length,
    getLanesCount: () => lanesCount,
    getPositionChangeInterval: () => positionChangeInterval,
    addSwimmer,
    getSwimmers: () => swimmers,
  };
}

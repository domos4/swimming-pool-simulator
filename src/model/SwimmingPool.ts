import Swimmer from "./Swimmer";

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
    swimmers.push(
      new Swimmer({ poolLength: length, lanesCount, positionChangeInterval })
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

import makeSwimmer, { SwimmerModel } from "./Swimmer";

interface Props {
  index: number;
  length: number;
  refreshRate: number;
}

export interface LaneModel {
  getIndex: () => number;
  getLength: () => number;
  getSwimmers: () => Array<SwimmerModel>;
  addSwimmer: () => SwimmerModel;
}

export default function makeLane({
  index,
  length,
  refreshRate,
}: Props): LaneModel {
  const swimmers: Array<SwimmerModel> = [];

  function addSwimmer(): SwimmerModel {
    const swimmer = makeSwimmer({
      refreshRate,
      laneIndex: index,
      laneLength: length,
    });
    swimmers.push(swimmer);
    return swimmer;
  }

  return {
    getIndex: () => index,
    getLength: () => length,
    addSwimmer,
    getSwimmers: () => swimmers,
  };
}

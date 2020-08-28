import Swimmer from "./Swimmer";

export default class SwimmingPool {
  length;
  lanesCount;
  positionChangeInterval;
  swimmers: Array<Swimmer> = [];

  constructor({
    length = 50,
    lanesCount = 10,
    positionChangeInterval = 50,
  } = {}) {
    this.length = length;
    this.lanesCount = lanesCount;
    this.positionChangeInterval = positionChangeInterval;
  }

  getLength = () => {
    return this.length;
  };

  getLanesCount = () => {
    return this.lanesCount;
  };

  getPositionChangeInterval = () => {
    return this.positionChangeInterval;
  };

  addSwimmer = () => {
    const { length: poolLength, lanesCount, positionChangeInterval } = this;
    this.swimmers.push(
      new Swimmer({ poolLength, lanesCount, positionChangeInterval })
    );
  };

  getSwimmers = () => {
    return this.swimmers;
  };
}

import { isFinite, isInteger, random } from "lodash";

export const METERS_PER_MILLISECOND = "mpms";
export const METERS_PER_SECOND = "mps";

export const DIRECTION_GOING = 1;
export const DIRECTION_RETURNING = -1;

type Direction = typeof DIRECTION_GOING | typeof DIRECTION_RETURNING;

function getOppositeDirection(direction: Direction) {
  switch (direction) {
    case DIRECTION_GOING:
      return DIRECTION_RETURNING;
    case DIRECTION_RETURNING:
      return DIRECTION_GOING;
  }
}

interface Props {
  lanesCount: number;
  poolLength: number;
  positionChangeInterval: number;
}

export default class Swimmer {
  // pool info
  lanesCount;
  poolLength;

  // swimmer info
  lane = 1;
  speed; // in meters per millisecond
  position = 0;
  direction: Direction = DIRECTION_GOING;

  positionChangeInterval = 100; // in milliseconds

  constructor({ lanesCount, poolLength, positionChangeInterval }: Props) {
    this.poolLength = poolLength;
    this.lanesCount = lanesCount;
    this.setLane();
    this.setPositionChangeInterval(positionChangeInterval);
    this.speed = random(20, 100) / (60 * 1000); // meters per minute divided by (60 * 1000)
    setInterval(this.calculateNewPosition, this.positionChangeInterval);
  }

  setLane = (lane = random(1, this.lanesCount)) => {
    if (!isInteger(lane)) {
      throw new Error(`lane=${lane} must be an integer.`);
    }
    if (lane > this.lanesCount || lane < 1) {
      throw new Error(`lane=${lane} must be in range [1, ${this.lanesCount}]`);
    }
    this.lane = lane;
  };

  setPositionChangeInterval = (interval: number) => {
    if (!isFinite(interval) || interval <= 0) {
      throw new Error(
        `positionChangeInterval=${interval} must be finite, positive number.`
      );
    }
    this.positionChangeInterval = interval;
  };

  calculateNewPosition = () => {
    const positionChange =
      this.direction * (this.speed * this.positionChangeInterval);
    const maybeOutOfBoundsNewPosition = this.position + positionChange;
    if (maybeOutOfBoundsNewPosition < 0) {
      this.position = Math.abs(maybeOutOfBoundsNewPosition);
      this.direction = getOppositeDirection(this.direction);
    } else if (maybeOutOfBoundsNewPosition > this.poolLength) {
      this.position = 2 * this.poolLength - (this.position + positionChange);
      this.direction = getOppositeDirection(this.direction);
    } else {
      this.position = maybeOutOfBoundsNewPosition;
    }
  };

  getLane = () => {
    return this.lane;
  };

  getPosition = () => {
    return this.position;
  };

  getDirection = () => {
    return this.direction;
  };

  getSpeed = (unit = METERS_PER_MILLISECOND) => {
    switch (unit) {
      case METERS_PER_MILLISECOND:
        return this.speed;
      case METERS_PER_SECOND:
        return this.speed * (60 * 1000);
      default:
        return this.speed;
    }
  };
}

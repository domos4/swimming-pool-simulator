import { random } from "lodash";

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
  laneIndex: number; // indexing from 1
  laneLength: number; // in meters
  refreshRate: number; // in milliseconds
  speed?: number; // meters per millisecond
}

export interface SwimmerModel {
  getLane: () => number;
  getPosition: () => number;
  getDirection: () => Direction;
}

export default function makeSwimmer({
  laneIndex,
  laneLength,
  refreshRate,
  speed = random(20, 100) / (60 * 1000),
}: Props): SwimmerModel {
  let position = 0;
  let direction: Direction = DIRECTION_GOING;

  function calculateNewPosition(): void {
    const positionChange = direction * (speed * refreshRate);
    const maybeOutOfBoundsNewPosition = position + positionChange;
    if (maybeOutOfBoundsNewPosition < 0) {
      position = Math.abs(maybeOutOfBoundsNewPosition);
      direction = getOppositeDirection(direction);
    } else if (maybeOutOfBoundsNewPosition > laneLength) {
      position = 2 * laneLength - (position + positionChange);
      direction = getOppositeDirection(direction);
    } else {
      position = maybeOutOfBoundsNewPosition;
    }
  }

  setInterval(calculateNewPosition, refreshRate);

  return {
    getLane: () => laneIndex,
    getPosition: () => position,
    getDirection: () => direction,
  };
}

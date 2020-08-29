import { random } from "lodash";

const directions = {
  going: 1,
  returning: -1,
} as const;

type Direction = keyof typeof directions;

function getOppositeDirection(direction: Direction): Direction {
  if (direction === "going") {
    return "returning";
  }
  return "going";
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
  let direction: Direction = "going";

  function calculateNewPosition(): void {
    const positionChange = directions[direction] * (speed * refreshRate);
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

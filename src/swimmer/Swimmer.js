import _ from "lodash";
import swimmingPool from "../swimming-pool/swimmingPool";

export const METERS_PER_MILLISECOND = "mpms";
export const METERS_PER_SECOND = "mps";

const POOL_LENGTH = swimmingPool.length;

const DIRECTION_GOING = 1;
const DIRECTION_RETURNING = -1;

function getOppositeDirection(direction) {
    switch (direction) {
        case DIRECTION_GOING:
            return DIRECTION_RETURNING;
        case DIRECTION_RETURNING:
            return DIRECTION_GOING;
        default:
            throw new Error(`direction=${direction} must be one of [${DIRECTION_GOING}, ${DIRECTION_RETURNING}]`);
    }
}

export default class Swimmer {

    lane;
    speed; // in meters per millisecond
    position = 0;
    direction = DIRECTION_GOING;
    positionChangeInterval; // in milliseconds

    constructor({positionChangeInterval = 1000, lane} = {}) {
        this.lane = _.defaultTo(lane, _.random(1, swimmingPool.lanesCount));
        this.speed = _.random(20, 100) / (60 * 1000); // meters per minute divided by (60 * 1000)
        this.positionChangeInterval = positionChangeInterval;
        setInterval(() => this.calculateNewPosition(), this.positionChangeInterval)
    }

    calculateNewPosition() {
        const positionChange = this.direction * (this.speed * this.positionChangeInterval);
        const maybeOutOfBoundsNewPosition = this.position + positionChange;
        if (maybeOutOfBoundsNewPosition < 0) {
            this.position = Math.abs(maybeOutOfBoundsNewPosition);
            this.direction = getOppositeDirection(this.direction);
        } else if (maybeOutOfBoundsNewPosition > POOL_LENGTH) {
            this.position = 2 * POOL_LENGTH - (this.position + positionChange);
            this.direction = getOppositeDirection(this.direction);
        } else {
            this.position = maybeOutOfBoundsNewPosition;
        }
    }

    getLane() {
        return this.lane;
    }

    getPosition() {
        return this.position;
    }

    getSpeed(unit = METERS_PER_MILLISECOND) {
        switch (unit) {
            case METERS_PER_MILLISECOND:
                return this.speed;
            case METERS_PER_SECOND:
                return this.speed * (60 * 1000);
            default:
                return this.speed;
        }
    }

}

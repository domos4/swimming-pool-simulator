import _ from "lodash";

export const METERS_PER_MILLISECOND = "mpms";
export const METERS_PER_SECOND = "mps";

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

    // pool info
    lanesCount;
    poolLength;

    // swimmer info
    lane;
    speed; // in meters per millisecond
    position = 0;
    direction = DIRECTION_GOING;

    positionChangeInterval; // in milliseconds

    constructor({
                    lane,
                    lanesCount,
                    poolLength,
                    positionChangeInterval
                } = {}) {
        this.poolLength = poolLength;
        this.lanesCount = lanesCount;
        this.setLane(lane);
        this.setPositionChangeInterval(positionChangeInterval);
        this.speed = _.random(20, 100) / (60 * 1000); // meters per minute divided by (60 * 1000)
        setInterval(this.calculateNewPosition, this.positionChangeInterval)
    }

    setLane = (lane = _.random(1, this.lanesCount)) => {
        if (!_.isInteger(lane)) {
            throw new Error(`lane=${lane} must be an integer.`);
        }
        if (lane > this.lanesCount || lane < 1) {
            throw new Error(`lane=${lane} must be in range [1, ${this.lanesCount}]`);
        }
        this.lane = lane;
    };

    setPositionChangeInterval = (interval) => {
        if (!_.isFinite(interval) || interval <= 0) {
            throw new Error(`positionChangeInterval=${interval} must be finite, positive number.`);
        }
        this.positionChangeInterval = interval;
    };

    calculateNewPosition = () => {
        const positionChange = this.direction * (this.speed * this.positionChangeInterval);
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

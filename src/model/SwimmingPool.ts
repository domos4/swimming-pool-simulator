import Swimmer from "./Swimmer";

export default class SwimmingPool {

    length;
    lanesCount;
    positionChangeInterval;
    swimmers = [];

    constructor({
                    length = 50,
                    lanesCount = 10,
                    positionChangeInterval = 50
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

    addSwimmer = (lane: number) => {
        const {length: poolLength, lanesCount, positionChangeInterval} = this;
        this.swimmers.push(
            new Swimmer({lane, poolLength, lanesCount, positionChangeInterval})
        );
    };

    getSwimmers = () => {
        return this.swimmers;
    };

}


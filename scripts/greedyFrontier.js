"use strict";
class GreedyFrontier {
    constructor(goal) {
        this.frontier = [];
        this.goal = goal;
    }
    add(node) {
        this.frontier.push(node);
    }
    containsState(state) {
        for (let i = 0; i < this.frontier.length; i++) {
            if (JSON.stringify(this.frontier[i].state) == JSON.stringify(state)) {
                return true;
            }
        }
        return false;
    }
    empty() {
        return this.frontier.length == 0;
    }
    remove() {
        if (!this.frontier.length) {
            return undefined;
        }
        else {
            let lowestIndex = -1;
            let lowest = this.frontier[0];
            let lowestManhattanDistance = Infinity;
            for (let i = 0; i < this.frontier.length; i++) {
                if (manhattanDistance(this.frontier[i].state, this.goal) < lowestManhattanDistance) {
                    lowestManhattanDistance = manhattanDistance(this.frontier[i].state, this.goal);
                    lowest = this.frontier[i];
                    lowestIndex = i;
                }
            }
            this.frontier.splice(lowestIndex, 1);
            return lowest;
        }
    }
}

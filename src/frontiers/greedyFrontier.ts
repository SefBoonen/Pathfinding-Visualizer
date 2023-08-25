import { Frontier } from "./frontier";
import { manhattanDistance } from "../index";
import { Nodes } from "../nodes";

class GreedyFrontier extends Frontier {
    goal: number[];

    constructor(goal: number[]) {
        super();
        this.goal = goal;
    }

    remove() {
        if (this.empty()) {
            return undefined;
        } else {
            let lowestIndex: number = -1;
            let lowest: Nodes = this.frontier[0];
            let lowestManhattanDistance = Infinity;
            for (let i = 0; i < this.frontier.length; i++) {
                if (
                    manhattanDistance(this.frontier[i].state, this.goal) <
                    lowestManhattanDistance
                ) {
                    lowestManhattanDistance = manhattanDistance(
                        this.frontier[i].state,
                        this.goal
                    );
                    lowest = this.frontier[i];
                    lowestIndex = i;
                }
            }
            this.frontier.splice(lowestIndex, 1);
            return lowest;
        }
    }
}

export { GreedyFrontier };
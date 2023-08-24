import { Frontier } from "./frontier";
import { Nodes } from "../nodes";
import { manhattanDistance } from "../index";

class AStarFrontier extends Frontier {
    goal: number[];

    constructor(goal: number[]) {
        super();
        this.goal = goal;
    }

    remove() {
        if (this.empty()) {
            return undefined;
        } else {
            let lowestIndex = -1;
            let lowest = this.frontier[0];
            let lowestAStar = Infinity;
            for (let i = this.frontier.length - 1; i >= 0; i--) {
                if (
                    (manhattanDistance(this.frontier[i].state, this.goal) +
                        this.countParents(this.frontier[i])) <
                    lowestAStar
                ) {
                    lowestAStar =
                        manhattanDistance(this.frontier[i].state, this.goal) +
                        this.countParents(this.frontier[i]);
                    lowest = this.frontier[i];
                    lowestIndex = i;
                }
            }
            this.frontier.splice(lowestIndex, 1);
            return lowest;
        }
    }

    countParents(node: any) {
        let count = 0;
        while (node.parent != null) {
            count++;
            node = node.parent;
        }
        return count;
    }
}

export { AStarFrontier };

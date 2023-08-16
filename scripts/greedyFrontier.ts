class GreedyFrontier {
    frontier: Nodes[];
    goal: number[];

    constructor(goal: number[]) {
        this.frontier = [];
        this.goal = goal;
    }

    add(node: Nodes) {
        this.frontier.push(node);
    }

    containsState(state: number[]) {
        for(let i = 0; i < this.frontier.length; i++) {
            if(JSON.stringify(this.frontier[i].state) == JSON.stringify(state)) {
                return true;
            }
        }
        return false;
    }

    empty() {
        return this.frontier.length == 0;
    }

    remove() {
        if(!this.frontier.length) {
            return undefined;
        } else {
            let lowest = [];
            let lowestManhattanDistance = Infinity;
            for(let i = 0; i < this.frontier.length; i++) {

            }
        }
    }
}
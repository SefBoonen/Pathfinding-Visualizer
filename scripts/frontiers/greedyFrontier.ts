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
            let lowestIndex: number = -1;
            let lowest: Nodes = this.frontier[0];
            let lowestManhattanDistance = Infinity;
            for(let i = 0; i < this.frontier.length; i++) {
                if(manhattanDistance(this.frontier[i].state, this.goal) < lowestManhattanDistance) {
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
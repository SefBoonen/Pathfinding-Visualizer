class Frontier {
    frontier: Nodes[];

    constructor() {
        this.frontier = [];
    }

    add(node: Nodes) {
        this.frontier.push(node);
    }

    containsState(state: number[]) {
        for (let i = 0; i < this.frontier.length; i++) {
            if (
                JSON.stringify(this.frontier[i].state) == JSON.stringify(state)
            ) {
                return true;
            }
        }
        return false;
    }

    empty() {
        return this.frontier.length == 0;
    }

    remove() {
        throw new Error("Remove method not implemented");
    }
}

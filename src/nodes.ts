class Nodes {
    state: number[];
    parent: Nodes | null;
    action: number[] | null;

    constructor(
        state: number[],
        parent: Nodes | null,
        action: number[] | null
    ) {
        this.state = state;
        this.parent = parent;
        this.action = action;
    }
}

export { Nodes };

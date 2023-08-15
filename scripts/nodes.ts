class Nodes {
    state: any;
    parent: Nodes | null;
    action: any;

    constructor(state: any, parent: Nodes | null, action: any) {
        this.state = state;
        this.parent = parent;
        this.action = action;
    }
}
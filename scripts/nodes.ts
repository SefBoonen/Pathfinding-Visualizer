class Nodes {
    state: any;
    parent: Nodes | null;
    action: any;

    constructor(state: any, parent: Nodes | null, action: any) {
        this.state = state;
        this.parent = parent;
        this.action = action;
    }

    getState() {
        return this.state;
    }

    getParent() {
        return this.parent;
    }

    getAction() {
        return this.action;
    }
}
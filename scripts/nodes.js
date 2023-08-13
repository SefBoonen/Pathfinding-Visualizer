"use strict";
class Nodes {
    constructor(state, parent, action) {
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

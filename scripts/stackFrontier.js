"use strict";
class StackFrontier {
    constructor() {
        this.frontier = [];
    }
    add(node) {
        this.frontier.push(node);
    }
    containsState(state) {
        for (let i = 0; i < this.frontier.length; i++) {
            if (JSON.stringify(this.frontier[i].getState()) == JSON.stringify(state)) {
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
            return this.frontier.pop();
        }
    }
}

class QueueFrontier {
    constructor() {
        this.frontier = [];
    }

    add(node) {
        this.frontier.push(node);
    }

    containsState(state) {
        for(i = 0; i < this.frontier.length; i++) {
            if(this.frontier[0].getState() == state) {
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
            return null;
        } else {
            return this.frontier.shift();
        }
    }

    display() {
        return this.frontier;
    }
    
}
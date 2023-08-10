class QueueFrontier {
    constructor() {
        this.frontier = [];
    }

    add(node) {
        this.frontier.push(node);
    }

    containsState(state) {
        console.log(`state = ${this.frontier[0].getState()}`)
        for(i = 0; i < this.frontier.length; i++) {
            console.log(`currstate = ${this.frontier[i].getState()}`)
            if(this.frontier[i].getState() == state) {
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
class QueueFrontier extends Frontier{

    constructor() {
        super();
    }
    
    remove() {
        if(!this.frontier.length) {
            return undefined;
        } else {
            return this.frontier.shift();
        }
    }
}
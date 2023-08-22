import { Frontier } from "./frontier";
import { Nodes } from "../nodes";

class AStarFrontier extends Frontier {
    constructor() {
        super();
    }

    remove() {
        
    }

    countParents(node: Nodes) {
        let count = 0;
        while(node.parent != null) {
            count++;
            node = node.parent;
        }
        return count;
    }
}

export { AStarFrontier };

const container = document.getElementById("container");
if(!container) throw new Error("Container not found");
const bSolve = document.getElementById("solve");
if(!bSolve) throw new Error("Solve button not found");
const sSpeed = document.getElementById("speed");
if(!sSpeed) throw new Error("Speed slider not found");
const speedNum = document.getElementById("speednum");
if(!speedNum) throw new Error("Speed number element not found");
const menuPathfinding = document.getElementById("pathfinding-algorithm");
if(!menuPathfinding) throw new Error("Pathfinding menu not found");

const height: number = 10;
const width: number = 30;

let table: string = "";

let sSpeedValue = (<HTMLInputElement>sSpeed).value;
let menuPathfindingValue = (<HTMLInputElement>menuPathfinding).value;

const goal: number[] = [5, 15];
const start: number[] = [0, 0];

let field: number[][] = [];

container.addEventListener("click", function(e) {
    const cell = (<Element>e.target).closest("td");
    if(!cell) {
        return;
    }
    const row = cell.parentElement;
    console.log(cell.id, (<HTMLTableRowElement>row).rowIndex, cell.cellIndex)
});

document.addEventListener("DOMContentLoaded", () => {
    for(let i = 0; i < height; i ++) {
        field.push([]);
        table += "<tr>";
        for(let j = 0; j < width; j++) {
            if(i == goal[0] && j == goal[1]) {
                field[i].push(1);
            } else if (i == start[0] && j == start[1]) {
                field[i].push(2);
            } else {
                field[i].push(0);
            }
            table += `<td id="C${[i + "-" + j]}"></td>`;
        }
        table += "</tr>";
    }
    container.innerHTML = table;

    document.getElementById(`C${start[0]}-${start[1]}`)!.style.cssText += "background-color: green !important";
    document.getElementById(`C${goal[0]}-${goal[1]}`)!.style.cssText += "background-color: yellow !important";
});

sSpeed.addEventListener("input", () => {
    speedNum.innerHTML = sSpeedValue;
});

bSolve.addEventListener("click", () => {
    solve(parseInt(sSpeedValue));
});

function neighbours(position: number[]) {
    let moves: number[][] = [];

    if(position[1] - 1 >= 0) {
        moves.push([position[0], position[1] - 1]);
    }
    if(position[1] + 1 < width) {
        moves.push([position[0], position[1] + 1]);
    }
    if(position[0] + 1 < height) {
        moves.push([position[0] + 1, position[1]]);
    }
    if(position[0] - 1 >= 0) {
        moves.push([position[0] - 1, position[1]]);
    }

    return moves;
}

async function solve(delay: number) {
    let frontier = new QueueFrontier();
    if(menuPathfindingValue == "bfs") {
        frontier = new QueueFrontier();
    } else if(menuPathfindingValue == "dfs") {
        frontier = new StackFrontier();
    }
    
    frontier.add(new Nodes(start, null, null));
    
    let list = [];
    let explored: number[][] = [];

    while(true) {
        if(frontier.empty()) {
            return null;
        }

        let curnode: any = frontier.remove();

        if(JSON.stringify(curnode.getState()) == JSON.stringify(goal)) {
            return null;
        }

        document.getElementById(`C${curnode.getState()[0]}-${curnode.getState()[1]}`)!.style.cssText += "background-color: red";

        explored.push(curnode.getState());

        let actions = neighbours(curnode.getState());

        await wait(delay);

        for(let i = 0; i < actions.length; i++) {
            if(!arrContains(explored, actions[i]) && !frontier.containsState(actions[i])) {
                let child = new Nodes(actions[i], curnode, curnode.getState());
                frontier.add(child);
            }
        }
    }
}


function arrContains(array: any[], element: any) {
    for(let i = 0; i < array.length; i++) {
        if(JSON.stringify(array[i]) == JSON.stringify(element)) {
            return true;
        }
    }
    return false;
}

function wait(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


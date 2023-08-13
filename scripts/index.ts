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
const bSetGoal = document.getElementById("setgoal");
if(!bSetGoal) throw new Error("Set goal button not found");
const bSetStart = document.getElementById("setstart");
if(!bSetStart) throw new Error("Set start button not found");

const finishc = "rgb(48, 49, 52)", startc = "rgb(48, 49, 52)", buttonc = "", exploredc = "#3b9aed";

const height: number = 30;
const width: number = 60;

let screenWidth = screen.width;

let table = "";

let sSpeedValue = (<HTMLInputElement>sSpeed).value;

const goal = [5, 15];
const start = [0, 0];

let setGoal = false;
let setStart = false;

let field: number[][] = [];

container.addEventListener("click", (e) => {
    const cell = (<Element>e.target).closest("td");
    if(!cell) {
        return;
    }
    const row = cell.parentElement;
    console.log(cell.id, (<HTMLTableRowElement>row).rowIndex, cell.cellIndex);
});

bSetStart.addEventListener("click", () => {
    if(setStart) {
        bSetStart.style.backgroundColor = "";
        setStart = false;
    } else {
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
    }
});

bSetGoal.addEventListener("click", () => {
    if(setGoal) {
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    } else {
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
    }
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

    document.getElementById(`C${start[0]}-${start[1]}`)!.style.cssText += `background-color: ${startc}; border: solid 1px #00ff00;`;
    document.getElementById(`C${goal[0]}-${goal[1]}`)!.style.cssText += `background-color: ${finishc}; border: solid 1px yellow;`;
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
    if((<HTMLInputElement>menuPathfinding).value == "bfs") {
        frontier = new QueueFrontier();
    } else if((<HTMLInputElement>menuPathfinding).value == "dfs") {
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

        document.getElementById(`C${curnode.getState()[0]}-${curnode.getState()[1]}`)!.style.cssText += `background-color: ${exploredc}; border: solid 1px rgba(38, 39, 49, 0.2);`;

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


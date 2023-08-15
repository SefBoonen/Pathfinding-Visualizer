const container = document.getElementById("container");
if(!container) throw new Error("Container not found");
const bSolve = document.getElementById("solve");
if(!bSolve) throw new Error("Solve button not found");
const menuPathfinding = document.getElementById("pathfinding-algorithm");
if(!menuPathfinding) throw new Error("Pathfinding menu not found");
const bSetGoal = document.getElementById("setgoal");
if(!bSetGoal) throw new Error("Set goal button not found");
const bSetStart = document.getElementById("setstart");
if(!bSetStart) throw new Error("Set start button not found");
const bAddWalls = document.getElementById("addwalls");
if(!bAddWalls) throw new Error("Add walls button not found");
const bStop = document.getElementById("stop");
if(!bStop) throw new Error("Stop button not found");

const finishc = "rgb(48, 49, 52)", 
startc = "rgb(48, 49, 52)", 
buttonc = "rgb(57, 68, 87)", 
exploredc = "#3b9aed", 
startborderc = "#00ff00", 
finishborderc = "yellow", 
wallc = "white";

const height: number = Math.floor(window.innerHeight / 30);
const width: number = Math.floor(window.innerWidth / 30);
// 0 = blank space, 1 = goal, 2 = start, 3 = wall
let field: number[][] = [];

let table = "";

let goal = [Math.floor(height / 2), Math.floor(width * 0.75)];
let start = [Math.floor(height / 2), Math.floor(width * 0.25)];

let setGoal = false;
let setStart = false;
let addWalls = false;
let stopBool = false;
let placeWalls = false;
let removeWalls = false;

document.addEventListener("contextmenu", (event) => {
    event.preventDefault()
});

container.addEventListener("dragstart", function() {
    return false;
});

container.addEventListener("mousedown", (e) => {
    const cell = (<Element>e.target).closest("td");
    if(!cell) {
        return;
    }

    const row = cell.parentElement;
    const clickPos = [(<HTMLTableRowElement>row).rowIndex, cell.cellIndex];

    if(e.buttons == 1) {
        placeWalls = true;
        if (addWalls && field[clickPos[0]][clickPos[1]] == 0) {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`)!.style.cssText = `background-color: ${wallc} !important; border: solid 1px rgba(1, 1, 1, 0)`;
        }
    } else if (e.buttons == 2) {
        removeWalls = true;
        if (field[clickPos[0]][clickPos[1]] == 3 && addWalls) {
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`)!.style.cssText = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }
    }
});

document.addEventListener("mouseup", (e) => {
    if(e.button == 0) {
        placeWalls = false;
        console.log("mouseup")
    } else if (e.button == 2) {
        removeWalls = false;
    }
});

container.addEventListener("mouseover", (e) => {
    const cell = (<Element>e.target).closest("td");
    if(!cell) {
        return;
    }

    const row = cell.parentElement;
    const clickPos = [(<HTMLTableRowElement>row).rowIndex, cell.cellIndex];
    
    if (addWalls) {
        if(placeWalls && field[clickPos[0]][clickPos[1]] == 0) {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`)!.style.cssText = `background-color: ${wallc} !important; border: solid 1px rgba(1, 1, 1, 0)`;

        } else if (removeWalls && field[clickPos[0]][clickPos[1]] == 3) {
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`)!.style.cssText = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }

    }
});

container.addEventListener("click", (e) => {
    const cell = (<Element>e.target).closest("td");
    if(!cell) {
        return;
    }

    const row = cell.parentElement;
    const clickPos = [(<HTMLTableRowElement>row).rowIndex, cell.cellIndex];
    
    if(setGoal && field[clickPos[0]][clickPos[1]] == 0) {
        document.getElementById(`C${goal[0]}-${goal[1]}`)!.style.cssText = "";
        goal = clickPos;
        document.getElementById(`C${goal[0]}-${goal[1]}`)!.style.cssText = `background-color: ${finishc}; border: solid 1px ${finishborderc};`;

    } else if (setStart && field[clickPos[0]][clickPos[1]] == 0) {
        document.getElementById(`C${start[0]}-${start[1]}`)!.style.cssText = "";
        start = clickPos;
        document.getElementById(`C${start[0]}-${start[1]}`)!.style.cssText = `background-color: ${startc}; border: solid 1px ${startborderc};`;
    }
});

bStop.addEventListener("click", () => {
    stopBool = true;
});

bSetStart.addEventListener("click", () => {
    if(setStart) {
        bSetStart.style.backgroundColor = "";
        setStart = false;
    } else if (setGoal && !setStart && !addWalls){
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    } else if (!setGoal && !setStart && addWalls){
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
        bAddWalls.style.backgroundColor = "";
        addWalls = false;
    } else {
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
    }
});

bSetGoal.addEventListener("click", () => {
    if(setGoal) {
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    } else if (setStart && !setGoal && !addWalls){
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
        bSetStart.style.backgroundColor = "";
        setStart = false;
    } else if (!setStart && !setGoal && addWalls){
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
        bAddWalls.style.backgroundColor = "";
        addWalls = false;
    } else {
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
    }
});

bAddWalls.addEventListener("click", () => {
    if(addWalls) {
        bAddWalls.style.backgroundColor = "";
        addWalls = false;
    } else if (setStart && !setGoal && !addWalls){
        bAddWalls.style.backgroundColor = buttonc;
        addWalls = true;
        bSetStart.style.backgroundColor = "";
        setStart = false;
    } else if (!setStart && setGoal && !addWalls){
        bAddWalls.style.backgroundColor = buttonc;
        addWalls = true;
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    } else {
        bAddWalls.style.backgroundColor = buttonc;
        addWalls = true;
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

    document.getElementById(`C${start[0]}-${start[1]}`)!.style.cssText = `background-color: ${startc}; border: solid 1px ${startborderc};`;
    document.getElementById(`C${goal[0]}-${goal[1]}`)!.style.cssText = `background-color: ${finishc}; border: solid 1px ${finishborderc};`;
});

bSolve.addEventListener("click", () => {
    solve();
});

function neighbours(position: number[]) {
    let moves: number[][] = [];

    if(position[1] - 1 >= 0) {
        if(field[position[0]][position[1] - 1] != 3) {
            moves.push([position[0], position[1] - 1]);
        }
    }
    if(position[1] + 1 < width) {
        if(field[position[0]][position[1] + 1] != 3) {
            moves.push([position[0], position[1] + 1]);
        }
    }
    if(position[0] + 1 < height) {
        if(field[position[0] + 1][position[1]] != 3) {
            moves.push([position[0] + 1, position[1]]);
        }  
    }
    if(position[0] - 1 >= 0) {
        if(field[position[0] - 1][position[1]] != 3) {
            moves.push([position[0] - 1, position[1]]);
        }
    }

    return moves;
}

async function solve() {
    setButtonsDisabled(true);
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
        if(stopBool) {
            stopBool = false;
            setButtonsDisabled(false);
            return;
        }
        if(frontier.empty()) {
            setButtonsDisabled(false);
            
            return null;
        }

        let curnode: any = frontier.remove();

        if(JSON.stringify(curnode.state) == JSON.stringify(goal)) {
            setButtonsDisabled(false);
            return null;
        }

        document.getElementById(`C${curnode.state[0]}-${curnode.state[1]}`)!.style.cssText += `background-color: ${exploredc}; border: solid 1px rgba(38, 39, 49, 0.2);`;

        explored.push(curnode.state);

        let actions = neighbours(curnode.state);

        await wait(0);

        for(let i = 0; i < actions.length; i++) {
            if(!arrContains(explored, actions[i]) && !frontier.containsState(actions[i])) {
                let child = new Nodes(actions[i], curnode, curnode.state);
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

function setButtonsDisabled(bool: boolean) {
    (<HTMLButtonElement>bSolve).disabled = bool;
    (<HTMLButtonElement>bSetStart).disabled = bool;
    (<HTMLButtonElement>bSetGoal).disabled = bool;
    (<HTMLButtonElement>menuPathfinding).disabled = bool;
}

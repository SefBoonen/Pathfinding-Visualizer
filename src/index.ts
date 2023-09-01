import { Nodes } from "./nodes";
import { GreedyFrontier } from "./frontiers/greedyFrontier";
import { QueueFrontier } from "./frontiers/queueFrontier";
import { StackFrontier } from "./frontiers/stackFrontier";
import { AStarFrontier } from "./frontiers/aStarFrontier";

const container = document.getElementById("container");
const bSolve = document.getElementById("solve");
const menuPathfinding = document.getElementById("pathfinding-algorithm");
const bSetGoal = document.getElementById("setgoal");
const bSetStart = document.getElementById("setstart");
const bAddWalls = document.getElementById("addwalls");
const bReset = document.getElementById("reset");
const bGenMaze = document.getElementById("mazegen");
const bRandomFill = document.getElementById("randomfill");
if (!bGenMaze) throw new Error("Maze generation button not found");
if (!bRandomFill) throw new Error("Randomfill button not found");
if (!container) throw new Error("Container not found");
if (!bSolve) throw new Error("Solve button not found");
if (!menuPathfinding) throw new Error("Pathfinding menu not found");
if (!bSetGoal) throw new Error("Set goal button not found");
if (!bSetStart) throw new Error("Set start button not found");
if (!bAddWalls) throw new Error("Add walls button not found");
if (!bReset) throw new Error("Reset button not found");

const height: number =
    Math.ceil(Math.floor(window.innerHeight) / 25 / 2.0) * 2 + 1;
const width: number =
    Math.ceil(Math.floor(window.innerWidth / 25) / 2.0) * 2 + 1;
// 0 = blank space, 1 = goal, 2 = start, 3 = wall, 4 = explored
let field: number[][] = [];

let table = "";

let goal = [height - 2, width - 2];
let start = [1, 1];

let setGoal = false;
let setStart = false;
let addWalls = false;
let stopBool = false;
let placeWalls = false;
let removeWalls = false;

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

container.onmousedown = function () {
    return false;
};

container.addEventListener("mousedown", (e) => {
    const cell = (<Element>e.target).closest("td");
    if (!cell) {
        return;
    }

    const row = cell.parentElement;
    const clickPos = [(<HTMLTableRowElement>row).rowIndex, cell.cellIndex];

    if (e.buttons == 1) {
        placeWalls = true;
        if (addWalls && field[clickPos[0]][clickPos[1]] == 0) {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(
                `C${clickPos[0]}-${clickPos[1]}`
            )!.className = "wall";
        }
    } else if (e.buttons == 2) {
        removeWalls = true;
        if (field[clickPos[0]][clickPos[1]] == 3 && addWalls) {
            document.getElementById(
                `C${clickPos[0]}-${clickPos[1]}`
            )!.className = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }
    }
});

document.addEventListener("mouseup", (e) => {
    if (e.button == 0) {
        placeWalls = false;
    } else if (e.button == 2) {
        removeWalls = false;
    }
});

container.addEventListener("mouseover", (e) => {
    const cell = (<Element>e.target).closest("td");
    if (!cell) {
        return;
    }

    const row = cell.parentElement;
    const clickPos = [(<HTMLTableRowElement>row).rowIndex, cell.cellIndex];

    if (addWalls) {
        if (placeWalls && field[clickPos[0]][clickPos[1]] == 0) {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(
                `C${clickPos[0]}-${clickPos[1]}`
            )!.className = "wall";
        } else if (removeWalls && field[clickPos[0]][clickPos[1]] == 3) {
            document.getElementById(
                `C${clickPos[0]}-${clickPos[1]}`
            )!.className = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }
    }
});

container.addEventListener("click", (e) => {
    const cell = (<Element>e.target).closest("td");
    if (!cell) {
        return;
    }

    const row = cell.parentElement;
    const clickPos = [(<HTMLTableRowElement>row).rowIndex, cell.cellIndex];

    if (setGoal && field[clickPos[0]][clickPos[1]] == 0) {
        document.getElementById(`C${goal[0]}-${goal[1]}`)!.className = "";
        goal = clickPos;
        document.getElementById(`C${goal[0]}-${goal[1]}`)!.className =
            "finishcell";
    } else if (setStart && field[clickPos[0]][clickPos[1]] == 0) {
        document.getElementById(`C${start[0]}-${start[1]}`)!.className = "";
        start = clickPos;
        document.getElementById(`C${start[0]}-${start[1]}`)!.className =
            "startcell";
    }
});

bGenMaze.addEventListener("click", () => {});

bReset.addEventListener("click", () => {
    stopBool = true;
    clearExplored();
    addFS();
    clearNotFound();
});

bSetStart.addEventListener("click", () => {
    if (setStart) {
        bSetStart.style.backgroundColor = "";
        setStart = false;
    } else if (setGoal && !setStart && !addWalls) {
        bSetStart.className = "activated-button";
        setStart = true;
        bSetGoal.className = "";
        setGoal = false;
    } else if (!setGoal && !setStart && addWalls) {
        bSetStart.className = "activated-button";
        setStart = true;
        bAddWalls.className = "";
        addWalls = false;
    } else {
        bSetStart.className = "activated-button";
        setStart = true;
    }
});

bSetGoal.addEventListener("click", () => {
    if (setGoal) {
        bSetGoal.className = "";
        setGoal = false;
    } else if (setStart && !setGoal && !addWalls) {
        bSetGoal.className = "activated-button";
        setGoal = true;
        bSetStart.className = "";
        setStart = false;
    } else if (!setStart && !setGoal && addWalls) {
        bSetGoal.className = "activated-button";
        setGoal = true;
        bAddWalls.className = "";
        addWalls = false;
    } else {
        bSetGoal.className = "activated-button";
        setGoal = true;
    }
});

bAddWalls.addEventListener("click", () => {
    if (addWalls) {
        bAddWalls.className = "";
        addWalls = false;
    } else if (setStart && !setGoal && !addWalls) {
        bAddWalls.className = "activated-button";
        addWalls = true;
        bSetStart.className = "";
        setStart = false;
    } else if (!setStart && setGoal && !addWalls) {
        bAddWalls.className = "activated-button";
        addWalls = true;
        bSetGoal.className = "";
        setGoal = false;
    } else {
        bAddWalls.className = "activated-button";
        addWalls = true;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < height; i++) {
        field.push([]);
        table += "<tr>";
        for (let j = 0; j < width; j++) {
            if (i == goal[0] && j == goal[1]) {
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

    document.getElementById(`C${start[0]}-${start[1]}`)!.className =
        "startcell";
    document.getElementById(`C${goal[0]}-${goal[1]}`)!.className = "finishcell";
});

bSolve.addEventListener("click", () => {
    solve();
});

bGenMaze.addEventListener("click", () => {
    genMaze();
});

bRandomFill.addEventListener("click", () => {
    let candidates = [];
    let fillPerc = 0.1;

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] == 0) {
                candidates.push([i, j]);
            }
        }
    }

    for (let i = 0; i < Math.floor(height * width * fillPerc); i++) {
        let random = Math.floor(Math.random() * (candidates.length + 1));
        field[candidates[random][0]][candidates[random][1]] = 3;
        document.getElementById(
            `C${candidates[random][0]}-${candidates[random][1]}`
        )!.className = "wall";
    }
});

function neighbours(position: number[]) {
    let moves: number[][] = [];

    if (position[1] - 1 >= 0) {
        if (field[position[0]][position[1] - 1] != 3) {
            moves.push([position[0], position[1] - 1]);
        }
    }
    if (position[1] + 1 < width) {
        if (field[position[0]][position[1] + 1] != 3) {
            moves.push([position[0], position[1] + 1]);
        }
    }
    if (position[0] + 1 < height) {
        if (field[position[0] + 1][position[1]] != 3) {
            moves.push([position[0] + 1, position[1]]);
        }
    }
    if (position[0] - 1 >= 0) {
        if (field[position[0] - 1][position[1]] != 3) {
            moves.push([position[0] - 1, position[1]]);
        }
    }

    return randomiseArray(moves);
}

async function solve() {
    setButtonsDisabled(true);
    let frontier = new QueueFrontier();
    if ((<HTMLInputElement>menuPathfinding).value == "bfs") {
        frontier = new QueueFrontier();
    } else if ((<HTMLInputElement>menuPathfinding).value == "dfs") {
        frontier = new StackFrontier();
    } else if ((<HTMLInputElement>menuPathfinding).value == "gbfs") {
        frontier = new GreedyFrontier(goal);
    } else if ((<HTMLInputElement>menuPathfinding).value == "astar") {
        frontier = new AStarFrontier(goal);
    }

    frontier.add(new Nodes(start, null, null));

    let explored: number[][] = [];

    while (true) {
        if (stopBool) {
            clearExplored();
            addFS();
            stopBool = false;
            setButtonsDisabled(false);
            return;
        }
        if (frontier.empty()) {
            turnExploredRed();
            setButtonsDisabled(false);
            return null;
        }

        let curnode: any = frontier.remove();

        if (JSON.stringify(curnode.state) == JSON.stringify(goal)) {
            setButtonsDisabled(false);
            for (curnode = curnode.parent; curnode.parent != null; curnode = curnode.parent) {
                document
                    .getElementById(`C${curnode.state[0]}-${curnode.state[1]}`)!
                    .classList.add("found");
            }
            return null;
        }

        if (field[curnode.state[0]][curnode.state[1]] == 0) {
            field[curnode.state[0]][curnode.state[1]] = 4;
            document.getElementById(
                `C${curnode.state[0]}-${curnode.state[1]}`
            )!.className = "explored";
        }

        explored.push(curnode.state);

        let actions = neighbours(curnode.state);

        await wait(0);

        for (let i = 0; i < actions.length; i++) {
            if (
                !arrContains(explored, actions[i]) &&
                !frontier.containsState(actions[i])
            ) {
                if(field[actions[i][0]][actions[i][1]] == 0) {
                    document.getElementById(
                        `C${actions[i][0]}-${actions[i][1]}`
                    )!.className = "considered";
                }
                let child = new Nodes(actions[i], curnode, curnode.state);
                frontier.add(child);
            }
        }
    }
}

function arrContains(array: any[], element: any): boolean {
    for (let i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) == JSON.stringify(element)) {
            return true;
        }
    }
    return false;
}

function wait(ms: number) {
    return new Promise((resolve: any) => setTimeout(resolve, ms));
}

function setButtonsDisabled(bool: boolean) {
    (<HTMLButtonElement>bSolve).disabled = bool;
    (<HTMLButtonElement>bSetStart).disabled = bool;
    (<HTMLButtonElement>bSetGoal).disabled = bool;
    (<HTMLButtonElement>menuPathfinding).disabled = bool;
    setGoal = false;
    setStart = false;
    bSetGoal!.className = "";
    bSetStart!.className = "";
}

function clearExplored() {
    let explored = document.querySelectorAll(".explored");

    for (let i = 0; i < explored.length; i++) {
        explored[i].classList.remove("explored");
    }
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] == 4) {
                field[i][j] = 0;
            }
        }
    }
}

function addFS() {
    field[start[0]][start[1]] = 2;
    field[goal[0]][goal[1]] = 1;
    document.getElementById(`C${start[0]}-${start[1]}`)!.className =
        "startcell";
    document.getElementById(`C${goal[0]}-${goal[1]}`)!.className = "finishcell";
}

function manhattanDistance(point1: number[], point2: number[]): number {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

function turnExploredRed() {
    let explored = document.querySelectorAll(".explored");

    for (let i = 0; i < explored.length; i++) {
        explored[i].className = "notfound";
    }
}

function clearNotFound() {
    let notfound = document.querySelectorAll(".notfound");

    for (let i = 0; i < notfound.length; i++) {
        notfound[i].classList.remove("notfound");
    }
}

function randomiseArray(array: any[]) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

async function genMaze() {
    //make grid
    for (let i = 0; i < width; i += 2) {
        for (let j = 0; j < height; j++) {
            field[j][i] = 3;
            document.getElementById(`C${j}-${i}`)!.className = "wall";
        }
    }
    for (let i = 0; i < height; i += 2) {
        for (let j = 0; j < width; j++) {
            field[i][j] = 3;
            document.getElementById(`C${i}-${j}`)!.className = "wall";
        }
    }

    setButtonsDisabled(true);

    let frontier = new StackFrontier();
    frontier.add(new Nodes(start, null, start));

    let explored: number[][] = [];
    let analysed: Nodes[] = [];

    while (true) {
        if (stopBool) {
            clearExplored();
            addFS();
            stopBool = false;
            setButtonsDisabled(false);
            return;
        }

        if (frontier.empty()) {
            
            loop: for (let i = 0; i < analysed.length; i++) {
                let moves = neighboursMazeGen(analysed[i].state);

                if (moves.length) {
                    for(let j = 0; j < moves.length; j++) {
                        if(!arrContains(explored, moves[j])) {
                            let child = new Nodes(moves[j], analysed[i], analysed[i].state);
                            frontier.add(child);
                            break loop;
                        }
                    }
                } else {
                    analysed.splice(i, 1);
                }
            }

            if (frontier.empty()) {
                turnExploredRed();
                setButtonsDisabled(false);
                return null;
            }
        }

        let curnode: any = frontier.remove();

        if (curnode.parent != null) {
            // Moved up
            if (curnode.action[0] - curnode.state[0] == 2) {
                field[curnode.state[0] + 1][curnode.state[1]] = 0;
                document.getElementById(
                    `C${curnode.state[0] + 1}-${curnode.state[1]}`
                )!.className = "";
            }
            // Moved down
            else if (curnode.action[0] - curnode.state[0] == -2) {
                field[curnode.state[0] - 1][curnode.state[1]] = 0;
                document.getElementById(
                    `C${curnode.state[0] - 1}-${curnode.state[1]}`
                )!.className = "";
            }
            // Moved left
            else if (curnode.action[1] - curnode.state[1] == 2) {
                field[curnode.state[0]][curnode.state[1] + 1] = 0;
                document.getElementById(
                    `C${curnode.state[0]}-${curnode.state[1] + 1}`
                )!.className = "";
            }
            // Moved right
            else if (curnode.action[1] - curnode.state[1] == -2) {
                field[curnode.state[0]][curnode.state[1] - 1] = 0;
                document.getElementById(
                    `C${curnode.state[0]}-${curnode.state[1] - 1}`
                )!.className = "";
            }
        }

        explored.push(curnode.state);
        analysed.push(curnode);

        let actions = neighboursMazeGen(curnode.state);

        await wait(0);

        for (let i = 0; i < actions.length; i++) {
            if (
                !arrContains(explored, actions[i]) &&
                !frontier.containsState(actions[i])
            ) {
                let child = new Nodes(actions[i], curnode, curnode.state);
                frontier.add(child);
                break;
            }
        }
    }
}

function neighboursMazeGen(position: number[]) {
    let moves: number[][] = [];

    if (position[1] - 2 >= 0) {
        if (
            field[position[0]][position[1] - 2] == 0 ||
            field[position[0]][position[1] - 2] == 1
        ) {
            moves.push([position[0], position[1] - 2]);
        }
    }
    if (position[1] + 2 < width) {
        if (
            field[position[0]][position[1] + 2] == 0 ||
            field[position[0]][position[1] + 2] == 1
        ) {
            moves.push([position[0], position[1] + 2]);
        }
    }
    if (position[0] + 2 < height) {
        if (
            field[position[0] + 2][position[1]] == 0 ||
            field[position[0] + 2][position[1]] == 1
        ) {
            moves.push([position[0] + 2, position[1]]);
        }
    }
    if (position[0] - 2 >= 0) {
        if (
            field[position[0] - 2][position[1]] == 0 ||
            field[position[0] - 2][position[1]] == 1
        ) {
            moves.push([position[0] - 2, position[1]]);
        }
    }

    return randomiseArray(moves);
}

export { manhattanDistance };

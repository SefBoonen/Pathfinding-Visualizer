"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.getElementById("container");
if (!container)
    throw new Error("Container not found");
const bSolve = document.getElementById("solve");
if (!bSolve)
    throw new Error("Solve button not found");
const menuPathfinding = document.getElementById("pathfinding-algorithm");
if (!menuPathfinding)
    throw new Error("Pathfinding menu not found");
const bSetGoal = document.getElementById("setgoal");
if (!bSetGoal)
    throw new Error("Set goal button not found");
const bSetStart = document.getElementById("setstart");
if (!bSetStart)
    throw new Error("Set start button not found");
const bAddWalls = document.getElementById("addwalls");
if (!bAddWalls)
    throw new Error("Add walls button not found");
const bStop = document.getElementById("stop");
if (!bStop)
    throw new Error("Stop button not found");
const height = Math.floor(window.innerHeight / 30);
const width = Math.floor(window.innerWidth / 30);
// 0 = blank space, 1 = goal, 2 = start, 3 = wall
let field = [];
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
    event.preventDefault();
});
container.onmousedown = function () {
    return false;
};
container.addEventListener("mousedown", (e) => {
    const cell = e.target.closest("td");
    if (!cell) {
        return;
    }
    const row = cell.parentElement;
    const clickPos = [row.rowIndex, cell.cellIndex];
    if (e.buttons == 1) {
        placeWalls = true;
        if (addWalls && field[clickPos[0]][clickPos[1]] == 0) {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = "wall";
        }
    }
    else if (e.buttons == 2) {
        removeWalls = true;
        if (field[clickPos[0]][clickPos[1]] == 3 && addWalls) {
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }
    }
});
document.addEventListener("mouseup", (e) => {
    if (e.button == 0) {
        placeWalls = false;
        console.log("mouseup");
    }
    else if (e.button == 2) {
        removeWalls = false;
    }
});
container.addEventListener("mouseover", (e) => {
    const cell = e.target.closest("td");
    if (!cell) {
        return;
    }
    const row = cell.parentElement;
    const clickPos = [row.rowIndex, cell.cellIndex];
    if (addWalls) {
        if (placeWalls && field[clickPos[0]][clickPos[1]] == 0) {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = "wall";
        }
        else if (removeWalls && field[clickPos[0]][clickPos[1]] == 3) {
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }
    }
});
container.addEventListener("click", (e) => {
    const cell = e.target.closest("td");
    if (!cell) {
        return;
    }
    const row = cell.parentElement;
    const clickPos = [row.rowIndex, cell.cellIndex];
    if (setGoal && field[clickPos[0]][clickPos[1]] == 0) {
        document.getElementById(`C${goal[0]}-${goal[1]}`).className = "";
        goal = clickPos;
        document.getElementById(`C${goal[0]}-${goal[1]}`).className = "finishcell";
    }
    else if (setStart && field[clickPos[0]][clickPos[1]] == 0) {
        document.getElementById(`C${start[0]}-${start[1]}`).className = "";
        start = clickPos;
        document.getElementById(`C${start[0]}-${start[1]}`).className = "startcell";
    }
});
bStop.addEventListener("click", () => {
    stopBool = true;
});
bSetStart.addEventListener("click", () => {
    if (setStart) {
        bSetStart.style.backgroundColor = "";
        setStart = false;
    }
    else if (setGoal && !setStart && !addWalls) {
        bSetStart.className = "activated-button";
        setStart = true;
        bSetGoal.className = "";
        setGoal = false;
    }
    else if (!setGoal && !setStart && addWalls) {
        bSetStart.className = "activated-button";
        setStart = true;
        bAddWalls.className = "";
        addWalls = false;
    }
    else {
        bSetStart.className = "activated-button";
        setStart = true;
    }
});
bSetGoal.addEventListener("click", () => {
    if (setGoal) {
        bSetGoal.className = "";
        setGoal = false;
    }
    else if (setStart && !setGoal && !addWalls) {
        bSetGoal.className = "activated-button";
        setGoal = true;
        bSetStart.className = "";
        setStart = false;
    }
    else if (!setStart && !setGoal && addWalls) {
        bSetGoal.className = "activated-button";
        setGoal = true;
        bAddWalls.className = "";
        addWalls = false;
    }
    else {
        bSetGoal.className = "activated-button";
        setGoal = true;
    }
});
bAddWalls.addEventListener("click", () => {
    if (addWalls) {
        bAddWalls.className = "";
        addWalls = false;
    }
    else if (setStart && !setGoal && !addWalls) {
        bAddWalls.className = "activated-button";
        addWalls = true;
        bSetStart.className = "";
        setStart = false;
    }
    else if (!setStart && setGoal && !addWalls) {
        bAddWalls.className = "activated-button";
        addWalls = true;
        bSetGoal.className = "";
        setGoal = false;
    }
    else {
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
            }
            else if (i == start[0] && j == start[1]) {
                field[i].push(2);
            }
            else {
                field[i].push(0);
            }
            table += `<td id="C${[i + "-" + j]}"></td>`;
        }
        table += "</tr>";
    }
    container.innerHTML = table;
    document.getElementById(`C${start[0]}-${start[1]}`).className = "startcell";
    document.getElementById(`C${goal[0]}-${goal[1]}`).className = "finishcell";
});
bSolve.addEventListener("click", () => {
    solve();
});
function neighbours(position) {
    let moves = [];
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
    return moves;
}
function solve() {
    return __awaiter(this, void 0, void 0, function* () {
        setButtonsDisabled(true);
        let frontier = new QueueFrontier();
        if (menuPathfinding.value == "bfs") {
            frontier = new QueueFrontier();
        }
        else if (menuPathfinding.value == "dfs") {
            frontier = new StackFrontier();
        }
        frontier.add(new Nodes(start, null, null));
        let list = [];
        let explored = [];
        while (true) {
            if (stopBool) {
                clearExplored();
                addFS();
                stopBool = false;
                setButtonsDisabled(false);
                return;
            }
            if (frontier.empty()) {
                setButtonsDisabled(false);
                return null;
            }
            let curnode = frontier.remove();
            if (JSON.stringify(curnode.state) == JSON.stringify(goal)) {
                setButtonsDisabled(false);
                return null;
            }
            document.getElementById(`C${curnode.state[0]}-${curnode.state[1]}`).className = "explored";
            explored.push(curnode.state);
            let actions = neighbours(curnode.state);
            yield wait(0);
            for (let i = 0; i < actions.length; i++) {
                if (!arrContains(explored, actions[i]) && !frontier.containsState(actions[i])) {
                    let child = new Nodes(actions[i], curnode, curnode.state);
                    frontier.add(child);
                }
            }
        }
    });
}
function arrContains(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) == JSON.stringify(element)) {
            return true;
        }
    }
    return false;
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function setButtonsDisabled(bool) {
    bSolve.disabled = bool;
    bSetStart.disabled = bool;
    bSetGoal.disabled = bool;
    menuPathfinding.disabled = bool;
    setGoal = false;
    setStart = false;
    bSetGoal.className = "";
    bSetStart.className = "";
}
function clearExplored() {
    let explored = document.querySelectorAll(".explored");
    for (let i = 0; i < explored.length; i++) {
        explored[i].classList.remove("explored");
    }
}
function addFS() {
    document.getElementById(`C${start[0]}-${start[1]}`).className = "startcell";
    document.getElementById(`C${goal[0]}-${goal[1]}`).className = "finishcell";
}

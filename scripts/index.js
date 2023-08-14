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
const finishc = "rgb(48, 49, 52)", startc = "rgb(48, 49, 52)", buttonc = "rgb(57, 68, 87)", exploredc = "#3b9aed", startborderc = "#00ff00", finishborderc = "yellow", wallc = "white";
const height = 30;
const width = 60;
let screenWidth = screen.width;
let table = "";
let goal = [14, 44];
let start = [14, 14];
const wall = [0, 0];
let setGoal = false;
let setStart = false;
let addWalls = false;
let stopBool = false;
let walls = [];
let field = [];
container.addEventListener("click", (e) => {
    const cell = e.target.closest("td");
    if (!cell) {
        return;
    }
    const row = cell.parentElement;
    const clickPos = [row.rowIndex, cell.cellIndex];
    if (setGoal) {
        document.getElementById(`C${goal[0]}-${goal[1]}`).style.cssText = "";
        goal = clickPos;
        document.getElementById(`C${goal[0]}-${goal[1]}`).style.cssText += `background-color: ${finishc}; border: solid 1px ${finishborderc};`;
    }
    else if (setStart) {
        document.getElementById(`C${start[0]}-${start[1]}`).style.cssText = "";
        start = clickPos;
        document.getElementById(`C${start[0]}-${start[1]}`).style.cssText += `background-color: ${startc}; border: solid 1px ${startborderc};`;
    }
    else if (addWalls) {
        if (field[clickPos[0]][clickPos[1]] == 3) {
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).style.cssText = "";
            field[clickPos[0]][clickPos[1]] = 0;
        }
        else {
            field[clickPos[0]][clickPos[1]] = 3;
            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).style.cssText += `background-color: ${wallc} !important; border: 0px !important;`;
        }
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
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    }
    else if (!setGoal && !setStart && addWalls) {
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
        bAddWalls.style.backgroundColor = "";
        addWalls = false;
    }
    else {
        bSetStart.style.backgroundColor = buttonc;
        setStart = true;
    }
});
bSetGoal.addEventListener("click", () => {
    if (setGoal) {
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    }
    else if (setStart && !setGoal && !addWalls) {
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
        bSetStart.style.backgroundColor = "";
        setStart = false;
    }
    else if (!setStart && !setGoal && addWalls) {
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
        bAddWalls.style.backgroundColor = "";
        addWalls = false;
    }
    else {
        bSetGoal.style.backgroundColor = buttonc;
        setGoal = true;
    }
});
bAddWalls.addEventListener("click", () => {
    if (addWalls) {
        bAddWalls.style.backgroundColor = "";
        addWalls = false;
    }
    else if (setStart && !setGoal && !addWalls) {
        bAddWalls.style.backgroundColor = buttonc;
        addWalls = true;
        bSetStart.style.backgroundColor = "";
        setStart = false;
    }
    else if (!setStart && setGoal && !addWalls) {
        bAddWalls.style.backgroundColor = buttonc;
        addWalls = true;
        bSetGoal.style.backgroundColor = "";
        setGoal = false;
    }
    else {
        bAddWalls.style.backgroundColor = buttonc;
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
    document.getElementById(`C${start[0]}-${start[1]}`).style.cssText += `background-color: ${startc}; border: solid 1px ${startborderc};`;
    document.getElementById(`C${goal[0]}-${goal[1]}`).style.cssText += `background-color: ${finishc}; border: solid 1px ${finishborderc};`;
});
bSolve.addEventListener("click", () => {
    solve();
});
function neighbours(position) {
    let moves = [];
    if (position[1] - 1 >= 0) {
        if (!arrContains(walls, [position[0], position[1] - 1])) {
            moves.push([position[0], position[1] - 1]);
        }
    }
    if (position[1] + 1 < width) {
        if (!arrContains(walls, [position[0], position[1] + 1])) {
            moves.push([position[0], position[1] + 1]);
        }
    }
    if (position[0] + 1 < height) {
        if (!arrContains(walls, [position[0] + 1, position[1]])) {
            moves.push([position[0] + 1, position[1]]);
        }
    }
    if (position[0] - 1 >= 0) {
        if (!arrContains(walls, [position[0] - 1, position[1]])) {
            moves.push([position[0] - 1, position[1]]);
        }
    }
    return moves;
}
function solve() {
    return __awaiter(this, void 0, void 0, function* () {
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
                stopBool = false;
                return;
            }
            if (frontier.empty()) {
                return null;
            }
            let curnode = frontier.remove();
            if (JSON.stringify(curnode.getState()) == JSON.stringify(goal)) {
                return null;
            }
            document.getElementById(`C${curnode.getState()[0]}-${curnode.getState()[1]}`).style.cssText += `background-color: ${exploredc}; border: solid 1px rgba(38, 39, 49, 0.2);`;
            explored.push(curnode.getState());
            let actions = neighbours(curnode.getState());
            yield wait(0);
            for (let i = 0; i < actions.length; i++) {
                if (!arrContains(explored, actions[i]) && !frontier.containsState(actions[i])) {
                    let child = new Nodes(actions[i], curnode, curnode.getState());
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

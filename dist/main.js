/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontiers/aStarFrontier.ts":
/*!****************************************!*\
  !*** ./src/frontiers/aStarFrontier.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AStarFrontier = void 0;\nconst frontier_1 = __webpack_require__(/*! ./frontier */ \"./src/frontiers/frontier.ts\");\nconst index_1 = __webpack_require__(/*! ../index */ \"./src/index.ts\");\nclass AStarFrontier extends frontier_1.Frontier {\n    constructor(goal) {\n        super();\n        this.goal = goal;\n    }\n    remove() {\n        if (this.empty()) {\n            return undefined;\n        }\n        else {\n            let lowestIndex = -1;\n            let lowest = this.frontier[0];\n            let lowestAStar = Infinity;\n            for (let i = this.frontier.length - 1; i >= 0; i--) {\n                if (((0, index_1.manhattanDistance)(this.frontier[i].state, this.goal) +\n                    this.countParents(this.frontier[i])) <\n                    lowestAStar) {\n                    lowestAStar =\n                        (0, index_1.manhattanDistance)(this.frontier[i].state, this.goal) +\n                            this.countParents(this.frontier[i]);\n                    lowest = this.frontier[i];\n                    lowestIndex = i;\n                }\n            }\n            this.frontier.splice(lowestIndex, 1);\n            return lowest;\n        }\n    }\n    countParents(node) {\n        let count = 0;\n        while (node.parent != null) {\n            count++;\n            node = node.parent;\n        }\n        return count;\n    }\n}\nexports.AStarFrontier = AStarFrontier;\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/frontiers/aStarFrontier.ts?");

/***/ }),

/***/ "./src/frontiers/frontier.ts":
/*!***********************************!*\
  !*** ./src/frontiers/frontier.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Frontier = void 0;\nclass Frontier {\n    constructor() {\n        this.frontier = [];\n    }\n    add(node) {\n        this.frontier.push(node);\n    }\n    containsState(state) {\n        for (let i = 0; i < this.frontier.length; i++) {\n            if (JSON.stringify(this.frontier[i].state) == JSON.stringify(state)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    empty() {\n        return this.frontier.length == 0;\n    }\n    remove() {\n        throw new Error(\"Remove method not implemented\");\n    }\n}\nexports.Frontier = Frontier;\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/frontiers/frontier.ts?");

/***/ }),

/***/ "./src/frontiers/greedyFrontier.ts":
/*!*****************************************!*\
  !*** ./src/frontiers/greedyFrontier.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GreedyFrontier = void 0;\nconst frontier_1 = __webpack_require__(/*! ./frontier */ \"./src/frontiers/frontier.ts\");\nconst index_1 = __webpack_require__(/*! ../index */ \"./src/index.ts\");\nclass GreedyFrontier extends frontier_1.Frontier {\n    constructor(goal) {\n        super();\n        this.goal = goal;\n    }\n    remove() {\n        if (this.empty()) {\n            return undefined;\n        }\n        else {\n            let lowestIndex = -1;\n            let lowest = this.frontier[0];\n            let lowestManhattanDistance = Infinity;\n            for (let i = 0; i < this.frontier.length; i++) {\n                if ((0, index_1.manhattanDistance)(this.frontier[i].state, this.goal) <\n                    lowestManhattanDistance) {\n                    lowestManhattanDistance = (0, index_1.manhattanDistance)(this.frontier[i].state, this.goal);\n                    lowest = this.frontier[i];\n                    lowestIndex = i;\n                }\n            }\n            this.frontier.splice(lowestIndex, 1);\n            return lowest;\n        }\n    }\n}\nexports.GreedyFrontier = GreedyFrontier;\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/frontiers/greedyFrontier.ts?");

/***/ }),

/***/ "./src/frontiers/queueFrontier.ts":
/*!****************************************!*\
  !*** ./src/frontiers/queueFrontier.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.QueueFrontier = void 0;\nconst frontier_1 = __webpack_require__(/*! ./frontier */ \"./src/frontiers/frontier.ts\");\nclass QueueFrontier extends frontier_1.Frontier {\n    constructor() {\n        super();\n    }\n    remove() {\n        if (!this.frontier.length) {\n            return undefined;\n        }\n        else {\n            return this.frontier.shift();\n        }\n    }\n}\nexports.QueueFrontier = QueueFrontier;\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/frontiers/queueFrontier.ts?");

/***/ }),

/***/ "./src/frontiers/stackFrontier.ts":
/*!****************************************!*\
  !*** ./src/frontiers/stackFrontier.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.StackFrontier = void 0;\nconst frontier_1 = __webpack_require__(/*! ./frontier */ \"./src/frontiers/frontier.ts\");\nclass StackFrontier extends frontier_1.Frontier {\n    constructor() {\n        super();\n    }\n    remove() {\n        if (!this.frontier.length) {\n            return undefined;\n        }\n        else {\n            return this.frontier.pop();\n        }\n    }\n}\nexports.StackFrontier = StackFrontier;\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/frontiers/stackFrontier.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.manhattanDistance = void 0;\nconst nodes_1 = __webpack_require__(/*! ./nodes */ \"./src/nodes.ts\");\nconst greedyFrontier_1 = __webpack_require__(/*! ./frontiers/greedyFrontier */ \"./src/frontiers/greedyFrontier.ts\");\nconst queueFrontier_1 = __webpack_require__(/*! ./frontiers/queueFrontier */ \"./src/frontiers/queueFrontier.ts\");\nconst stackFrontier_1 = __webpack_require__(/*! ./frontiers/stackFrontier */ \"./src/frontiers/stackFrontier.ts\");\nconst aStarFrontier_1 = __webpack_require__(/*! ./frontiers/aStarFrontier */ \"./src/frontiers/aStarFrontier.ts\");\nconst container = document.getElementById(\"container\");\nconst bSolve = document.getElementById(\"solve\");\nconst menuPathfinding = document.getElementById(\"pathfinding-algorithm\");\nconst bSetGoal = document.getElementById(\"setgoal\");\nconst bSetStart = document.getElementById(\"setstart\");\nconst bAddWalls = document.getElementById(\"addwalls\");\nconst bReset = document.getElementById(\"reset\");\nconst bGenMaze = document.getElementById(\"mazegen\");\nconst bRandomFill = document.getElementById(\"randomfill\");\nif (!bGenMaze)\n    throw new Error(\"Maze generation button not found\");\nif (!bRandomFill)\n    throw new Error(\"Randomfill button not found\");\nif (!container)\n    throw new Error(\"Container not found\");\nif (!bSolve)\n    throw new Error(\"Solve button not found\");\nif (!menuPathfinding)\n    throw new Error(\"Pathfinding menu not found\");\nif (!bSetGoal)\n    throw new Error(\"Set goal button not found\");\nif (!bSetStart)\n    throw new Error(\"Set start button not found\");\nif (!bAddWalls)\n    throw new Error(\"Add walls button not found\");\nif (!bReset)\n    throw new Error(\"Reset button not found\");\nconst height = Math.floor(window.innerHeight / 30);\nconst width = Math.floor(window.innerWidth / 30);\n// 0 = blank space, 1 = goal, 2 = start, 3 = wall, 4 = explored\nlet field = [];\nlet table = \"\";\nlet goal = [Math.floor(height / 2), Math.floor(width * 0.75)];\nlet start = [Math.floor(height / 2), Math.floor(width * 0.25)];\nlet setGoal = false;\nlet setStart = false;\nlet addWalls = false;\nlet stopBool = false;\nlet placeWalls = false;\nlet removeWalls = false;\ndocument.addEventListener(\"contextmenu\", (event) => {\n    event.preventDefault();\n});\ncontainer.onmousedown = function () {\n    return false;\n};\ncontainer.addEventListener(\"mousedown\", (e) => {\n    const cell = e.target.closest(\"td\");\n    if (!cell) {\n        return;\n    }\n    const row = cell.parentElement;\n    const clickPos = [row.rowIndex, cell.cellIndex];\n    if (e.buttons == 1) {\n        placeWalls = true;\n        if (addWalls && field[clickPos[0]][clickPos[1]] == 0) {\n            field[clickPos[0]][clickPos[1]] = 3;\n            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = \"wall\";\n        }\n    }\n    else if (e.buttons == 2) {\n        removeWalls = true;\n        if (field[clickPos[0]][clickPos[1]] == 3 && addWalls) {\n            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = \"\";\n            field[clickPos[0]][clickPos[1]] = 0;\n        }\n    }\n});\ndocument.addEventListener(\"mouseup\", (e) => {\n    if (e.button == 0) {\n        placeWalls = false;\n    }\n    else if (e.button == 2) {\n        removeWalls = false;\n    }\n});\ncontainer.addEventListener(\"mouseover\", (e) => {\n    const cell = e.target.closest(\"td\");\n    if (!cell) {\n        return;\n    }\n    const row = cell.parentElement;\n    const clickPos = [row.rowIndex, cell.cellIndex];\n    if (addWalls) {\n        if (placeWalls && field[clickPos[0]][clickPos[1]] == 0) {\n            field[clickPos[0]][clickPos[1]] = 3;\n            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = \"wall\";\n        }\n        else if (removeWalls && field[clickPos[0]][clickPos[1]] == 3) {\n            document.getElementById(`C${clickPos[0]}-${clickPos[1]}`).className = \"\";\n            field[clickPos[0]][clickPos[1]] = 0;\n        }\n    }\n});\ncontainer.addEventListener(\"click\", (e) => {\n    const cell = e.target.closest(\"td\");\n    if (!cell) {\n        return;\n    }\n    const row = cell.parentElement;\n    const clickPos = [row.rowIndex, cell.cellIndex];\n    if (setGoal && field[clickPos[0]][clickPos[1]] == 0) {\n        document.getElementById(`C${goal[0]}-${goal[1]}`).className = \"\";\n        goal = clickPos;\n        document.getElementById(`C${goal[0]}-${goal[1]}`).className =\n            \"finishcell\";\n    }\n    else if (setStart && field[clickPos[0]][clickPos[1]] == 0) {\n        document.getElementById(`C${start[0]}-${start[1]}`).className = \"\";\n        start = clickPos;\n        document.getElementById(`C${start[0]}-${start[1]}`).className =\n            \"startcell\";\n    }\n});\nbGenMaze.addEventListener(\"click\", () => {\n});\nbReset.addEventListener(\"click\", () => {\n    stopBool = true;\n    clearExplored();\n    addFS();\n    clearNotFound();\n});\nbSetStart.addEventListener(\"click\", () => {\n    if (setStart) {\n        bSetStart.style.backgroundColor = \"\";\n        setStart = false;\n    }\n    else if (setGoal && !setStart && !addWalls) {\n        bSetStart.className = \"activated-button\";\n        setStart = true;\n        bSetGoal.className = \"\";\n        setGoal = false;\n    }\n    else if (!setGoal && !setStart && addWalls) {\n        bSetStart.className = \"activated-button\";\n        setStart = true;\n        bAddWalls.className = \"\";\n        addWalls = false;\n    }\n    else {\n        bSetStart.className = \"activated-button\";\n        setStart = true;\n    }\n});\nbSetGoal.addEventListener(\"click\", () => {\n    if (setGoal) {\n        bSetGoal.className = \"\";\n        setGoal = false;\n    }\n    else if (setStart && !setGoal && !addWalls) {\n        bSetGoal.className = \"activated-button\";\n        setGoal = true;\n        bSetStart.className = \"\";\n        setStart = false;\n    }\n    else if (!setStart && !setGoal && addWalls) {\n        bSetGoal.className = \"activated-button\";\n        setGoal = true;\n        bAddWalls.className = \"\";\n        addWalls = false;\n    }\n    else {\n        bSetGoal.className = \"activated-button\";\n        setGoal = true;\n    }\n});\nbAddWalls.addEventListener(\"click\", () => {\n    if (addWalls) {\n        bAddWalls.className = \"\";\n        addWalls = false;\n    }\n    else if (setStart && !setGoal && !addWalls) {\n        bAddWalls.className = \"activated-button\";\n        addWalls = true;\n        bSetStart.className = \"\";\n        setStart = false;\n    }\n    else if (!setStart && setGoal && !addWalls) {\n        bAddWalls.className = \"activated-button\";\n        addWalls = true;\n        bSetGoal.className = \"\";\n        setGoal = false;\n    }\n    else {\n        bAddWalls.className = \"activated-button\";\n        addWalls = true;\n    }\n});\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    for (let i = 0; i < height; i++) {\n        field.push([]);\n        table += \"<tr>\";\n        for (let j = 0; j < width; j++) {\n            if (i == goal[0] && j == goal[1]) {\n                field[i].push(1);\n            }\n            else if (i == start[0] && j == start[1]) {\n                field[i].push(2);\n            }\n            else {\n                field[i].push(0);\n            }\n            table += `<td id=\"C${[i + \"-\" + j]}\"></td>`;\n        }\n        table += \"</tr>\";\n    }\n    container.innerHTML = table;\n    document.getElementById(`C${start[0]}-${start[1]}`).className =\n        \"startcell\";\n    document.getElementById(`C${goal[0]}-${goal[1]}`).className = \"finishcell\";\n});\nbSolve.addEventListener(\"click\", () => {\n    solve();\n});\nbGenMaze.addEventListener(\"click\", () => {\n    genMaze();\n});\nbRandomFill.addEventListener(\"click\", () => {\n    let candidates = [];\n    let fillPerc = 0.1;\n    for (let i = 0; i < field.length; i++) {\n        for (let j = 0; j < field[i].length; j++) {\n            if (field[i][j] == 0) {\n                candidates.push([i, j]);\n            }\n        }\n    }\n    for (let i = 0; i < Math.floor((height * width) * fillPerc); i++) {\n        let random = Math.floor(Math.random() * (candidates.length + 1));\n        field[candidates[random][0]][candidates[random][1]] = 3;\n        document.getElementById(`C${candidates[random][0]}-${candidates[random][1]}`).className = \"wall\";\n    }\n});\nfunction neighbours(position) {\n    let moves = [];\n    if (position[1] - 1 >= 0) {\n        if (field[position[0]][position[1] - 1] != 3 && field[position[0]][position[1] - 1] != 4) {\n            moves.push([position[0], position[1] - 1]);\n        }\n    }\n    if (position[1] + 1 < width) {\n        if (field[position[0]][position[1] + 1] != 3 && field[position[0]][position[1] + 1] != 4) {\n            moves.push([position[0], position[1] + 1]);\n        }\n    }\n    if (position[0] + 1 < height) {\n        if (field[position[0] + 1][position[1]] != 3 && field[position[0] + 1][position[1]] != 4) {\n            moves.push([position[0] + 1, position[1]]);\n        }\n    }\n    if (position[0] - 1 >= 0) {\n        if (field[position[0] - 1][position[1]] != 3 && field[position[0] - 1][position[1]] != 4) {\n            moves.push([position[0] - 1, position[1]]);\n        }\n    }\n    return randomiseArray(moves);\n}\nfunction solve() {\n    return __awaiter(this, void 0, void 0, function* () {\n        setButtonsDisabled(true);\n        let frontier = new queueFrontier_1.QueueFrontier();\n        if (menuPathfinding.value == \"bfs\") {\n            frontier = new queueFrontier_1.QueueFrontier();\n        }\n        else if (menuPathfinding.value == \"dfs\") {\n            frontier = new stackFrontier_1.StackFrontier();\n        }\n        else if (menuPathfinding.value == \"gbfs\") {\n            frontier = new greedyFrontier_1.GreedyFrontier(goal);\n        }\n        else if (menuPathfinding.value == \"astar\") {\n            frontier = new aStarFrontier_1.AStarFrontier(goal);\n        }\n        frontier.add(new nodes_1.Nodes(start, null, null));\n        let list = [];\n        let explored = [];\n        while (true) {\n            if (stopBool) {\n                clearExplored();\n                addFS();\n                stopBool = false;\n                setButtonsDisabled(false);\n                return;\n            }\n            if (frontier.empty()) {\n                turnExploredRed();\n                setButtonsDisabled(false);\n                return null;\n            }\n            let curnode = frontier.remove();\n            if (JSON.stringify(curnode.state) == JSON.stringify(goal)) {\n                setButtonsDisabled(false);\n                while (curnode.parent != null) {\n                    list.push(curnode.state);\n                    document\n                        .getElementById(`C${curnode.state[0]}-${curnode.state[1]}`)\n                        .classList.add(\"found\");\n                    curnode = curnode.parent;\n                }\n                return null;\n            }\n            if (field[curnode.state[0]][curnode.state[1]] == 0) {\n                field[curnode.state[0]][curnode.state[1]] = 4;\n                document.getElementById(`C${curnode.state[0]}-${curnode.state[1]}`).className = \"explored\";\n            }\n            explored.push(curnode.state);\n            let actions = neighbours(curnode.state);\n            yield wait(0);\n            for (let i = 0; i < actions.length; i++) {\n                if (!arrContains(explored, actions[i]) &&\n                    !frontier.containsState(actions[i])) {\n                    let child = new nodes_1.Nodes(actions[i], curnode, curnode.state);\n                    frontier.add(child);\n                }\n            }\n        }\n    });\n}\nfunction arrContains(array, element) {\n    for (let i = 0; i < array.length; i++) {\n        if (JSON.stringify(array[i]) == JSON.stringify(element)) {\n            return true;\n        }\n    }\n    return false;\n}\nfunction wait(ms) {\n    return new Promise((resolve) => setTimeout(resolve, ms));\n}\nfunction setButtonsDisabled(bool) {\n    bSolve.disabled = bool;\n    bSetStart.disabled = bool;\n    bSetGoal.disabled = bool;\n    menuPathfinding.disabled = bool;\n    setGoal = false;\n    setStart = false;\n    bSetGoal.className = \"\";\n    bSetStart.className = \"\";\n}\nfunction clearExplored() {\n    let explored = document.querySelectorAll(\".explored\");\n    for (let i = 0; i < explored.length; i++) {\n        explored[i].classList.remove(\"explored\");\n    }\n    for (let i = 0; i < field.length; i++) {\n        for (let j = 0; j < field[i].length; j++) {\n            if (field[i][j] == 4) {\n                field[i][j] = 0;\n            }\n        }\n    }\n}\nfunction addFS() {\n    field[start[0]][start[1]] = 2;\n    field[goal[0]][goal[1]] = 1;\n    document.getElementById(`C${start[0]}-${start[1]}`).className =\n        \"startcell\";\n    document.getElementById(`C${goal[0]}-${goal[1]}`).className = \"finishcell\";\n}\nfunction manhattanDistance(point1, point2) {\n    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);\n}\nexports.manhattanDistance = manhattanDistance;\nfunction turnExploredRed() {\n    let explored = document.querySelectorAll(\".explored\");\n    for (let i = 0; i < explored.length; i++) {\n        explored[i].className = \"notfound\";\n    }\n}\nfunction clearNotFound() {\n    let notfound = document.querySelectorAll(\".notfound\");\n    for (let i = 0; i < notfound.length; i++) {\n        notfound[i].classList.remove(\"notfound\");\n    }\n}\nfunction randomiseArray(array) {\n    let currentIndex = array.length, randomIndex;\n    while (currentIndex != 0) {\n        randomIndex = Math.floor(Math.random() * currentIndex);\n        currentIndex--;\n        [array[currentIndex], array[randomIndex]] = [\n            array[randomIndex], array[currentIndex]\n        ];\n    }\n    return array;\n}\nfunction genMaze() {\n    return __awaiter(this, void 0, void 0, function* () {\n        setButtonsDisabled(true);\n        let frontier = new stackFrontier_1.StackFrontier();\n        frontier.add(new nodes_1.Nodes(start, null, start));\n        let list = [];\n        let explored = [];\n        while (true) {\n            if (stopBool) {\n                clearExplored();\n                addFS();\n                stopBool = false;\n                setButtonsDisabled(false);\n                return;\n            }\n            if (frontier.empty()) {\n                turnExploredRed();\n                setButtonsDisabled(false);\n                return null;\n            }\n            let curnode = frontier.remove();\n            // if(JSON.stringify(curnode.state) == JSON.stringify(goal)) {\n            //     setButtonsDisabled(false);\n            //     return null;\n            // }\n            // let newWalls = neighbours(curnode.state);\n            // for(let i = 0; i < newWalls.length - 2; i++) {\n            //     field[newWalls[i][0]][newWalls[i][1]] = 3;\n            //     document.getElementById(`C${newWalls[i][0]}-${newWalls[i][1]}`)!.className = \"wall\";\n            // }\n            // Moved up\n            if (curnode.parent != null) {\n                if (curnode.action[0] - curnode.state[0] == 1) {\n                    // field[curnode.state[0] - 1][curnode.state[1]] = 3;\n                    if (curnode.state[0] + 1 < height) {\n                        if (curnode.state[1] + 1 < width)\n                            field[curnode.state[0] + 1][curnode.state[1] + 1] = 3;\n                        if (curnode.state[1] - 1 >= 0)\n                            field[curnode.state[0] + 1][curnode.state[1] - 1] = 3;\n                    }\n                    // console.log(\"up\")\n                }\n                // Moved down\n                else if (curnode.action[0] - curnode.state[0] == -1) {\n                    // field[curnode.state[0] + 1][curnode.state[1]] = 3;\n                    if (curnode.state[0] - 1 >= 0) {\n                        if (curnode.state[1] + 1 < width)\n                            field[curnode.state[0] - 1][curnode.state[1] + 1] = 3;\n                        if (curnode.state[1] - 1 >= 0)\n                            field[curnode.state[0] - 1][curnode.state[1] - 1] = 3;\n                    }\n                    // console.log(\"down\")\n                }\n                // Moved left\n                else if (curnode.action[1] - curnode.state[1] == 1) {\n                    // field[curnode.state[0]][curnode.state[1] + 1] = 3;\n                    if (curnode.state[1] + 1 < width) {\n                        if (curnode.state[0] + 1 < height)\n                            field[curnode.state[0] + 1][curnode.state[1] + 1] = 3;\n                        if (curnode.state[0] - 1 >= 0)\n                            field[curnode.state[0] - 1][curnode.state[1] + 1] = 3;\n                    }\n                    // console.log(\"left\")\n                }\n                // Moved right\n                else if (curnode.action[1] - curnode.state[1] == -1) {\n                    // field[curnode.state[0]][curnode.state[1] - 1] = 3;\n                    if (curnode.state[1] - 1 >= 0) {\n                        if (curnode.state[0] + 1 < height)\n                            field[curnode.state[0] + 1][curnode.state[1] - 1] = 3;\n                        if (curnode.state[0] - 1 >= 0)\n                            field[curnode.state[0] - 1][curnode.state[1] - 1] = 3;\n                        explored.push([curnode.state[0] + 1, curnode.state[1] - 1]);\n                        explored.push([curnode.state[0] - 1, curnode.state[1] - 1]);\n                    }\n                    // console.log(\"right\")\n                }\n            }\n            field[curnode.state[0]][curnode.state[1]] = 4;\n            document.getElementById(`C${curnode.state[0]}-${curnode.state[1]}`).className = \"explored\";\n            explored.push(curnode.state);\n            let actions = neighbours(curnode.state);\n            // for(let i = 0; i < actions.length - 1; i++) {\n            //     field[actions[i][0]][actions[i][1]] = 3;\n            //     document.getElementById(`C${actions[i][0]}-${actions[i][1]}`)!.className = \"wall\";\n            // }\n            yield wait(0);\n            for (let i = 0; i < actions.length; i++) {\n                if (!arrContains(explored, actions[i]) && !frontier.containsState(actions[i])) {\n                    let child = new nodes_1.Nodes(actions[i], curnode, curnode.state);\n                    frontier.add(child);\n                }\n            }\n        }\n    });\n}\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/index.ts?");

/***/ }),

/***/ "./src/nodes.ts":
/*!**********************!*\
  !*** ./src/nodes.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Nodes = void 0;\nclass Nodes {\n    constructor(state, parent, action) {\n        this.state = state;\n        this.parent = parent;\n        this.action = action;\n    }\n}\nexports.Nodes = Nodes;\n\n\n//# sourceURL=webpack://pathfinding-visualizer/./src/nodes.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
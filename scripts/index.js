const container = document.getElementById("container");
const button = document.getElementById("test");

const height = 10;
const width = 30;

let table = "";

const goal = [5, 15];
const start = [0, 0];

let field = [];

document.addEventListener('DOMContentLoaded', () => {
    for(i = 0; i < height; i ++) {
        field.push([]);
        table += "<tr>";
        for(j = 0; j < width; j++) {
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
    console.log(field);
});

button.addEventListener('click', () => {
    console.log(neighbours([7,11]));
});

function neighbours(position) {
    let moves = [];

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

function solve() {
    start = new Node(start, none, none);

    frontier = [];
    frontier.add(start);

    list = [];
    explored = [];

    while(true) {
        if(!frontier.length) {
            return none;
        }

        curnode = frontier.shift();

        if(curnode.getState() == target) {
            console.log("well done");
        }
        expolored.push(curnode.getState());

        for(action in neighbours(curnode.getState())) {
            if(!explored.includes()) {
                
            }
        }

        
    }

}
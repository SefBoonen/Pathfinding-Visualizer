const container = document.getElementById("container");
const button = document.getElementById("test");
const buttontest = document.getElementById("test2");

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
});



button.addEventListener('click', () => {
    solve();
});

buttontest.addEventListener('click', () => {

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

async function solve() {
    let frontier = new QueueFrontier();
    frontier.add(new Node(start, null, null));
    
    list = [];
    explored = [];

    while(true) {
        if(frontier.empty()) {
            console.log("empty");
            return null;
        }

        curnode = frontier.remove();

        if(curnode.getState() == goal) {
            console.log("well done");
        }

        document.getElementById(`C${curnode.getState()[0]}-${curnode.getState()[1]}`).style.backgroundColor = "red";

        explored.push(curnode.getState());

        actions = neighbours(curnode.getState());
        console.log(actions)
        console.log(actions[0])

        await wait(100);

        for(i = 0; i < actions.length; i++) {
            if(!arrContains(explored, actions[i]) && !frontier.containsState(actions[i])) {
                
                child = new Node(actions[i], curnode, curnode.getState());
                frontier.add(child);
                frontier.display();
                
            }
        }
        frontier.logLength();
    }
}


function arrContains(array, element) {
    for(i = 0; i < array.length; i++) {
        if(JSON.stringify(array[i]) == JSON.stringify(element)) {
            return true;
        }
    }
    return false;
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


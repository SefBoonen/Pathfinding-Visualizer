const container = document.getElementById("container");
const button = document.getElementById("test");

const height = 10;
const width = 30;

let table = "";

document.addEventListener('DOMContentLoaded', () => {
    for(i = 0; i < height; i ++) {
        table += "<tr>";
        for(j = 0; j < width; j++) {
            table += `<td id="C${[i + "-" + j]}"></td>`;
        }
        table += "</tr>";
    }
    container.innerHTML = table;
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
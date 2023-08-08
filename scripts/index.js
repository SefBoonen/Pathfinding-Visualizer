const container = document.getElementById("container");
const button = document.getElementById("test");

const height = 10;
const width = 5;

let table;

document.addEventListener('DOMContentLoaded', () => {
    for(i = 0; i < height; i ++) {
        table += "<tr>";
        for(j = 0; j < width; j++) {
            table += "<td></td>";
        }
        table += "</tr>";
    }
    container.innerHTML = table;
});
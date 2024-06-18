let a;
let current_value;
let flag = 0;
let N = prompt("N for N X N grid:", "3");
N = Number(N);
let grid = document.querySelector(".grid");
for (let i = 1; i <= N * N; i++) {
    let div = document.createElement("div");
    div.className = "box";
    grid.append(div);
}
grid.style.gridTemplateColumns = `repeat(${N},${N}fr)`;
grid.style.gridTemplateRows = `repeat(${N},${N}fr)`;
function turn() {
    a = Math.random();
    if (a <= 0.5) {
        document.querySelector(".whos-turn").innerHTML = "Turn for player 1";
        current_value = "X";
    } else {
        document.querySelector(".whos-turn").innerHTML = "Turn for player 2";
        current_value = "O";
    }
}
turn();
function flip() {
    if (current_value == "X") {
        document.querySelector(".whos-turn").innerHTML = "Turn for player 2";
        current_value = "O";
    } else {
        document.querySelector(".whos-turn").innerHTML = "Turn for player 1";
        current_value = "X";
    }
}
let countofclicks = 0;
let countformatch = 1;
let winner = "";
let winsbyO = 0;
let winsbyX = 0;
let nodeList = document.querySelectorAll(".box");
function windiv() {
    if (winner != "") {
        if (winner == "X") {
            winsbyX++;
            winner="Player 1";
            } else {
            winner="Player 2";
            winsbyO++;
        }
        let b = document.querySelector(".winner");
        b.innerHTML = `Winner of the match is "${winner}".
        <div class="player1">
        Wins by Player 1 = ${winsbyX}.
        </div>
        <div class="player2">
        Wins by Player 2 = ${winsbyO}.
        </div>
        `;
        if (winsbyO > winsbyX) {
            document.querySelector(".player2").classList.add("lead");
            document.querySelector(".player1").classList.remove("lead");
        } else if (winsbyO < winsbyX) {
            document.querySelector(".player1").classList.add("lead");
            document.querySelector(".player2").classList.remove("lead");
        } else {
            document.querySelector(".player2").classList.remove("lead");
            document.querySelector(".player1").classList.remove("lead");
        }
        b = document.querySelector(".winner-opac");
        b.style.display = "flex";
        b = document.querySelector(".winner-container");
        b.style.display = "flex";
        b.style.justifyContent = "center";
        b.style.alignItems = "center";
        b.style.flexDirection = "column";
        countofclicks = 0;
        let time_out=setTimeout(newGame,5000);
        }
}
function tie() {
    let b = document.querySelector(".winner");
    b.innerHTML = `<h2>Tie</h2>
        Wins by Player 1 = ${winsbyX}.
       <br>
        Wins by Player 2 = ${winsbyO}.
        <br>`;
    b = document.querySelector(".winner-opac");
    b.style.display = "flex";
    b = document.querySelector(".winner-container");
    b.style.display = "flex";
    b.style.justifyContent = "center";
    b.style.alignItems = "center";
    b.style.flexDirection = "column";
    countofclicks = 0;
    let time_out=setTimeout(newGame,5000);
}
for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].addEventListener("click", () => {
        if (nodeList[i].innerHTML == "") {
            nodeList[i].innerHTML = current_value;
            countofclicks++;
            console.log("count :" + countofclicks);
            flip();
        }
        for (let i = 0; countofclicks >= (N + (N - 1)) && i <= nodeList.length - N; i += N) {
            //for rows checking
            for (let j = 0; j < (N - 1); j++) {
                if (nodeList[i + j].innerHTML == nodeList[i + j + 1].innerHTML && nodeList[i + j].innerHTML != "") {
                    countformatch++;
                    if (countformatch == N) {
                        winner = nodeList[i + j].innerHTML;
                        windiv();
                        flag = 1;
                        break;
                    }
                } else {
                    break;
                }
            }
            countformatch = 1;
            if (flag == 1) {
                flag = 0;
                break;
            }
        }
        //for columns
        for (let i = 0; countofclicks >= (N + (N - 1)) && i < N; i++) {
            for (let j = 0; j < nodeList.length - N; j += N) {
                if (nodeList[i + j].innerHTML == nodeList[i + j + N].innerHTML && nodeList[i + j].innerHTML != "") {
                    countformatch++;
                    if (countformatch == N) {
                        winner = nodeList[i + j].innerHTML;
                        windiv();
                        flag = 1;
                        break;
                    }
                } else {
                    break;
                }
            }
            countformatch = 1;
            if (flag == 1) {
                flag = 0;
                break;
            }
        }
        //for left diagonal
        for (let i = 0; i < (nodeList.length - N - 1) && countofclicks >= (2 * N - 1); i += (N + 1)) {
            if (nodeList[i].innerHTML == nodeList[i + 1 + N].innerHTML) {
                countformatch++;
                if (countformatch == N) {
                    winner = nodeList[0].innerHTML;
                    windiv();
                    break;
                }
            } else {
                break;
            }
        }
        //for right diagonal
        countformatch = 1;
        for (let i = N - 1; i <= (nodeList.length - 2 * N + 1); i += (N - 1)) {
            if (nodeList[i].innerHTML == nodeList[i + N - 1].innerHTML) {
                countformatch++;
                if (countformatch == N) {
                    winner = nodeList[N - 1].innerHTML;
                    windiv();
                    break;
                }
            } else {
                break;
            }
        }
        if (countofclicks == N * N && winner == "") {
            countofclicks = 0;
            tie();
        }
    });
}
function newGame() {
    let b = document.querySelector(".winner");
    b.innerHTML = ``;
    b = document.querySelector(".winner-opac");
    b.style.display = "none";
    b = document.querySelector(".winner-container");
    b.style.display = "none";
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML = "";
    }
    turn();
}
let timeout;
function newGameReset() {
    let stop_btn = document.querySelector("#stop_reset");
    stop_btn.style.display = "flex";
    document.querySelector(".reset-warning").innerHTML = `<p>Game will reset in 5 seconds...</p><br>`
    timeout = setTimeout(() => {
        document.querySelector(".reset-warning").innerHTML = ``;
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML = "";
        }
        stop_btn.style.display = "none";
        turn();
    }, 5000);
}
function leaderboard() {
    let d = document.querySelector(".winner-opac");
    d.style.display = "flex";
    d = document.querySelector(".leaderboard");
    d.style.display = "flex";
    d.style.flexDirection = "column";
    d.style.justifyContent = "center";
    d.style.alignItems = "center";
    d = document.querySelector(".leaderboard-content");
    d.innerHTML = `
    <h2>Leaderboard</h2>
    <div class="player1">
    Wins by Player 1 = ${winsbyX}.
    </div>
    <div class="player2">
    Wins by Player 2 = ${winsbyO}.
    </div>
    `;
    if (winsbyO > winsbyX) {
        document.querySelector(".player2").classList.add("lead");
        document.querySelector(".player1").classList.remove("lead");
    } else if (winsbyO < winsbyX) {
        document.querySelector(".player1").classList.add("lead");
        document.querySelector(".player2").classList.remove("lead");
    } else {
        document.querySelector(".player2").classList.remove("lead");
        document.querySelector(".player1").classList.remove("lead");
    }
}
function leaderboard_button() {
    let d = document.querySelector(".winner-opac");
    d.style.display = "none";
    d = document.querySelector(".leaderboard");
    d.style.display = "none";
}
function stop_reset() {
    clearTimeout(timeout);
    let stop_btn = document.querySelector("#stop_reset");
    stop_btn.style.display = "none";
    document.querySelector(".reset-warning").innerHTML = ``;
}
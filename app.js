/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2, 3],
    [1, 9, 17, 25],
    [2, 10, 18, 26],
    [6, 5, 4, 3],
    [7, 8, 9, 10],
    [5, 11, 17, 23],
    [5, 4, 3, 2],
    [7, 14, 21, 28],
    [1, 2, 3, 4],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [4, 10, 16, 22],
    [9, 16, 23, 30],
    [6, 13, 20, 27],
    [0, 7, 14, 21],
    [8, 15, 22, 29],
    [1, 8, 15, 22],
    [0, 8, 16, 24],
    [6, 13, 20, 27],
    [6, 12, 18, 24],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 8, 15, 22],
    [2, 9, 16, 23],
    [9, 17, 25, 33],
    [3, 10, 17, 24],
    [21, 15, 9, 3],
    [7, 15, 23, 31],
    [4, 11, 18, 25],
    [8, 16, 24, 32],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [5, 12, 19, 26],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [10, 17, 24, 31],
    [13, 20, 27, 34],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [37, 30, 23, 16],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [36, 29, 22, 15],
    [35, 28, 21, 14],
    [41, 33, 25, 17],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [41, 40, 39, 38],
    [35, 36, 37, 38],
    [41, 34, 27, 20],
    [40, 33, 26, 19],
    [39, 32, 25, 18],
    [38, 31, 24, 17],
    [34, 26, 18, 10],
    [35, 29, 23, 17],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [37, 31, 25, 19],
    [39, 31, 23, 15],
    [40, 32, 24, 16],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
]

/*---------------------------- Variables (state) ----------------------------*/

let board;
let winner;
let tie;
let player1;
let player2;
let turn;
let currentPlayer = player1;


/*------------------------ Cached Element References ------------------------*/

const gameRow = document.getElementsByClassName('.game-board');

const gameCirclesEls = document.querySelectorAll(".circle");

const messageEl = document.getElementById("message");

/*----------------------------- Event Listeners -----------------------------*/

gameCirclesEls.forEach(circle => circle.addEventListener("click", handleClick))

document.querySelector('button').addEventListener('click', init);


/*-------------------------------- Functions --------------------------------*/

function init() {
    board = [null, null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, null, null, null,
         null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
init()

function placeCircleToken(idx) {
    board[idx] = turn
}

function handleClick(evt) {
    const circIdx = Number(evt.target.id.replace('circ',''))
    if (board[circIdx] !== null || winner === true) {
      return
    } 
    placeCircleToken(circIdx)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    }

function switchPlayerTurn() {
    if (winner === true){
      return
    } else {
      turn = turn * -1
    }
  }

function render () {
    updateBoard();
    updateMessage()
}

function updateBoard() {
    board.forEach((circle, idx) => {
        if (circle === 1) {
            gameCirclesEls[idx].style.backgroundColor = "red"
        }else if (circle === -1) {
            gameCirclesEls[idx].style.backgroundColor = "blue"
        }else {
            gameCirclesEls[idx].style.backgroundColor = "white";
        }
    })
}

function updateMessage() {
    if(winner === false && tie === false) {
        messageEl.textContent = `Bonjour, it's player ${turn === 1? "red's" : "blue's"} turn`;
    } else if (winner === false && tie === true) {
        messageEl.textContent = `${1 === -1? 'red' : 'blue'} It was a close game, it's a tie!`;
    } else {
        messageEl.textContent = `Yay félicitations player ${turn === -1? 'red' : 'blue'} wins!`;
    }
}

function checkForTie() {
    tie = board.every(function(cir) {
        return cir !== null
    })
    console.log(tie);
}

function checkForWinner() {
    winningCombos.forEach(function(arr){
    let winning = 0
    arr.forEach(function(el){
        winning += board[el]
   })
         console.log('check winner', winning)
         if (Math.abs(winning) === 4) { 
             winner = true
         }
       })
     }


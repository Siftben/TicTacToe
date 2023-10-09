const X_CLASS = 'x';
const O_CLASS = "o";
const WINNING_COMBINATION = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const gameBoxes = document.querySelectorAll(".game-box");
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let circleTurn;

startGame();

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        console.log(currentClass);
        console.log("Win");
    }

    swapTurns();
    console.log("Cell Clicked");
    setBoardHoverClass();
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function placeMark(cell, currentClass) {
    console.log(currentClass);
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(circleTurn){
        board.classList.add(O_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

gameBoxes.forEach(trigger => trigger.addEventListener('click', clickBox))

function gameBoard() {
    
}

function clickBox() {
    
}

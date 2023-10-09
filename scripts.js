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
const modal = document.getElementById("myModal");
const playAgainButton = document.querySelector('.play-again');
const winningMsgText = document.querySelector('.win-text');

let circleTurn;

startGame();

function startGame() {
    modal.style.display = "none";
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
        console.log("Win");
    } else if(isDraw()){
        endGame(true);
    } else{
        swapTurns();
        setBoardHoverClass();
    }

}

function isDraw() {
    return[...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS);
    })
}

function endGame(draw) {
    if(draw){
        winningMsgText.innerHTML = "It's a Draw";
    } else{
        winningMsgText.innerHTML = `${circleTurn ? "O" : "X"} Win `;
    }

    modal.style.display = "block";
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

playAgainButton.addEventListener('click', startGame);
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart-button');
let currentPlayer = 'x';
let gameEnded = false;

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;
  
  if (cell.classList.contains('x') || cell.classList.contains('o') || gameEnded) {
    return;
  }
  
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();
  
  checkWin();
  checkTie();
  switchPlayer();
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    const a = combination[0];
    const b = combination[1];
    const c = combination[2];

    if (
      cells[a].classList.contains(currentPlayer) &&
      cells[b].classList.contains(currentPlayer) &&
      cells[c].classList.contains(currentPlayer)
    ) {
      gameEnded = true;
      highlightWinningCells(a, b, c);
      displayEndMessage(`${currentPlayer.toUpperCase()} wins!`);
    }
  }
}

function checkTie() {
  if ([...cells].every((cell) => cell.classList.contains('x') || cell.classList.contains('o'))) {
    gameEnded = true;
    displayEndMessage("It's a tie!");
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function highlightWinningCells(a, b, c) {
  cells[a].classList.add('winner');
  cells[b].classList.add('winner');
  cells[c].classList.add('winner');
}

function displayEndMessage(message) {
  const messageBox = document.createElement('div');
  messageBox.classList.add('message-box');
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
    restartGame();
  }, 1500);
}

function restartGame() {
  cells.forEach((cell) => {
    cell.classList.remove('x', 'o', 'winner');
    cell.textContent = '';
  });

  currentPlayer = 'x';
  gameEnded = false;
}

restartButton.addEventListener('click', restartGame);

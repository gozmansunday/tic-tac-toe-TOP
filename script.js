// TIC TAC TOE

// Module for loading Tic Tac Toe grid
const GameBoard = (() => {
  const gameBoard = document.querySelector('#game-board');
  
  const display = () => {
    let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    gameBoard.innerHTML = '';

    for (let i = 1; i <= gameBoardArray.length; i++) {
      const box = document.createElement('div');
      box.className = `box-border-${i} tictactoe-box`;
      gameBoard.appendChild(box);
    }
  };

  display();
})();
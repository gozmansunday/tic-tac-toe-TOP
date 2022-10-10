// TIC TAC TOE

// Module for loading Tic Tac Toe grid
const GameBoard = (() => {
  const gameBoard = document.querySelector('#game-board');
  const playerNameModal = document.querySelector('#player-name-modal');
  const mainSection = document.querySelector('main');
  const gameInfoSection = document.querySelector('#game-info-section');
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  // Factory function for box state
  const BoxState = (clicked, mark) => {
    return {clicked, mark};
  };
  
  const display = () => {
    const noOfBoxes = gameBoardArray.length;
    gameBoard.innerHTML = '';

    for (let i = 0; i < noOfBoxes; i++) {
      const box = document.createElement('div');
      box.className = `box-border-${i+1} tictactoe-box`;
      box.setAttribute('data-index', `${i+1}`);
      gameBoard.appendChild(box);
      gameBoardArray[i] = BoxState(false, '');
    }

    playerNameModal.classList.replace('flex', 'hidden');
    mainSection.classList.remove('invisible');
    console.log(gameBoardArray); //! REMOVE LATER
  };

  return {gameBoard, gameBoardArray, display, gameInfoSection};
})();

// Module to create players
const Player = (() => {
  const playerXInput = document.querySelector('#player-x-input');
  const playerOInput = document.querySelector('#player-o-input');
  const playerXDisp = document.querySelector('#player-x-disp');
  const playerODisp = document.querySelector('#player-o-disp');
  const startGameBtn = document.querySelector('#start-game-btn');

  const PlayerFactory = (name) => {
    return {name};
  };

  startGameBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (playerXInput.value === '' || playerOInput.value === '') return;

    const playerX = PlayerFactory(playerXInput.value);
    const playerO = PlayerFactory(playerOInput.value);
    const playerXName = playerXInput.value.toUpperCase();
    const playerOName = playerOInput.value.toUpperCase();
    playerXDisp.textContent = playerXName;
    playerODisp.textContent = playerOName;

    GameBoard.display();
    return {playerXName, playerOName};
  });
})();

// Module to control flow of game
const GameFlow = (() => {
  const gameInfo = document.querySelector('#game-info');
  const playAgainBtn = document.querySelector('#play-again-btn');
  const gameBoard = GameBoard.gameBoard;
  let gameBoardArray = GameBoard.gameBoardArray;
  const noOfBoxes = gameBoardArray.length;
  let coordinatesX = [];
  let coordinatesO = [];

  // Function to determine if X or O should be placed in the box when it's clicked
  const checkTurn = () => {
    let unclicked = 0;
    for (let i = 0; i < noOfBoxes; i++) {
      if (gameBoardArray[i].clicked === false) {
        unclicked++;
      }
    }

    if ((unclicked % 2) === 1) {
      return true;
    } else {
      return false;
    }
  };

  // Function to place X or O in the box when it is clicked
  const showMark = () => {
    gameBoard.addEventListener('click', (e) => {
      let box = e.target;
      let boxIndex = box.dataset.index - 1;
      
      if (box.classList.contains('tictactoe-box')) {
        if (gameBoardArray[boxIndex].clicked === false && checkWin() === false) {
          if (checkTurn()) {
            gameBoardArray[boxIndex].mark = 'X';
            box.innerHTML = Mark.xmark;
          } else {
            gameBoardArray[boxIndex].mark = 'O';
            box.innerHTML = Mark.omark;
          }
          
          gameBoardArray[boxIndex].clicked = true;
          checkGame(boxIndex);
        }
      }
    });
  };

  // Function to check game
  function checkGame(boxIndex) {
    if (gameBoardArray[boxIndex].mark === 'X') {
      coordinatesX.push(+boxIndex);
    } else if (gameBoardArray[boxIndex].mark === 'O') {
      coordinatesO.push(+boxIndex);
    }
    console.log(coordinatesX);
    console.log(coordinatesO);
    checkWin();
  }

  // Function to check if a player has won the game
  function checkWin() {
    const playerXDisp = document.querySelector('#player-x-disp');
    const playerODisp = document.querySelector('#player-o-disp');
    const playerX = playerXDisp.textContent;
    const playerO = playerODisp.textContent;

    if ((coordinatesX.includes(0) && coordinatesX.includes(1) && coordinatesX.includes(2)) || (coordinatesX.includes(3) && coordinatesX.includes(4) && coordinatesX.includes(5)) || (coordinatesX.includes(6) && coordinatesX.includes(7) && coordinatesX.includes(8)) || (coordinatesX.includes(0) && coordinatesX.includes(3) && coordinatesX.includes(6)) || (coordinatesX.includes(1) && coordinatesX.includes(4) && coordinatesX.includes(7)) || (coordinatesX.includes(2) && coordinatesX.includes(5) && coordinatesX.includes(8)) || (coordinatesX.includes(0) && coordinatesX.includes(4) && coordinatesX.includes(8)) || (coordinatesX.includes(2) && coordinatesX.includes(4) && coordinatesX.includes(6))) {
      console.log(`${playerX} WINS!`);
      gameInfo.textContent = `${playerX} WINS!`;
      GameBoard.gameInfoSection.classList.remove('invisible');
      return true;
    } else if (((coordinatesO.includes(0) && coordinatesO.includes(1) && coordinatesO.includes(2)) || (coordinatesO.includes(3) && coordinatesO.includes(4) && coordinatesO.includes(5)) || (coordinatesO.includes(6) && coordinatesO.includes(7) && coordinatesO.includes(8)) || (coordinatesO.includes(0) && coordinatesO.includes(3) && coordinatesO.includes(6)) || (coordinatesO.includes(1) && coordinatesO.includes(4) && coordinatesO.includes(7)) || (coordinatesO.includes(2) && coordinatesO.includes(5) && coordinatesO.includes(8)) || (coordinatesO.includes(0) && coordinatesO.includes(4) && coordinatesO.includes(8)) || (coordinatesO.includes(2) && coordinatesO.includes(4) && coordinatesO.includes(6)))) {
      console.log(`${playerO} WINS!`);
      gameInfo.textContent = `${playerO} WINS!`;
      GameBoard.gameInfoSection.classList.remove('invisible');
      return true;
    } else {
      return false;
    }

    for (let i = 0; i < noOfBoxes; i++) {
      if (gameBoardArray[i].clicked === false) {
        gameBoardArray[i].clicked === true;
      }
    }
  }

  playAgainBtn.addEventListener('click', () => {
    GameBoard.display();
    GameBoard.gameInfoSection.classList.add('invisible');
  });

  showMark();
})();

// Module for player marks
const Mark = (() => {
  const xmark = '<i class="fa-solid fa-xmark x-mark"></i>';
  const omark = '<i class="fa-regular fa-circle o-mark"></i>';
  
  return {xmark, omark};
})();
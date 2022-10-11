// TIC TAC TOE

// Module for loading Tic Tac Toe grid
const GameBoard = (() => {
  const gameBoard = document.querySelector('#game-board');
  const playerNameModal = document.querySelector('#player-name-modal');
  const mainSection = document.querySelector('main');
  const gameInfo = document.querySelector('#game-info');
  const playAgainBtn = document.querySelector('#play-again-btn');
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  // Factory function for box state
  const BoxState = (clicked, mark) => {
    return {clicked, mark};
  };
  
  const display = () => {
    const playerXDisp = document.querySelector('#player-x-disp');
    const playerODisp = document.querySelector('#player-o-disp');
    const playerXName = playerXDisp.textContent;
    const playerOName = playerODisp.textContent;
    let playerX = Player.playerX;
    let playerO = Player.playerO;

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

    if (playerX.toPlay === true && playerO.toPlay === false) {
      gameInfo.textContent = `${playerXName} TO START THE GAME!`
      gameInfo.classList.remove('invisible');
    } else if (playerX.toPlay === false && playerO.toPlay === true) {
      gameInfo.textContent = `${playerOName} TO START THE GAME!`
      gameInfo.classList.remove('invisible');
    }

    console.log(gameBoardArray); //! REMOVE LATER
  };

  return {gameBoard, gameBoardArray, display, gameInfo, playAgainBtn};
})();

// Module to create players
const Player = (() => {
  const playerXInput = document.querySelector('#player-x-input');
  const playerOInput = document.querySelector('#player-o-input');
  const playerXDisp = document.querySelector('#player-x-disp');
  const playerODisp = document.querySelector('#player-o-disp');
  const startGameBtn = document.querySelector('#start-game-btn');

  const PlayerFactory = (name, toPlay) => {
    return {name, toPlay};
  };

  const playerX = PlayerFactory(playerXInput.value, true);
  const playerO = PlayerFactory(playerOInput.value, false);

  startGameBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (playerXInput.value === '' || playerOInput.value === '') return;

    const playerXName = playerXInput.value.toUpperCase();
    const playerOName = playerOInput.value.toUpperCase();
    playerXDisp.textContent = playerXName;
    playerODisp.textContent = playerOName;

    GameBoard.display();
  });

  return {playerX, playerO};
})();

// Module to control flow of game
const GameFlow = (() => {
  const gameInfo = document.querySelector('#game-info');
  const playAgainBtn = document.querySelector('#play-again-btn');
  const gameBoard = GameBoard.gameBoard;
  let gameBoardArray = GameBoard.gameBoardArray;
  const noOfBoxes = gameBoardArray.length;
  let playerX = Player.playerX;
  let playerO = Player.playerO;
  let coordinatesX = [];
  let coordinatesO = [];
  let gameIsOver = false;

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
      const playerXDisp = document.querySelector('#player-x-disp');
      const playerODisp = document.querySelector('#player-o-disp');
      const playerXName = playerXDisp.textContent;
      const playerOName = playerODisp.textContent;
      let box = e.target;
      let boxIndex = box.dataset.index - 1;
      
      if (box.classList.contains('tictactoe-box')) {
        if (gameBoardArray[boxIndex].clicked === false && gameIsOver === false) {
          if (playerX.toPlay === false && playerO.toPlay === true) {
            gameBoardArray[boxIndex].clicked = true;
          }

          if (checkTurn()) {
            gameBoardArray[boxIndex].mark = 'X';
            box.innerHTML = Mark.xmark;
            gameInfo.textContent = `${playerOName}'S TURN!`;
          } else {
            gameBoardArray[boxIndex].mark = 'O';
            box.innerHTML = Mark.omark;
            gameInfo.textContent = `${playerXName}'S TURN!`;
          }
          
          if (playerX.toPlay === true && playerO.toPlay === false) {
            gameBoardArray[boxIndex].clicked = true;
          }
          checkGame(boxIndex);
        }
      }
    });
  };

  showMark();

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
    const playerXName = playerXDisp.textContent;
    const playerOName = playerODisp.textContent;

    if ((coordinatesX.includes(0) && coordinatesX.includes(1) && coordinatesX.includes(2)) || (coordinatesX.includes(3) && coordinatesX.includes(4) && coordinatesX.includes(5)) || (coordinatesX.includes(6) && coordinatesX.includes(7) && coordinatesX.includes(8)) || (coordinatesX.includes(0) && coordinatesX.includes(3) && coordinatesX.includes(6)) || (coordinatesX.includes(1) && coordinatesX.includes(4) && coordinatesX.includes(7)) || (coordinatesX.includes(2) && coordinatesX.includes(5) && coordinatesX.includes(8)) || (coordinatesX.includes(0) && coordinatesX.includes(4) && coordinatesX.includes(8)) || (coordinatesX.includes(2) && coordinatesX.includes(4) && coordinatesX.includes(6))) {
      console.log(`${playerXName} WINS!`);
      gameIsOver = true;
      gameInfo.textContent = `${playerXName} WINS!`;
      GameBoard.gameInfo.classList.remove('invisible');
      GameBoard.playAgainBtn.classList.remove('invisible');
      playerO.toPlay = true;
      playerX.toPlay = false;
    } else if (((coordinatesO.includes(0) && coordinatesO.includes(1) && coordinatesO.includes(2)) || (coordinatesO.includes(3) && coordinatesO.includes(4) && coordinatesO.includes(5)) || (coordinatesO.includes(6) && coordinatesO.includes(7) && coordinatesO.includes(8)) || (coordinatesO.includes(0) && coordinatesO.includes(3) && coordinatesO.includes(6)) || (coordinatesO.includes(1) && coordinatesO.includes(4) && coordinatesO.includes(7)) || (coordinatesO.includes(2) && coordinatesO.includes(5) && coordinatesO.includes(8)) || (coordinatesO.includes(0) && coordinatesO.includes(4) && coordinatesO.includes(8)) || (coordinatesO.includes(2) && coordinatesO.includes(4) && coordinatesO.includes(6)))) {
      console.log(`${playerOName} WINS!`);
      gameIsOver = true;
      gameInfo.textContent = `${playerOName} WINS!`;
      GameBoard.gameInfo.classList.remove('invisible');
      GameBoard.playAgainBtn.classList.remove('invisible');
      playerX.toPlay = true;
      playerO.toPlay = false;
    } else if (gameBoardArray[0].clicked === true && gameBoardArray[1].clicked === true && gameBoardArray[2].clicked === true && gameBoardArray[3].clicked === true && gameBoardArray[4].clicked === true && gameBoardArray[5].clicked === true && gameBoardArray[6].clicked === true && gameBoardArray[7].clicked === true && gameBoardArray[8].clicked === true) {
      console.log(`IT'S A TIE!`);
      gameIsOver = true;
      gameInfo.textContent = `IT'S A TIE!`;
      GameBoard.gameInfo.classList.remove('invisible');
      GameBoard.playAgainBtn.classList.remove('invisible');
    }
  }

  playAgainBtn.addEventListener('click', () => {
    GameBoard.display();
    GameBoard.playAgainBtn.classList.add('invisible');
    gameIsOver = false;
    coordinatesX = [];
    coordinatesO = [];
  });
})();

// Module for player marks
const Mark = (() => {
  const xmark = '<i class="fa-solid fa-xmark x-mark"></i>';
  const omark = '<i class="fa-regular fa-circle o-mark"></i>';
  
  return {xmark, omark};
})();
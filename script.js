const Gameboard = (() => {
  let board = Array(9).fill("");

  const getBoard = () => board;
  const updateBoard = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    board = Array(9).fill("");
  };

  return { getBoard, updateBoard, resetBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const GameController = (() => {
  let player1, player2, currentPlayer, isGameOver;

  const startGame = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    isGameOver = false;
    Gameboard.resetBoard();
    DisplayController.renderBoard();
    DisplayController.setMessage(`${currentPlayer.name}'s turn`);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playTurn = (index) => {
    if (!isGameOver && Gameboard.updateBoard(index, currentPlayer.marker)) {
      DisplayController.renderBoard();
      if (checkWinner()) {
        DisplayController.setMessage(`${currentPlayer.name} wins!`);
        isGameOver = true;
      } else if (Gameboard.getBoard().every((cell) => cell !== "")) {
        DisplayController.setMessage("It's a tie!");
        isGameOver = true;
      } else {
        switchPlayer();
        DisplayController.setMessage(`${currentPlayer.name}'s turn`);
      }
    }
  };

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) =>
      pattern.every(
        (index) => Gameboard.getBoard()[index] === currentPlayer.marker
      )
    );
  };

  return { startGame, playTurn };
})();

const DisplayController = (() => {
  const renderBoard = () => {
    const board = Gameboard.getBoard();
    const gameboardElement = document.getElementById("gameboard");
    gameboardElement.innerHTML = "";
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("square");
      cellElement.textContent = cell;
      cellElement.addEventListener("click", () =>
        GameController.playTurn(index)
      );
      gameboardElement.appendChild(cellElement);
    });
  };

  const setMessage = (message) => {
    const messageElement = document.getElementById("game-message");
    messageElement.textContent = message;
  };

  const setUpEventListeners = () => {
    document.getElementById("start-button").addEventListener("click", () => {
      const player1 = document.getElementById("player1").value;
      const player2 = document.getElementById("player2").value;
      if (player1 && player2) {
        GameController.startGame(player1, player2);
      } else {
        setMessage("Please enter names for both players");
      }
    });

    document.getElementById("restart-button").addEventListener("click", () => {
      const player1 = document.getElementById("player1").value;
      const player2 = document.getElementById("player2").value;
      if (player1 && player2) {
        GameController.startGame(player1, player2);
      } else {
        setMessage("Please enter names for both players");
      }
    });
  };

  setUpEventListeners();

  return { renderBoard, setMessage };
})();

document.addEventListener("DOMContentLoaded", () => {
  DisplayController.setMessage("Enter player names and start the game");
});

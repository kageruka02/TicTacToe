const gameBoard = (() => {
  let board = Array(9).fill("");
  const getBoard = () => board;
  const updateBoard = (marker, index) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    } else {
      return false;
    }
  };
  const resetBoard = () => {
    board = Array(9).fill("");
  };
  return { getBoard, updateBoard, resetBoard };
})();

const player = (name, marker) => {
  return { name, marker };
};

const gameController = (() => {
  let player1, player2, isGameOver, currentPlayer;
  const start = (name1, name2) => {
    player1 = player(name1, "X");
    player2 = player(name2, "0");
    gameBoard.resetBoard();
    isGameOver = false;
    currentPlayer = player1;
    renderBoard();
    setMessage(`It's your turn ${currentPlayer.name}`);
  };
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    console.log(`the current player is ${currentPlayer.name}`);
  };
  const renderBoard = () => {
    const board = gameBoard.getBoard();
    console.log(`${board[0]}, ||, ${board[1]}, ||, ${board[2]}`);
    console.log(`${board[3]}, ||, ${board[4]}, ||, ${board[5]}`);
    console.log(`${board[6]}, ||, ${board[7]}, ||, ${board[8]}`);
  };
  const setMessage = (message) => {
    const gameMessage = document.querySelector("#game-message");
    gameMessage.textContent = message;
    console.log(message);
  };
  const winnerCheck = () => {
    const winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winPattern.some((pattern) =>
      pattern.every(
        (index) => gameBoard.getBoard()[index] === currentPlayer.marker
      )
    );
  };
  const turn = (index) => {
    if (!isGameOver && gameBoard.getBoard()[index] === "") {
      gameBoard.updateBoard(currentPlayer.marker, index);
      if (winnerCheck()) {
        console.log("hello");
        renderBoard();
        isGameOver = true;
        setMessage(`${currentPlayer.name} wins the game`);
        return;
      } else if (gameBoard.getBoard().every((cell) => cell !== "")) {
        isGameOver = true;
        renderBoard();
        setMessage(`you both tied`);
        return;
      }
      renderBoard();
      switchPlayer();
      setMessage(`the current player is ${currentPlayer.name}`);
    } else {
      if (gameBoard.getBoard()[index] !== "") return;
      console.log("The game already ended");
    }
  };
  return { start, turn, setMessage };
})();

const displayController = (() => {
  const cellDisplayer = () => {
    const gameboard = document.querySelector("#gameboard");
    gameboard.textContent = "";
    for (let x = 0; x < 9; x++) {
      const square = document.createElement("div");
      square.classList.add("square");
      gameboard.appendChild(square);
    }
    cellPlaying();
  };

  const cellController = () => {
    const startGame = document.querySelector("#start-button");
    startGame.addEventListener("click", function () {
      const player1 = document.querySelector("#player1").value
        ? document.querySelector("#player1").value
        : "player1";
      const player2 = document.querySelector("#player2").value
        ? document.querySelector("#player2").value
        : "player2";
      if (player1 && player2) {
        document.querySelector("#player1").setAttribute("readonly", true);
        document.querySelector("#player2").setAttribute("readonly", true);
        cellDisplayer();
        gameController.start(player1, player2);
      }
    });
    const restartGame = document.querySelector("#restart-button");
    restartGame.addEventListener("click", function () {
      location.reload();
    });
  };
  const cellPlaying = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.addEventListener("click", function () {
        gameController.turn(index);
        const boardNew = gameBoard.getBoard();
        square.textContent = boardNew[index];
      });
    });
  };

  cellController();
})();

document.addEventListener("DOMContentLoaded", () => {
  gameController.setMessage("Enter player names and start the game");
});

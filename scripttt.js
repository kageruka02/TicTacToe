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
    renderBoard();
    setMessage(`${currentPlayer.name}'s turn`);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playTurn = (index) => {
    if (!isGameOver && Gameboard.updateBoard(index, currentPlayer.marker)) {
      renderBoard();
      if (checkWinner()) {
        setMessage(`${currentPlayer.name} wins!`);
        isGameOver = true;
      } else if (Gameboard.getBoard().every((cell) => cell !== "")) {
        setMessage("It's a tie!");
        isGameOver = true;
      } else {
        switchPlayer();
        setMessage(`${currentPlayer.name}'s turn`);
      }
    } else if (!isGameOver) {
      setMessage("Invalid move! Try again.");
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

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    console.clear();
    console.log(
      `${board[0]} | ${board[1]} | ${board[2]}\n` +
        `---------\n` +
        `${board[3]} | ${board[4]} | ${board[5]}\n` +
        `---------\n` +
        `${board[6]} | ${board[7]} | ${board[8]}\n`
    );
  };

  const setMessage = (message) => {
    console.log(message);
  };

  return { startGame, playTurn };
})();

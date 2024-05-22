Tic Tac Toe Game
A simple, interactive Tic Tac Toe game built with HTML, CSS, and JavaScript.

Features
Two-player mode with custom player names.
Interactive game board with real-time updates.
Displays game messages for the current player's turn, win, or tie.
Restart game functionality to reset the board and start a new game.
Demo

Getting Started
These instructions will help you start playing the game using the live link https://kageruka02.github.io/TicTacToe/

Prerequisites
Web browser (e.g., Google Chrome, Mozilla Firefox)
Usage
Open the live link in your web browser: Tic Tac Toe Game Live
Enter player names in the input fields.
Click the "Start Game" button to begin.
Players take turns clicking on the game board squares to mark their moves.
The game will display a message when there is a winner or a tie.
Click the "Restart Game" button to reset the game and start over.

Code Overview
HTML
The HTML file contains the structure of the game, including player input fields, the game board, and control buttons.

CSS
The CSS file styles the game interface, including the layout, fonts, and colors.

JavaScript
The JavaScript file contains the game logic, including:

gameBoard module: Manages the game board state.
player factory function: Creates player objects.
gameController module: Controls game flow, player turns, and win/tie checking.
displayController module: Handles UI interactions and updates.

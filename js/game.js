const boardElement = document.getElementById('board');
const startAiGameButton = document.getElementById('start-ai-game');
const startScenarioButton = document.getElementById('start-scenario');

let game = new Chess();  // Assuming chess.js provides the Chess class

const piecesImages = {
  'p': 'pawn', 'r': 'rook', 'n': 'knight', 'b': 'bishop', 'q': 'queen', 'k': 'king'
};

// Initialize the chessboard
function drawBoard() {
  boardElement.innerHTML = '';
  const board = game.board();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add((row + col) % 2 === 0 ? 'white-tile' : 'black-tile');

      const piece = board[row][col];
      if (piece) {
        const img = document.createElement('img');
        img.src = `img/${piece.color}_${piecesImages[piece.type]}.png`;
        square.appendChild(img);
      }

      boardElement.appendChild(square);
    }
  }
}

// Update the game status (player turn, check, etc.)
function updateStatus() {
  const statusElement = document.getElementById('game-status');
  if (game.in_checkmate()) {
    statusElement.textContent = 'Checkmate!';
  } else if (game.in_draw()) {
    statusElement.textContent = 'Draw!';
  } else {
    statusElement.textContent = `${game.turn() === 'w' ? 'White' : 'Black'} to move.`;
  }
}

// Handle AI Game Button
startAiGameButton.addEventListener('click', () => {
  game.reset();
  drawBoard();
  updateStatus();
});

// Handle Practice Scenarios Button (optional implementation)
startScenarioButton.addEventListener('click', () => {
  // Load scenario here (you can preset some board positions)
  const scenarioFEN = 'r1bqkbnr/pppppppp/n7/8/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3';  // Example scenario
  game.load(scenarioFEN);
  drawBoard();
  updateStatus();
});

// Draw the initial board when the page loads
drawBoard();
updateStatus();

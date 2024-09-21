const solveNQueenButton = document.getElementById('solve-nqueen');
const nQueenBoard = document.getElementById('nqueen-board');
const nQueenNumber = document.getElementById('nqueen-number');

function createNQueenBoard(size) {
    nQueenBoard.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    nQueenBoard.innerHTML = '';
    
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('nqueen-cell');
        nQueenBoard.appendChild(cell);
    }
}

function isSafe(board, row, col, size) {
    for (let i = 0; i < col; i++) {
        if (board[row][i]) return false; // Check row
    }
    
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false; // Check upper diagonal
    }
    
    for (let i = row, j = col; i < size && j >= 0; i++, j--) {
        if (board[i][j]) return false; // Check lower diagonal
    }
    
    return true; // Safe to place queen
}

function solveNQueenUtil(board, col, size) {
    if (col >= size) return true; // All queens are placed
    
    for (let i = 0; i < size; i++) {
        if (isSafe(board, i, col, size)) {
            board[i][col] = 1; // Place queen
            
            if (solveNQueenUtil(board, col + 1, size)) return true; // Recur to place next queen
            
            board[i][col] = 0; // Backtrack
        }
    }
    
    return false; // No solution found
}

function solveNQueen(size) {
    const board = Array.from({ length: size }, () => Array(size).fill(0));
    
    if (solveNQueenUtil(board, 0, size)) {
        renderNQueenBoard(board);
    } else {
        alert('No solution exists for N = ' + size);
    }
}

function renderNQueenBoard(board) {
   const cells = nQueenBoard.querySelectorAll('.nqueen-cell');
   const size = board.length;

   cells.forEach((cell, index) => {
       const row = Math.floor(index / size);
       const col = index % size;

       if (board[row][col] === 1) {
           cell.classList.add('queen');
           cell.textContent = '♛'; // Queen symbol
       } else {
           cell.classList.remove('queen');
           cell.textContent = '';
       }
   });
}

solveNQueenButton.addEventListener('click', () => {
   const size = parseInt(nQueenNumber.value);
   if (size < 4 || size > 20) {
       alert('Please enter a number between 4 to 20.');
       return;
   }
   createNQueenBoard(size);
   solveNQueen(size);
});
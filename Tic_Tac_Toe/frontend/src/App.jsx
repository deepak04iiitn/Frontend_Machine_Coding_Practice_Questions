import React, { useState } from 'react';

export default function TicTacToe() {
  
  const [size, setSize] = useState('');
  const [board, setBoard] = useState([]);
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    const n = parseInt(size);
    if (!n || n < 3 || n > 10) {
      alert("Enter a board size between 3 and 10.");
      return;
    }
    setBoard(Array(n * n).fill(null));
    setIsXTurn(true);
    setStatus('');
    setGameStarted(true);
  };

  const handleClick = (index) => {
    if (board[index] || status) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const winner = checkWinner(newBoard, parseInt(size));
    if (winner) {
      setStatus(`${winner} wins!`);
    } else if (newBoard.every(cell => cell)) {
      setStatus("It's a Draw!");
    }
  };

  const checkWinner = (board, size) => {
    const lines = [];

    // Rows
    for (let i = 0; i < size; i++) {
      lines.push([...Array(size)].map((_, j) => i * size + j));
    }

    // Columns
    for (let j = 0; j < size; j++) {
      lines.push([...Array(size)].map((_, i) => i * size + j));
    }

    // Main diagonal
    lines.push([...Array(size)].map((_, i) => i * size + i));

    // Anti-diagonal
    lines.push([...Array(size)].map((_, i) => i * size + (size - i - 1)));

    for (let line of lines) {
      const symbols = line.map(index => board[index]);
      if (symbols.every(cell => cell && cell === symbols[0])) {
        return symbols[0];
      }
    }

    return null;
  };

  const restartGame = () => {
    setBoard(Array(parseInt(size) * parseInt(size)).fill(null));
    setIsXTurn(true);
    setStatus('');
  };

  const resetAll = () => {
    setSize('');
    setBoard([]);
    setIsXTurn(true);
    setStatus('');
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      {!gameStarted ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Enter Board Size (3-10)</h1>
          <input
            type="number"
            value={size}
            min="3"
            max="10"
            onChange={(e) => setSize(e.target.value)}
            className="border px-4 py-2 rounded w-32 text-center text-lg mb-4"
          />
          <br />
          <button
            onClick={startGame}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded text-lg"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">{size} x {size} Tic Tac Toe</h1>
          <div
            className="grid gap-2 mb-6"
            style={{
              gridTemplateColumns: `repeat(${size}, 60px)`
            }}
          >
            {board.map((cell, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className="w-[60px] h-[60px] flex items-center justify-center border text-xl font-semibold bg-white shadow cursor-pointer hover:bg-blue-100"
              >
                {cell}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-medium mb-4">{status || `Turn: ${isXTurn ? 'X' : 'O'}`}</h2>
          <div className="flex gap-4">
            <button
              onClick={restartGame}
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-5 py-2 rounded"
            >
              Restart
            </button>
            <button
              onClick={resetAll}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-5 py-2 rounded"
            >
              Change Size
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

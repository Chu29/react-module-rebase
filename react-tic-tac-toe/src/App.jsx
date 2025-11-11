// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [boxes, setBoxes] = useState(Array(9).fill(null));
//   const [playerTurn, setPlayerTurn] = useState(true);

//   const checkWinner = (box) => {
//     const wineLines = [
//       [0, 1, 2],
//       [0, 3, 6],
//       [0, 4, 8],
//       [1, 4, 7],
//       [2, 5, 8],
//       [2, 4, 6],
//       [3, 4, 5],
//       [6, 7, 8],
//     ];

//     for (let i = 0; i < wineLines.length; i++) {
//       const [a, b, c] = wineLines[i];
//       if (box[a] && box[a] === box[b] && box[a] === box[c]) return box[a];
//     }
//     return null;
//   };

//   const handleClick = (index) => {
//     const newBox = boxes.slice();
//     newBox[index] = playerTurn ? "X" : "O";
//     setBoxes(newBox);
//     setPlayerTurn(!playerTurn);
//   };

//   const winner = checkWinner(boxes);
//   if (winner)
//     return (
//       <>
//         <p>{winner ? `Winner: ${winner}` : ""}</p>
//       </>
//     );

//   return (
//     <>
//       <h1>Tic Tac Toe</h1>
//       <main>
//         <div className="container">
//           {boxes.map((value, index) => (
//             <button key={index} onClick={() => handleClick(index)}>
//               {value}
//             </button>
//           ))}
//         </div>
//         <p>{`Next Player: ${playerTurn ? "X" : "O"}`}</p>
//       </main>
//     </>
//   );
// }
// export default App;

import { useEffect, useState } from "react";
import "./App.css";

const boxSizes = 3;
function App() {
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState(null);

  const [turn, setTurn] = useState("X");

  const [box, setBox] = useState(() => {
    const xCords = [];
    for (let i = 0; i < boxSizes; i++) {
      xCords.push(Array(boxSizes).fill(null));
    }
    return xCords;
  });

  const calculateWinner = (board) => {
    const inferWinnerCoordinates = (board) => {
      const coordinatesCombinations = [];
      for (let i = 0; i < boxSizes; i++) {
        let rowCoordinates = [];
        let columnCoordinates = [];
        for (let j = 0; j < boxSizes; j++) {
          rowCoordinates.push([i, j]);
          columnCoordinates.push([j, i]);
        }
        coordinatesCombinations.push(rowCoordinates);
        coordinatesCombinations.push(columnCoordinates);
      }

      let diagonalCoordinates1 = [];
      let diagonalCoordinates2 = [];
      for (let i = 0; i < boxSizes; i++) {
        diagonalCoordinates1.push([i, i]);
        diagonalCoordinates2.push([i, boxSizes - 1 - i]);
      }
      coordinatesCombinations.push(diagonalCoordinates1);
      coordinatesCombinations.push(diagonalCoordinates2);

      return coordinatesCombinations;
    };

    const winningCords = inferWinnerCoordinates();

    let hasWon = false;
    let winner = null;

    for (let cords of winningCords) {
      const winX = cords.every(([x, y]) => board[x][y] === "X");

      const winO = cords.every(([x, y]) => board[x][y] === "O");

      const win = winX || winO;

      if (win) {
        hasWon = true;
        winner = board[cords[0][0]][cords[0][1]];
        break;
      }
    }
    return hasWon ? winner : null;
  };

  const nextRandomMove = (board) => {
    const emptyCells = [];
    for (let i = 0; i < boxSizes; i++) {
      for (let j = 0; j < boxSizes; j++) {
        if (board[i][j] === null) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  const play = (x, y) => {
    if (box[x][y] !== null) {
      return;
    }

    // deep copy of the box state
    const newBox = box.map((row) => row.slice());
    // assuming we are always playing X and machine always plays O
    newBox[x][y] = "X";
    setBox(newBox);
    const winner = calculateWinner(newBox);
    if (winner) {
      setWinner(winner);
      return;
    }

    setTurn("O");
  };

  useEffect(() => {
    if (turn === "O") {
      const newBox = box.map((row) => row.slice());
      setTimeout(() => {
        const machineMove = nextRandomMove(newBox);
        if (machineMove) {
          const [machineX, machineY] = machineMove;
          newBox[machineX][machineY] = "O";
          setBox(newBox);

          const winner = calculateWinner(newBox);

          if (winner) {
            setWinner(winner);
            return;
          }
        } else {
          setDraw(true);
        }
        setTurn("X");
      }, 1000);
    }
  }, [turn]);

  return (
    <div className="page">
      <div className="board-main-container">
        <h1 className="board-title">Tic Tac Toe Game board</h1>
        <div className="board-container">
          <div className="draw-indicator">{draw ? "Game Drawn!" : ""}</div>
          <div className="winner-indicator">
            {winner ? `Winner: ${winner}` : ""}
          </div>
          {box.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, cellIndex) => (
                <div
                  onClick={() => !winner && !draw && play(rowIndex, cellIndex)}
                  key={cellIndex}
                  className="box"
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

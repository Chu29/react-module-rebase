import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState(
    Array.from({ length: 9 }, (_, index) => index + 1).fill(null)
  );
  const [playerTurn, setPlayerTurn] = useState(true);

  const handleClick = (index) => {
    const newBox = boxes.slice();
    newBox[index] = playerTurn ? "X" : "O";
    setBoxes(newBox);
    setPlayerTurn(!playerTurn);
    console.log(newBox);
  };

  const checkWinner = (squares) => {
    const wineLines = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (let [a, b, c] of wineLines.length) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <main>
        <div className="container">
          {boxes.map((value, index) => (
            <button key={index} onClick={() => handleClick(index)}>
              {value}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
export default App;

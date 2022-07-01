import "./App.css";
import Tile from "./components/Tile/Tile";
import { useEffect, useState } from "react";

const ROWS = 4;
const COLS = 4;

function App() {
  let [board, setBoard] = useState([]);

  useEffect(() => {
    const board = createInitialBoard();
    setBoard(board);
    setBoard(getRandomTile(board));
    setBoard(getRandomTile(board));
  }, []);

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {row.map(({ row, col, number }, tileIdx) => {
                return (
                  <Tile key={tileIdx} number={number} row={row} col={col} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const createInitialBoard = () => {
  const board = [];
  for (let row = 0; row < ROWS; row++) {
    let currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createTile(row, col));
    }
    board.push(currentRow);
  }
  return board;
};

const createTile = (row, col) => {
  return {
    col,
    row,
    number: null,
  };
};

const getRandomTile = (grid) => {
  const emptyTiles = [];
  grid.forEach((row) => {
    row.forEach((tile) => {
      if (tile.number === null) {
        emptyTiles.push(tile);
      }
    });
  });
  let tileIdx = Math.floor(Math.random() * emptyTiles.length);
  let selectedTile = emptyTiles[tileIdx];
  grid[selectedTile.row][selectedTile.col].number = 2;
  return grid;
};
export default App;

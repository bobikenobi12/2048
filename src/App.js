import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const ROWS = 4;
const COLS = 4;

function App() {
  let [grid, setGrid] = useState([]);
  useEffect(() => {
    const grid = createInitialGrid();
    setGrid(grid);
    console.log(grid);
  }, []);
  return <h1>Kestakov</h1>;
}

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    let currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createTile(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createTile = (row, col) => {
  return {
    col,
    row,
  };
};
export default App;

import "./App.css";
import Tile from "./components/Tile/Tile";
import { useEffect, useState } from "react";

const ROWS = 4;
const COLS = 4;

/**
 * @param {KeyboardEvent} e
 * @param {{ col: number, row: number, number: number }[][]} board
 * @param {(board: { col: number, row: number, number: number }[][]) => void} setBoard
 */
function keyDownHandler(e, board, setBoard) {
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            break;
        case "ArrowDown":
            console.log("down");
            break;
        case "ArrowLeft":
            console.log("left");
            break;
        case "ArrowRight":
            console.log("right");
            setBoard(merge(board));
            console.log(board);
            break;
        default:
            return;
    }
}

function App() {
    let [board, setBoard] = useState([]);

    useEffect(() => {
        const board = createInitialBoard();
        setBoard(board);
        setBoard(getRandomTile(board));
        setBoard(getRandomTile(board));
    }, []);

    return (
        <div
            className="game"
            tabIndex={0}
            onKeyDown={e => keyDownHandler(e, board, setBoard)}
        >
            <div className="board-wrapper">
                <div className="board">
                    {board.map((row, rowIdx) => {
                        return (
                            <div className="row" key={rowIdx}>
                                {row.map(({ row, col, number }, tileIdx) => {
                                    return (
                                        <Tile
                                            key={tileIdx}
                                            number={number}
                                            row={row}
                                            col={col}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
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

/**
 * @param {number} row
 * @param {number} col
 * @returns {{ col: number, row: number, number: number }}
 */
const createTile = (row, col) => {
    return {
        col,
        row,
        number: null,
    };
};

/**
 * @param {{ col: number, row: number, number: number }[][]} board
 */
const getRandomTile = board => {
    const emptyTiles = [];

    board.forEach(row => {
        row.forEach(tile => {
            if (tile.number === null) {
                emptyTiles.push(tile);
            }
        });
    });

    let tileIdx = Math.floor(Math.random() * emptyTiles.length);
    let selectedTile = emptyTiles[tileIdx];
    let number = 2;

    if (Math.floor(Math.random() * 10) === 1) number = 4;

    board[selectedTile.row][selectedTile.col].number = number;

    return board;
};

/**
 *
 * @param {{ col: number, row: number, number: number }[][]} board
 * @param {number} rowIdx
 * @returns {{ col: number, row: number, number: number }[][]}
 */
const merge = board => {
    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
        for (let colIdx = 0; colIdx < COLS; colIdx++) {
            let currentTileNumber = board[rowIdx][colIdx].number;

            if (!currentTileNumber) {
                continue;
            }

            for (let col = colIdx + 1; col < COLS; col++) {
                if (!board[rowIdx][col].number) {
                    continue;
                }

                if (currentTileNumber === board[rowIdx][col].number) {
                    board[rowIdx][colIdx].number = null;
                    board[rowIdx][col].number *= 2;
                } else {
                    break;
                }
            }
        }
    }

    return board;
};

export default App;

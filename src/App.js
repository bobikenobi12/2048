import "./App.css";
import Tile from "./components/Tile/Tile";
import { useEffect, useState } from "react";

const ROWS = 4;
const COLS = 4;

function App() {
    let [board, setBoard] = useState([]);
    // eslint-disable-next-line no-unused-vars
    let [_, setUpdate] = useState(false);

    useEffect(() => {
        const board = createInitialBoard();
        setBoard(board);
        setBoard(getRandomTile(board));
        setBoard(getRandomTile(board));
    }, []);

    /**
     * @param {KeyboardEvent} e
     */
    function keyDownHandler(e) {
        switch (e.key) {
            case "ArrowUp":
                setBoard(board => mergeUp(board));
                break;
            case "ArrowDown":
                setBoard(board => mergeDown(board));
                break;
            case "ArrowLeft":
                setBoard(board => mergeLeft(board));
                break;
            case "ArrowRight":
                setBoard(board => mergeRight(board));
                break;
            default:
                return;
        }

        setTimeout(() => {
            setBoard(getRandomTile(board));
            setUpdate(update => !update);
        }, 10);
    }

    return (
        <div className="game" tabIndex={0} onKeyDown={keyDownHandler}>
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
 * @param {{ col: number, row: number, number: number }[][]} board
 * @returns {{ col: number, row: number, number: number }[][]}
 */
const mergeRight = board => {
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
                    colIdx = col;
                } else {
                    break;
                }
            }
        }
    }

    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
        for (let colIdx = 0; colIdx < COLS; colIdx++) {
            if (board[rowIdx][colIdx].number) {
                continue;
            }

            for (let col = colIdx - 1; col >= 0; col--) {
                if (board[rowIdx][col].number) {
                    board[rowIdx][colIdx].number = board[rowIdx][col].number;
                    board[rowIdx][col].number = null;
                    break;
                }
            }
        }
    }

    return board;
};

/**
 * @param {{ col: number, row: number, number: number }[][]} board
 * @returns {{ col: number, row: number, number: number }[][]}
 */
const mergeLeft = board => {
    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
        for (let colIdx = COLS - 1; colIdx >= 0; colIdx--) {
            let currentTileNumber = board[rowIdx][colIdx].number;

            if (!currentTileNumber) {
                continue;
            }

            for (let col = colIdx - 1; col >= 0; col--) {
                if (!board[rowIdx][col].number) {
                    continue;
                }

                if (currentTileNumber === board[rowIdx][col].number) {
                    board[rowIdx][colIdx].number = null;
                    board[rowIdx][col].number *= 2;
                    colIdx = col;
                } else {
                    break;
                }
            }
        }
    }

    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
        for (let colIdx = 0; colIdx < COLS; colIdx++) {
            if (board[rowIdx][colIdx].number) {
                continue;
            }

            for (let col = colIdx + 1; col < COLS; col++) {
                if (board[rowIdx][col].number) {
                    board[rowIdx][colIdx].number = board[rowIdx][col].number;
                    board[rowIdx][col].number = null;
                    break;
                }
            }
        }
    }

    return board;
};

/**
 *
 * @param {{ col: number, row: number, number: number }[][]} board
 * @returns {{ col: number, row: number, number: number }[][]}
 */
const mergeDown = board => {
    for (let colIdx = 0; colIdx < COLS; colIdx++) {
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
            let currentTileNumber = board[rowIdx][colIdx].number;

            if (!currentTileNumber) {
                continue;
            }

            for (let row = rowIdx + 1; row < ROWS; row++) {
                if (!board[row][colIdx].number) {
                    continue;
                }

                if (currentTileNumber === board[row][colIdx].number) {
                    board[rowIdx][colIdx].number = null;
                    board[row][colIdx].number *= 2;
                    rowIdx = row;
                } else {
                    break;
                }
            }
        }
    }

    for (let colIdx = 0; colIdx < COLS; colIdx++) {
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
            if (board[rowIdx][colIdx].number) {
                continue;
            }

            for (let row = rowIdx - 1; row >= 0; row--) {
                if (board[row][colIdx].number) {
                    board[rowIdx][colIdx].number = board[row][colIdx].number;
                    board[row][colIdx].number = null;
                    break;
                }
            }
        }
    }

    return board;
};

/**
 * @param {{ col: number, row: number, number: number }[][]} board
 * @returns {{ col: number, row: number, number: number }[][]}
 */
const mergeUp = board => {
    for (let colIdx = 0; colIdx < COLS; colIdx++) {
        for (let rowIdx = ROWS - 1; rowIdx >= 0; rowIdx--) {
            let currentTileNumber = board[rowIdx][colIdx].number;

            if (!currentTileNumber) {
                continue;
            }

            for (let row = rowIdx - 1; row >= 0; row--) {
                if (!board[row][colIdx].number) {
                    continue;
                }

                if (currentTileNumber === board[row][colIdx].number) {
                    board[rowIdx][colIdx].number = null;
                    board[row][colIdx].number *= 2;
                    rowIdx = row;
                } else {
                    break;
                }
            }
        }
    }

    for (let colIdx = 0; colIdx < COLS; colIdx++) {
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
            if (board[rowIdx][colIdx].number) {
                continue;
            }

            for (let row = rowIdx + 1; row < ROWS; row++) {
                if (board[row][colIdx].number) {
                    board[rowIdx][colIdx].number = board[row][colIdx].number;
                    board[row][colIdx].number = null;
                    break;
                }
            }
        }
    }

    return board;
};

export default App;

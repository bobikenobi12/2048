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
		console.log(board);
	}, []);

	return (
		<div className="board-wrapper">
			<div className="board">
				{board.map((row, rowIdx) => {
					return (
						<div className="row" key={rowIdx}>
							{row.map((tile, tileIdx) => {
								return <Tile key={tileIdx} />;
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
	};
};
export default App;

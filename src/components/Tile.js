function Tile(props) {
	return (
		<div className="tile {props?.number}">{props?.number || "&nbsp;"}</div>
	);
}

export default Tile;

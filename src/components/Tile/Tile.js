import "./Tile.css";

function Tile(props) {
	return (
		<div className="tile" key={props.key}>
			{props?.number || " "}
		</div>
	);
}

export default Tile;

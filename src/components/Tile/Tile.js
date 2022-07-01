import "./Tile.css";

function Tile(props) {
  return <div className={`tile ${props.number}`}>{props?.number || " "}</div>;
}

export default Tile;

import "./Tile.css";

function hashCode(str) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
}

function hashToHex(hash) {
    let color = (hash & 0x00ffffff).toString(16).toUpperCase();

    return "00000".substring(0, 6 - color.length) + color;
}

function Tile(props) {
    let seed = "";

    if (props?.number) {
        for (let i = 0; i < 6; i++) {
            seed += props?.number;
        }
    }

    return (
        <div
            className="tile"
            style={{
                backgroundColor: `#${hashToHex(hashCode(seed))}`,
            }}
        >
            {props?.number || " "}
        </div>
    );
}

export default Tile;

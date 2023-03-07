import Row from "./Row";
import Tile from "./Tile";
import TileInterface from "../interfaces/TileInterface";

interface PropsInterface {
  game: TileInterface[][];
  activeRow: number;
  activeTile: number;
}

export default function Board({ game, activeRow, activeTile }: PropsInterface) {
  let classes =
    "mx-1 w-16 h-16 | text-2xl font-bold capitalize | rounded border-2 | flex items-center justify-center";

  return (
    <div className="mb-4">
      {game.map((el, rowIndex) => (
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          row={game[rowIndex]}
          activeRow={activeRow}
          activeTile={activeTile}
        />
      ))}
    </div>
  );
}

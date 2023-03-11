import Row from "./Row";
import Tile from "./Tile";
import TileInterface from "../interfaces/TileInterface";

interface PropsInterface {
  game: TileInterface[][];
  activeRow: number;
  activeTile: number;
}

const Board = ({ game, activeRow, activeTile }: PropsInterface) => (
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

export default Board;

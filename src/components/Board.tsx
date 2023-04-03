import TileInterface from "../interfaces/TileInterface";
import Row from "./Row";

interface PropsInterface {
  game: TileInterface[][];
  activeRow: { current: number };
  activeTile: { current: number };
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

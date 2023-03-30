import TileInterface from "../interfaces/TileInterface";
import Tile from "./Tile";

interface PropsInterface {
  row: TileInterface[];
  activeRow: number;
  rowIndex: number;
  activeTile: number;
}

export default function Row({
  row,
  rowIndex,
  activeRow,
  activeTile,
}: PropsInterface) {
  return (
    <div className="flex my-1 gap-1 mx-auto justify-center">
      {row.map((el, tileIndex) => (
        <Tile
          key={tileIndex}
          letter={el.letter}
          isActive={tileIndex === activeTile && rowIndex === activeRow}
          state={el.state}
        />
      ))}
    </div>
  );
}

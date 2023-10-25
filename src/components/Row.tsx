import { TileInterface } from "../interfaces/interfaces";
import Tile from "./Tile";

interface PropsInterface {
  row: TileInterface[];
  activeRow: { current: number };
  rowIndex: number;
  activeTile: { current: number };
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
          isActive={
            tileIndex === activeTile.current && rowIndex === activeRow.current
          }
          state={el.state}
        />
      ))}
    </div>
  );
}

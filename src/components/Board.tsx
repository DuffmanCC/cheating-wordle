import Row from "./Row";
import Tile from "./Tile";

interface Props {
  activeRow: number;
  activeTile: number;
  game: string[][];
  states: string[];
  setActiveTile: Function;
}

export default function Board({
  activeRow,
  activeTile,
  setActiveTile,
  game,
  states,
}: Props) {
  let classes =
    "mx-1 w-16 h-16 | text-2xl font-bold capitalize | rounded border-2 | flex items-center justify-center";

  return (
    <div className="mb-12">
      {game.map((el, rowIndex) => (
        <Row
          key={rowIndex}
          row={game[rowIndex]}
          rowIndex={rowIndex}
          activeRow={activeRow}
          activeTile={activeTile}
          setActiveTile={setActiveTile}
          states={rowIndex === activeRow ? states : []}
        />
      ))}
    </div>
  );
}

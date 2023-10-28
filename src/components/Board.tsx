import useGame from "../hooks/useGame";
import Row from "./Row";

const Board = () => {
  const { game, activeRow, activeTile } = useGame();

  return (
    <div className="">
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
};
export default Board;

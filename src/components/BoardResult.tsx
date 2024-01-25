import { TileInterface } from "../interfaces/interfaces";
import { createGameBoardResult, dayOfTheYear } from "../lib/tools";

type PropsInterface = {
  game: TileInterface[][];
};

const BoardResult = ({ game }: PropsInterface) => {
  const gameTilesHtml = createGameBoardResult(game);

  return (
    <div className="flex flex-col items-center">
      <h3 className="">
        Cheating Wordle: #{359 + 365 + dayOfTheYear()} {gameTilesHtml.length}/6
      </h3>

      <div>
        {gameTilesHtml.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </div>
    </div>
  );
};

export default BoardResult;

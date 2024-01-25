import { useCallback, useContext } from "react";
import { GameContext } from "../context/game";
import solutions from "../data/solutions";
import useGame from "../hooks/useGame";
import { dayOfTheYear, removeTildes } from "../lib/tools";
import ArrowDownIcon from "./icons/ArrowDownIcon";
import ArrowDownWithBaseIcon from "./icons/ArrowDownWithBaseIcon";

const RemainingWords = () => {
  const { displayRemainingWords, setDisplayRemainingWords } =
    useContext(GameContext);

  const solutionsToWordOfTheDay = solutions.slice(
    0,
    358 + 365 + dayOfTheYear()
  );

  const { remainingWords } = useGame();

  const isRepeatedWord = useCallback(
    (word: string) =>
      solutionsToWordOfTheDay.find(
        (solution) => removeTildes(solution.solution) === word.toLowerCase()
      ),
    [remainingWords]
  );

  return (
    <div className="text-center">
      <div className="flex justify-center items-center mb-4 gap-4">
        <h2 className="text-xl">Remaining words: {remainingWords.length}</h2>

        {remainingWords.length < 100 && (
          <button
            onClick={() => setDisplayRemainingWords(!displayRemainingWords)}
          >
            {displayRemainingWords ? (
              <ArrowDownIcon width="1rem" />
            ) : (
              <ArrowDownWithBaseIcon width="1rem" />
            )}
          </button>
        )}
      </div>

      {remainingWords.length < 100 && displayRemainingWords && (
        <ul className="overflow-auto h-auto border border-gray-400 flex flex-wrap justify-center py-1 rounded-lg">
          {remainingWords.map((word, i) => (
            <li key={i} className="mr-2 leading-snug">
              <span className={isRepeatedWord(word) && "line-through"}>
                {word}
              </span>

              {i != remainingWords.length - 1 && <span>,</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemainingWords;

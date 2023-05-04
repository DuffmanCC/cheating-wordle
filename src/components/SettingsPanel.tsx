import { useState } from "react";
import { version } from "../../package.json";
import TileInterface from "../interfaces/TileInterface";
import {
  createClipboardString,
  createGameBoardResult,
  dayOfTheYear,
  removeTildes,
} from "../lib/tools";
import BoardResult from "./BoardResult";
import ShareGame from "./ShareGame";
import CloseIcon from "./icons/CloseIcon";

interface PropsInterface {
  setNewWordOfTheDay: (newWordOfTheDay: string) => void;
  setIsSettingsPanelOpen: (isSettingsPanelOpen: boolean) => void;
  setMessage: (message: string) => void;
  game: TileInterface[][];
  isWin: boolean;
  solutions: {
    id: number;
    solution: string;
    desc: string;
  }[];
}

const SettingsPanel = ({
  setNewWordOfTheDay,
  setIsSettingsPanelOpen,
  setMessage,
  game,
  isWin,
  solutions,
}: PropsInterface) => {
  const [word, setWord] = useState("");
  const [repeatedWord, setRepeatedWord] = useState("");
  const [repeatedWordId, setRepeatedWordId] = useState<undefined | number>(
    undefined
  );

  const handleSet = () => {
    setTimeout(() => {
      setNewWordOfTheDay(word.toLowerCase());
    }, 200);
  };

  const handleRepeatedWord = (word: string): void => {
    if (word.length !== 5) return;

    const solutionsToWordOfTheDay = solutions.slice(0, 358 + dayOfTheYear());

    const id = solutionsToWordOfTheDay.find(
      (solution) => removeTildes(solution.solution) === word
    )?.id;

    setRepeatedWordId(id);
  };

  const gameTiles = createGameBoardResult(game);
  const clipboardString = createClipboardString(gameTiles);

  return (
    <div className="absolute inset-0 bg-white p-4 rounded-lg shadow-lg border flex flex-col justify-between">
      <header className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Settings</h2>

        <button
          className="ml-auto"
          onClick={() => {
            setIsSettingsPanelOpen(false);
            setMessage("");
          }}
        >
          <CloseIcon width="1.5rem" />
        </button>
      </header>

      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex flex-col items-start gap-2">
          <label className="flex justify-start items-center gap-4 mb-4">
            <div className="relative">
              <div>Set new solution:</div>

              <div className="text-xs text-gray-500 absolute">
                for testing purpose
              </div>
            </div>

            <div className="flex">
              <input
                type="text"
                id="show-remaining-words"
                tabIndex={0}
                value={word}
                className="font-mono h-8 w-28 text-xl p-2 uppercase tracking-widest border border-gray-500"
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSet();
                  }
                }}
              />

              <button
                className="h-8 p-2 flex justify-start items-center bg-gray-500 text-white text-sm border border-gray-500"
                onClick={handleSet}
              >
                SET
              </button>
            </div>
          </label>

          <label className="flex justify-start items-center gap-4 mb-4">
            <div className="relative">
              <div>Check repeated:</div>
            </div>

            <div className="flex">
              <input
                type="text"
                id="show-remaining-words"
                tabIndex={0}
                value={repeatedWord}
                className="font-mono h-8 w-28 text-xl p-2 uppercase tracking-widest border border-gray-500"
                onChange={(e) => {
                  if (e.target.value.length > 5) return;

                  if (e.target.value.length === 5) {
                    handleRepeatedWord(e.target.value);
                  }

                  setRepeatedWord(e.target.value);
                }}
              />
            </div>
          </label>
        </div>

        {repeatedWord.length === 5 && (
          <div className="">
            {repeatedWordId
              ? `Word was solution number #${repeatedWordId}`
              : `Word not found`}
          </div>
        )}

        {isWin && (
          <div className="flex flex-col gap-2">
            <h3>Share board:</h3>

            <div className="mb-12">
              <ShareGame
                setMessage={setMessage}
                clipboardString={clipboardString}
              />
            </div>

            <BoardResult game={game} />
          </div>
        )}
      </div>

      <footer className="text-xs text-gray-500 text-center">
        Copyright © 2023 Carlos Ortiz. Cheating Wordle v{version}
      </footer>
    </div>
  );
};

export default SettingsPanel;

import { useState } from "react";
import { version } from "../../package.json";
import TileInterface from "../interfaces/TileInterface";
import { createClipboardString, createGameBoardResult } from "../lib/tools";
import BoardResult from "./BoardResult";
import ShareGame from "./ShareGame";
import CloseIcon from "./icons/CloseIcon";

interface PropsInterface {
  setNewWordOfTheDay: (newWordOfTheDay: string) => void;
  setIsSettingsPanelOpen: (isSettingsPanelOpen: boolean) => void;
  setMessage: (message: string) => void;
  game: TileInterface[][];
  isWin: boolean;
}

const SettingsPanel = ({
  setNewWordOfTheDay,
  setIsSettingsPanelOpen,
  setMessage,
  game,
  isWin,
}: PropsInterface) => {
  const [word, setWord] = useState("");

  const handleSet = () => {
    setTimeout(() => {
      setNewWordOfTheDay(word.toLowerCase());
    }, 200);
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

      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-center gap-2">
          <label className="flex justify-center items-center gap-4 mb-4">
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
        </div>

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

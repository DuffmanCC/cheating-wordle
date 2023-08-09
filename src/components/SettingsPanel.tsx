import { version } from "../../package.json";
import TileInterface from "../interfaces/TileInterface";
import { createClipboardString, createGameBoardResult } from "../lib/tools";
import BoardResult from "./BoardResult";
import CheckRepeatedWord from "./CheckRepeatedWord";
import SetNewWord from "./SetNewWord";
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
  const gameTiles = createGameBoardResult(game);
  const clipboardString = createClipboardString(gameTiles);

  return (
    <div className="absolute inset-0 bg-white p-4 flex flex-col justify-between">
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
        <SetNewWord setNewWordOfTheDay={setNewWordOfTheDay} />

        <CheckRepeatedWord />

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

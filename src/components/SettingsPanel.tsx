import useGame from "../hooks/useGame";
import { createClipboardString, createGameBoardResult } from "../lib/tools";
import BoardResult from "./BoardResult";
import CheckRepeatedWord from "./CheckRepeatedWord";
import HeaderPanel from "./HeaderPanel";
import Panel from "./Panel";
import SetNewWord from "./SetNewWord";
import ShareGame from "./ShareGame";
import CloseIcon from "./icons/CloseIcon";

const SettingsPanel = () => {
  const {
    setIsSettingsPanelOpen,
    setMessage,
    game,
    isWin,
    setWordOfTheDay,
    setGame,
    setKeyboardKeysState,
    setIsWin,
    activeRow,
    activeTile,
    setRemainingWords,
    emptyGame,
    uniqueArrWithoutTildes,
  } = useGame();
  const gameTiles = createGameBoardResult(game);
  const clipboardString = createClipboardString(gameTiles);

  const handleSetNewWordOfTheDay = (word: string) => {
    if (word.length !== 5 || !uniqueArrWithoutTildes.includes(word)) {
      setMessage(`${word.toUpperCase()} is not a valid word`);

      return;
    }

    setWordOfTheDay(word);
    setMessage(`new word set to ${word}`);
    setGame(emptyGame);
    setKeyboardKeysState({});
    setIsWin(false);
    activeRow.current = 0;
    activeTile.current = 0;
    setRemainingWords(uniqueArrWithoutTildes);
    setIsSettingsPanelOpen(false);
  };

  return (
    <Panel>
      <HeaderPanel name="Settings">
        <button
          onClick={() => {
            setIsSettingsPanelOpen(false);
            setMessage("");
          }}
        >
          <CloseIcon width="1.5rem" />
        </button>
      </HeaderPanel>

      <div className="flex flex-col gap-2 flex-grow">
        <SetNewWord setNewWordOfTheDay={handleSetNewWordOfTheDay} />

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
    </Panel>
  );
};

export default SettingsPanel;

import { useState } from "react";
import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Keyboard from "./components/Keyboad";
import Message from "./components/Message";
import RefreshButton from "./components/RefreshButton";
import RemainingWords from "./components/RemainingWords";
import SettingsPanel from "./components/SettingsPanel";
import GearIcon from "./components/icons/GearIcon";
import solutions from "./data/solutions";
import validWords from "./data/validWords";
import useGame from "./hooks/useGame";
import { dayOfTheYear, removeTildes } from "./lib/tools";

const wordOfTheDayDefault = removeTildes(
  solutions[358 + dayOfTheYear()].solution
);
const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(wordOfTheDayDefault);
  const [displayRemainingWords, setDisplayRemainingWords] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const {
    game,
    emptyGame,
    setGame,
    activeRow,
    activeTile,
    message,
    setMessage,
    remainingWords,
    setRemainingWords,
    keyboardKeysState,
    setKeyboardKeysState,
    handleKeyDown,
    isWin,
    setIsWin,
  } = useGame(
    wordOfTheDay,
    uniqueArrWithoutTildes,
    isSettingsPanelOpen,
    setIsSettingsPanelOpen
  );

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
    <div className="container mx-auto items-center h-screen py-4 px-1 relative max-w-sm">
      <div className="flex gap-8 mb-4 px-4 justify-between items-center">
        <RefreshButton
          activeRow={activeRow}
          activeTile={activeTile}
          setGame={setGame}
          setMessage={setMessage}
          setRemainingWords={setRemainingWords}
          setKeyboardKeysState={setKeyboardKeysState}
          uniqueArrWithoutTildes={uniqueArrWithoutTildes}
          setDisplayRemainingWords={setDisplayRemainingWords}
          setWordOfTheDay={setWordOfTheDay}
          wordOfTheDayDefault={wordOfTheDayDefault}
          setIsWin={setIsWin}
        />

        <h1 className="text-2xl flex flex-col items-center">
          <div className="font-bold">CHEATING</div>

          <div className="ml-2 text-sm text-gray-500">WORDLE</div>
        </h1>

        <button
          onClick={() => setIsSettingsPanelOpen(true)}
          className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
        >
          <GearIcon width="1.25rem" />
        </button>
      </div>

      <Board game={game} activeRow={activeRow} activeTile={activeTile} />

      {message !== "" && <Message message={message} setMessage={setMessage} />}

      <Keyboard keysState={keyboardKeysState} onClick={handleKeyDown} />

      {isWin || (
        <RemainingWords
          remainingWords={remainingWords}
          displayRemainingWords={displayRemainingWords}
          setDisplayRemainingWords={setDisplayRemainingWords}
        />
      )}

      {isSettingsPanelOpen && (
        <SettingsPanel
          setIsSettingsPanelOpen={setIsSettingsPanelOpen}
          setNewWordOfTheDay={handleSetNewWordOfTheDay}
          setMessage={setMessage}
          game={game}
          isWin={isWin}
        />
      )}

      <Footer />
    </div>
  );
};

findDOMNode;

export default App;

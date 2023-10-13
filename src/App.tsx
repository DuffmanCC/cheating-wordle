import { useState } from "react";
import { findDOMNode } from "react-dom";
import ArchivePanel from "./components/ArchivePanel";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Keyboard from "./components/Keyboad";
import Message from "./components/Message";
import RefreshButton from "./components/RefreshButton";
import RemainingWords from "./components/RemainingWords";
import SettingsPanel from "./components/SettingsPanel";
import StatsPanel from "./components/StatsPanel";
import CalendarIcon from "./components/icons/CalendarIcon";
import GearIcon from "./components/icons/GearIcon";
import StatsIcon from "./components/icons/StatsIcon";
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
  const [isArchivePanelOpen, setIsArchivePanelOpen] = useState(false);
  const [isStatsPanelOpen, setIsStatsPanelOpen] = useState(false);

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
        <div className="flex gap-4">
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

          <button
            onClick={() => setIsSettingsPanelOpen(true)}
            className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
          >
            <GearIcon width="1.25rem" />
          </button>
        </div>

        <h1 className="text-2xl flex flex-col items-center">
          <div className="font-bold">CHEATING</div>

          <div className="ml-2 text-sm text-gray-500">WORDLE</div>
        </h1>

        <div className="flex gap-4">
          <button
            className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
            onClick={() => setIsArchivePanelOpen(true)}
          >
            <CalendarIcon width="1.25rem" />
          </button>

          <button
            onClick={() => setIsStatsPanelOpen(true)}
            className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
          >
            <StatsIcon width="1.25rem" />
          </button>
        </div>
      </div>

      <Board game={game} activeRow={activeRow} activeTile={activeTile} />

      {message !== "" && <Message message={message} setMessage={setMessage} />}

      <Keyboard keysState={keyboardKeysState} onClick={handleKeyDown} />

      {isWin ||
        isArchivePanelOpen ||
        isSettingsPanelOpen ||
        isStatsPanelOpen || (
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

      {isArchivePanelOpen && (
        <ArchivePanel setIsArchivePanelOpen={setIsArchivePanelOpen} />
      )}

      {isStatsPanelOpen && (
        <StatsPanel setIsStatsPanelOpen={setIsStatsPanelOpen} />
      )}

      <Footer />
    </div>
  );
};

findDOMNode;

export default App;

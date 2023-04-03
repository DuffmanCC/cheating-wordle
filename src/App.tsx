import { useState } from "react";
import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import Keyboard from "./components/Keyboad";
import Message from "./components/Message";
import RefreshButton from "./components/RefreshButton";
import RemainingWords from "./components/RemainingWords";
import ShareGame from "./components/ShareGame";
import solutions from "./data/solutions";
import validWords from "./data/validWords";
import useGame from "./hooks/useGame";
import { dayOfTheYear, removeTildes } from "./lib/tools";

const wordOfTheDay = solutions[358 + dayOfTheYear()].solution;
const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];

const App = () => {
  const {
    game,
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
  } = useGame(wordOfTheDay, uniqueArrWithoutTildes);

  const [displayRemainingWords, setDisplayRemainingWords] = useState(false);

  return (
    <div className="container mx-auto max-w-xl items-center h-screen py-4 px-1">
      <div className="flex gap-8 mb-4 justify-center">
        <RefreshButton
          activeRow={activeRow}
          activeTile={activeTile}
          setGame={setGame}
          setMessage={setMessage}
          setRemainingWords={setRemainingWords}
          setKeyboardKeysState={setKeyboardKeysState}
          uniqueArrWithoutTildes={uniqueArrWithoutTildes}
          setDisplayRemainingWords={setDisplayRemainingWords}
          setIsWin={setIsWin}
        />

        <h1 className="text-3xl">
          CHEATING <span className="text-base text-gray-500">WORDLE</span>
        </h1>

        {isWin && (
          <ShareGame
            setMessage={setMessage}
            game={game}
            activeRow={activeRow}
          />
        )}
      </div>

      <Board game={game} activeRow={activeRow} activeTile={activeTile} />

      {message !== "" && <Message message={message} />}

      <Keyboard keysState={keyboardKeysState} onClick={handleKeyDown} />

      {isWin || (
        <RemainingWords
          remainingWords={remainingWords}
          displayRemainingWords={displayRemainingWords}
          setDisplayRemainingWords={setDisplayRemainingWords}
        />
      )}
    </div>
  );
};

findDOMNode;

export default App;

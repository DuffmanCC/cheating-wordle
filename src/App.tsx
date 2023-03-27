import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import Keyboard from "./components/Keyboad";
import RefreshButton from "./components/RefreshButton";
import RemainingWords from "./components/RemainingWords";
import Message from "./components/Message";
import useGame from "./hooks/useGame";
import { useState } from "react";
import ShareGame from "./components/ShareGame";

const App = () => {
  const {
    game,
    setGame,
    activeRow,
    setActiveRow,
    activeTile,
    setActiveTile,
    message,
    setMessage,
    remainingWords,
    setRemainingWords,
    keyboardKeysState,
    setKeyboardKeysState,
    uniqueArrWithoutTildes,
    handleKeyDown,
    isWin,
    setIsWin,
  } = useGame();

  const [displayRemainingWords, setDisplayRemainingWords] = useState(false);

  return (
    <div className="container mx-auto max-w-xl items-center h-screen py-4 px-1">
      <div className="flex gap-8 mb-4 justify-center">
        <RefreshButton
          setGame={setGame}
          setActiveRow={setActiveRow}
          setActiveTile={setActiveTile}
          setMessage={setMessage}
          setRemainingWords={setRemainingWords}
          setKeyboardKeysState={setKeyboardKeysState}
          uniqueArrWithoutTildes={uniqueArrWithoutTildes}
          setDisplayRemainingWords={setDisplayRemainingWords}
          setIsWin={setIsWin}
        />

        <h1 className="text-3xl">
          CHEATING <span className="text-base">WORDLE</span>
        </h1>

        {isWin && <ShareGame clipboard={message} setMessage={setMessage} />}
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

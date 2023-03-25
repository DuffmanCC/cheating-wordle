import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import Keyboard from "./components/Keyboad";
import RefreshButton from "./components/RefreshButton";
import RemainingWords from "./components/RemainingWords";
import Message from "./components/Message";
import useGame from "./hooks/useGame";

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
  } = useGame();

  return (
    <div className="container mx-auto max-w-xl items-center h-screen py-4 px-1">
      <div className="flex justify-center items-center mb-4 text-gray-600 max-w-xs mx-auto relative">
        <RefreshButton
          setGame={setGame}
          setActiveRow={setActiveRow}
          setActiveTile={setActiveTile}
          setMessage={setMessage}
          setRemainingWords={setRemainingWords}
          setKeyboardKeysState={setKeyboardKeysState}
          uniqueArrWithoutTildes={uniqueArrWithoutTildes}
          className="absolute left-0"
        />

        <h1 className="text-3xl">
          CHEATING <span className="text-base">WORDLE</span>
        </h1>
      </div>

      <Board game={game} activeRow={activeRow} activeTile={activeTile} />

      {message !== "" && <Message message={message} />}

      <Keyboard keysState={keyboardKeysState} onClick={handleKeyDown} />

      {message === "you win!" || (
        <RemainingWords remainingWords={remainingWords} />
      )}
    </div>
  );
};

findDOMNode;

export default App;

import { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import Keyboard from "./components/Keyboad";
import RefreshButton from "./components/RefreshButton";
import TileInterface from "./interfaces/TileInterface";
import validWords from "./data/validWords";
import solutions from "./data/solutions";
import {
  removeTildes,
  isValidWord,
  isFullWord,
  updateRemainingWords,
  isTheWord,
  dayOfTheYear,
  setLetterStates,
  fillTile,
  deleteTile,
} from "./lib/tools.js";
import RemainingWords from "./components/RemainingWords";
import Message from "./components/Message";

const wordOfTheDay = solutions[358 + dayOfTheYear()].solution;
const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];

const App = () => {
  const [message, setMessage] = useState("");

  const [remainingWords, setRemainingWords] = useState<string[]>(
    uniqueArrWithoutTildes
  );

  const [keyboardKeysState, setKeyboardKeysState] = useState({});

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  /**
   * Pass this function as a callback to the addEventListener window
   * and to Keyboard component as a callback to the onClick prop
   * @param e KeyboardEvent or string
   * @returns void
   */
  function handleKeyDown(e: KeyboardEvent | string): void {
    let key: string = "";

    if (typeof e === "string") {
      key = e.toLowerCase();
    }

    if (typeof e === "object") {
      key = e.key.toLowerCase();
    }

    if (/^[a-zñ]$/.test(key)) {
      fillTile(key, game, setGame, activeRow, activeTile);

      if (activeTile < 4) {
        setActiveTile(activeTile + 1);
      }
    }

    if (key === "backspace" || key === "Backspace") {
      deleteTile(activeTile, activeRow, game, setGame);

      if (activeTile > 0) {
        setActiveTile(activeTile - 1);
      }

      setMessage("");
    }

    if (key === "enter" || key === "Enter") {
      submitRow(game[activeRow]);
    }
  }

  const [activeRow, setActiveRow] = useState(0);
  const [activeTile, setActiveTile] = useState(0);
  const [game, setGame] = useState(
    Array(6).fill(
      Array(5).fill({
        state: "",
        letter: "",
      })
    )
  );

  function submitRow(row: TileInterface[]) {
    if (!isFullWord(row)) {
      setMessage("missing letters");

      return;
    }

    if (!isValidWord(row, uniqueArrWithoutTildes)) {
      setMessage("not valid word");

      return;
    }

    const letterStates = setLetterStates(
      wordOfTheDay,
      row,
      game,
      activeRow,
      activeTile,
      keyboardKeysState,
      setKeyboardKeysState,
      setGame
    );

    // update words remaining list
    const updatedRemainingWords = updateRemainingWords(
      remainingWords,
      row,
      letterStates
    );

    setRemainingWords(updatedRemainingWords);

    if (isTheWord(row, wordOfTheDay)) {
      setMessage("you win!");

      return;
    }

    // reset
    setActiveTile(0);
    setActiveRow(activeRow + 1);
  }

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

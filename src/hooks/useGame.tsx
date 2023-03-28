import { useEffect, useState } from "react";
import solutions from "../data/solutions";
import validWords from "../data/validWords";
import TileInterface from "../interfaces/TileInterface";
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
} from "../lib/tools.js";

const wordOfTheDay = solutions[358 + dayOfTheYear()].solution;
const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];

const useGame = () => {
  const [message, setMessage] = useState<string>("");
  const [isWin, setIsWin] = useState<boolean>(false);

  const [remainingWords, setRemainingWords] = useState<string[]>(
    uniqueArrWithoutTildes
  );

  const [remainingWordsTries, setRemainingWordsTries] = useState<number[]>([
    uniqueArrWithoutTildes.length,
  ]);

  const [keyboardKeysState, setKeyboardKeysState] = useState({});

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (isWin) {
      const penultimate = remainingWordsTries[remainingWordsTries.length - 2];
      const lucky = (100 / penultimate).toFixed(2);

      setMessage(`You win!
      ${penultimate.toString()} remaining words, 
      ${lucky.toString()}% of lucky!`);
    }
  }, [isWin, activeRow, activeTile]);

  /**
   * Pass this function as a callback to the addEventListener window
   * and to Keyboard component as a callback to the onClick prop
   * @param e KeyboardEvent or string
   * @returns void
   */
  function handleKeyDown(e: KeyboardEvent | string): void {
    let key: string = "";

    if (typeof e === "string") key = e.toLowerCase();

    if (typeof e === "object") key = e.key.toLowerCase();

    if (/^[a-zñ]$/.test(key)) {
      fillTile(key, game, setGame, activeRow, activeTile);

      if (activeTile < 4) setActiveTile(activeTile + 1);
    }

    if (key === "backspace" || key === "Backspace") {
      deleteTile(activeTile, activeRow, game, setGame);

      if (activeTile > 0) setActiveTile(activeTile - 1);

      setMessage("");
    }

    if (key === "enter" || key === "Enter") submitRow(game[activeRow]);
  }

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

    remainingWordsTries.push(updatedRemainingWords.length);

    setRemainingWordsTries(remainingWordsTries);

    if (isTheWord(row, wordOfTheDay)) {
      setIsWin(true);

      return;
    }

    if (activeRow === 5 && activeTile === 4 && !isWin) {
      setMessage(`You fail! 
      the solution was: ${wordOfTheDay}`);
      return;
    }

    // reset
    setActiveTile(0);
    setActiveRow(activeRow + 1);
  }

  return {
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
    handleKeyDown,
    uniqueArrWithoutTildes,
    remainingWordsTries,
    isWin,
    setIsWin,
  };
};

export default useGame;

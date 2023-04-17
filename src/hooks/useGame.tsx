import { useEffect, useRef, useState } from "react";
import TileInterface from "../interfaces/TileInterface";
import {
  deleteTile,
  fillTile,
  isFullWord,
  isTheWord,
  isValidWord,
  setLetterStates,
  updateRemainingWords,
} from "../lib/tools.js";

const useGame = (
  wordOfTheDay: string,
  uniqueArrWithoutTildes: string[],
  isSettingsPanelOpen: boolean,
  setIsSettingsPanelOpen: (isSettingsPanelOpen: boolean) => void
) => {
  const [message, setMessage] = useState<string>("");
  const [isWin, setIsWin] = useState<boolean>(false);

  const [remainingWords, setRemainingWords] = useState<string[]>(
    uniqueArrWithoutTildes
  );

  const [remainingWordsTries, setRemainingWordsTries] = useState<number[]>([
    uniqueArrWithoutTildes.length,
  ]);

  const [keyboardKeysState, setKeyboardKeysState] = useState({});

  const activeRow = useRef(0);
  const activeTile = useRef(0);

  const emptyGame: TileInterface[][] = Array(6).fill(
    Array(5).fill({
      state: "",
      letter: "",
    })
  );

  const localStorageGame: string | null = localStorage.getItem("game");
  let initialGame: TileInterface[][] = emptyGame;

  if (localStorageGame) initialGame = JSON.parse(localStorageGame);

  const [game, setGame] = useState(initialGame);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (isWin) {
      const penultimate = remainingWordsTries[remainingWordsTries.length - 2];
      const lucky = (100 / penultimate).toFixed(2);

      localStorage.setItem("game", JSON.stringify(game));

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
    if (isSettingsPanelOpen) return;

    let key: string = "";

    if (typeof e === "string") key = e.toLowerCase();

    if (typeof e === "object") key = e.key.toLowerCase();

    if (/^[a-zñ]$/.test(key)) {
      fillTile(key, game, setGame, activeRow, activeTile);

      if (activeTile.current < 4) activeTile.current++;
    }

    if (key === "backspace" || key === "Backspace") {
      deleteTile(activeTile, activeRow, game, setGame);

      if (activeTile.current > 0) activeTile.current--;

      setMessage("");
    }

    if (key === "enter" || key === "Enter") submitRow(game[activeRow.current]);
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
      keyboardKeysState,
      setKeyboardKeysState,
      setGame
    );

    // update words remaining list
    const updatedRemainingWords = updateRemainingWords(
      remainingWords,
      letterStates
    );

    setRemainingWords(updatedRemainingWords);

    remainingWordsTries.push(updatedRemainingWords.length);

    setRemainingWordsTries(remainingWordsTries);
    if (isTheWord(row, wordOfTheDay)) {
      setIsWin(true);

      setTimeout(() => {
        setIsSettingsPanelOpen(true);
      }, 2000);

      return;
    }

    if (activeRow.current === 5 && activeTile.current === 4 && !isWin) {
      setMessage(`You fail! 
      the solution was: ${wordOfTheDay}`);

      return;
    }

    // reset
    activeTile.current = 0;
    activeRow.current++;
  }

  return {
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
    uniqueArrWithoutTildes,
    remainingWordsTries,
    isWin,
    setIsWin,
  };
};

export default useGame;

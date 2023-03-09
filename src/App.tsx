import { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import Keyboard from "./components/Keyboad";
import TileInterface from "./interfaces/TileInterface";
import RegexInterface from "./interfaces/RegexInterface";
import validWords from "./data/validWords";
import solutions from "./data/solutions";
import {
  removeTildes,
  isValidWord,
  isFullWord,
  createRegex,
  updateRemainingWords,
  isTheWord,
  dayOfTheYear,
} from "./lib/tools.js";
import KeyboardKeysStateInterface from "./interfaces/KeyboardKeysStateInterface";
import RemainingWords from "./components/RemainingWords";
import Message from "./components/Message";

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState(
    solutions[358 + dayOfTheYear()].solution
  );

  const [message, setMessage] = useState("");

  // remove accents and duplicate words
  const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];

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
      key = e.key;
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
      <h1 className="text-2xl text-center mb-4">
        CHEATING <span className="text-base">WORDLE</span>
      </h1>

      <Board game={game} activeRow={activeRow} activeTile={activeTile} />

      {message !== "" && <Message message={message} />}

      <Keyboard keysState={keyboardKeysState} onClick={handleKeyDown} />

      {message === "you win!" || (
        <RemainingWords remainingWords={remainingWords} />
      )}
    </div>
  );
};

function setLetterStates(
  wordOfTheDay: string,
  submittedWord: TileInterface[],
  game: TileInterface[][],
  activeRow: number,
  activeTile: number,
  keyboardKeysState: KeyboardKeysStateInterface,
  setKeyboardKeysState: React.Dispatch<
    React.SetStateAction<KeyboardKeysStateInterface>
  >,
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>
): RegexInterface {
  const arr = wordOfTheDay.split("");

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  const included: string[] = [];
  const notIncluded: string[] = [];

  const newKeyboardKeysState: KeyboardKeysStateInterface = {};

  submittedWord.forEach((tile, index) => {
    if (tile.letter === arr[index]) {
      updatedGame[activeRow][index].state = "match";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "match";

      included.push(tile.letter);
    } else if (wordOfTheDay.includes(tile.letter)) {
      updatedGame[activeRow][index].state = "present";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "present";

      included.push(tile.letter);
    } else {
      updatedGame[activeRow][index].state = "absent";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "absent";

      notIncluded.push(tile.letter);
    }
  });

  setGame(updatedGame);

  setKeyboardKeysState({ ...keyboardKeysState, ...newKeyboardKeysState });

  return {
    included,
    notIncluded,
    pattern: createRegex(updatedGame[activeRow]),
  };
}

function fillTile(
  letter: string,
  game: TileInterface[][],
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>,
  activeRow: number,
  activeTile: number
) {
  if (activeTile > 4) return;

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  updatedGame[activeRow][activeTile].letter = letter;
  setGame(updatedGame);
}

function deleteTile(
  activeTile: number,
  activeRow: number,
  game: TileInterface[][],
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>
) {
  if (activeTile === 0 && game[activeRow][0].letter === "") return;

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  if (updatedGame[activeRow][activeTile].letter !== "") {
    updatedGame[activeRow][activeTile].letter = "";
  } else {
    updatedGame[activeRow][activeTile - 1].letter = "";
  }

  setGame(updatedGame);
}

findDOMNode;

export default App;

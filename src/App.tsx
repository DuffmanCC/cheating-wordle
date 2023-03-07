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

function App() {
  const [wordOfTheDay, setWordOfTheDay] = useState(
    solutions[358 + dayOfTheYear()].solution
  );

  const [activeRow, setActiveRow] = useState(0);
  const [activeTile, setActiveTile] = useState(0);
  const [message, setMessage] = useState("");

  // remove accents and duplicate words
  const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];

  const [remainingWords, setRemainingWords] = useState<string[]>(
    uniqueArrWithoutTildes
  );

  const [keyboardKeysState, setKeyboardKeysState] = useState({
    Q: "",
    W: "",
    E: "",
    R: "",
    T: "",
    Y: "",
    U: "",
    I: "",
    O: "",
    P: "",
    A: "",
    S: "",
    D: "",
    F: "",
    G: "",
    H: "",
    J: "",
    K: "",
    L: "",
    Ñ: "",
    Z: "",
    X: "",
    C: "",
    V: "",
    B: "",
    N: "",
    M: "",
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handleKeyDown(e: KeyboardEvent): void {
    if (/^[a-zA-ZñÑ]$/.test(e.key)) {
      fillTile(e.key);
    }

    if (e.key === "Backspace") {
      deleteTile();
    }

    if (e.key === "Enter") {
      submitRow(game[activeRow]);
    }
  }

  const [game, setGame] = useState(
    Array(6).fill(
      Array(5).fill({
        state: "",
        letter: "",
      })
    )
  );

  function fillTile(letter: string) {
    if (activeTile > 4) return;

    const str = JSON.stringify(game);
    const updatedGame = JSON.parse(str);

    updatedGame[activeRow][activeTile].letter = letter;
    setGame(updatedGame);

    if (activeTile < 4) {
      setActiveTile(activeTile + 1);
    }
  }

  function deleteTile() {
    if (activeTile === 0 && game[activeRow][0] === "") return;

    setMessage("");

    const str = JSON.stringify(game);
    const updatedGame = JSON.parse(str);

    if (updatedGame[activeRow][activeTile].letter !== "") {
      updatedGame[activeRow][activeTile].letter = "";
    } else {
      updatedGame[activeRow][activeTile - 1].letter = "";
    }

    setGame(updatedGame);

    if (activeTile > 0) {
      setActiveTile(activeTile - 1);
    }
  }

  function setLetterStates(
    wordOfTheDay: string,
    submittedWord: TileInterface[]
  ): RegexInterface {
    const arr = wordOfTheDay.split("");

    const str = JSON.stringify(game);
    const updatedGame = JSON.parse(str);

    const included: string[] = [];
    const notIncluded: string[] = [];

    const keyboardKeysState: KeyboardKeysStateInterface = {};

    submittedWord.forEach((tile, index) => {
      if (tile.letter === arr[index]) {
        updatedGame[activeRow][index].state = "match";
        keyboardKeysState[tile.letter.toUpperCase()] = "match";

        included.push(tile.letter);
      } else if (wordOfTheDay.includes(tile.letter)) {
        updatedGame[activeRow][index].state = "present";
        keyboardKeysState[tile.letter.toUpperCase()] = "present";

        included.push(tile.letter);
      } else {
        updatedGame[activeRow][index].state = "absent";
        keyboardKeysState[tile.letter.toUpperCase()] = "absent";

        notIncluded.push(tile.letter);
      }
    });

    setGame(updatedGame);

    return {
      included,
      notIncluded,
      pattern: createRegex(updatedGame[activeRow]),
      keyboardKeysState,
    };
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

    const letterStates = setLetterStates(wordOfTheDay, row);

    // update words remaining list
    const updatedRemainingWords = updateRemainingWords(
      remainingWords,
      row,
      letterStates
    );

    setRemainingWords(updatedRemainingWords);

    setKeyboardKeysState({
      ...keyboardKeysState,
      ...letterStates.keyboardKeysState,
    });

    if (isTheWord(row, wordOfTheDay)) {
      setMessage("you win!");

      return;
    }

    // reset
    setActiveTile(0);
    setActiveRow(activeRow + 1);
  }

  function handleClick(key: string) {
    if (/^[a-zA-ZñÑ]$/.test(key)) {
      fillTile(key);
    }

    if (key === "delete") {
      deleteTile();
    }

    if (key === "enter") {
      submitRow(game[activeRow]);
    }
  }

  return (
    <div className="container mx-auto max-w-xl items-center h-screen py-4 px-1">
      <h1 className="text-2xl text-center mb-4">
        CHEATING <span className="text-base">WORDLE</span>{" "}
      </h1>

      {/* <pre className="text-center">
        active tile: {activeTile} <br />
        active row: {activeRow} <br />
      </pre> */}

      <Board game={game} activeRow={activeRow} activeTile={activeTile} />

      {message.length !== 0 && (
        <div className="flex justify-center">
          <div className="w-64 px-8 py-4 mb-4 | border rounded-xl | bg-gray-700 text-white text-center">
            {message}
          </div>
        </div>
      )}

      <Keyboard keysState={keyboardKeysState} onClick={handleClick} />

      {remainingWords.length > 1 && (
        <div className="text-center mb-20">
          <h2 className="text-xl mb-2">
            Remaining words: {remainingWords.length}
          </h2>

          {remainingWords.length < 100 && (
            <ul className="overflow-auto h-auto border border-gray-400 flex flex-wrap justify-center py-2 rounded-lg">
              {remainingWords.map((word, i) => (
                <li key={i} className="mr-2 leading-snug">
                  {word}

                  {i != remainingWords.length - 1 && <span>,</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
findDOMNode;

export default App;

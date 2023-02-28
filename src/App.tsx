import { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import Board from "./components/Board";
import validWords from "./data/valid-words.json";

function App() {
  let [activeRow, setActiveRow] = useState(0);
  let [activeTile, setActiveTile] = useState(0);
  const [message, setMessage] = useState("");
  const theWord = "coran";

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
      if (row.length < 5) return;

      submitRow(row);
    }
  }

  const [game, setGame] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  let [row, setRow] = useState<string[]>([]);

  function fillTile(letter: string) {
    if (row.length > 4) return;

    game[activeRow][activeTile] = letter;
    setGame(game);

    setRow([...row, letter]);

    if (activeTile < 4) {
      activeTile++;
      setActiveTile(activeTile);
    }
  }

  function deleteTile() {
    if (activeTile <= 0 && game[activeRow][0] === "") return;

    setMessage("");

    const newGame = [...game];

    if (newGame[activeRow][activeTile] !== "") {
      newGame[activeRow][activeTile] = "";
    } else {
      newGame[activeRow][activeTile - 1] = "";
    }

    setGame(newGame);

    row.pop();
    setRow(row);

    if (activeTile > 0) {
      activeTile--;
      setActiveTile(activeTile);
    }
  }

  let [stateRow, setStateRow] = useState<string[]>([]);

  function isValidWord() {
    const isWordInList = Object.values(validWords).includes(row.join(""));

    if (isWordInList) return true;

    setMessage("not valid word");
    return false;
  }

  function wordState(theWord: string, submitWord: string[]) {
    const arr = theWord.split("");

    submitWord.forEach((letter, index) => {
      let state: string = "bg-grey-400";

      if (letter === arr[index]) {
        state = "bg-green-400";
      } else if (theWord.includes(letter)) {
        state = "bg-yellow-400";
      }

      stateRow.push(state);
    });

    setStateRow(stateRow);

    console.log(stateRow);
  }

  function submitRow(row: string[]) {
    if (!isValidWord) return;

    wordState(theWord, row);

    // reset
    setRow([]);
    activeRow++;
    setActiveTile(0);
    setActiveRow(activeRow);
  }

  return (
    <div className="container mx-auto max-w-xl items-center h-screen">
      <h1 className="text-4xl text-center mb-12 mt-4">Wordle</h1>

      <pre className="text-center">
        active tile: {activeTile} <br />
        active row: {activeRow} <br />
        content tile: {game[activeRow][activeTile]} <br />
        row: {row.toLocaleString()} <br />
        game[0]: {game[activeRow].toLocaleString()}
      </pre>

      <Board
        activeRow={activeRow}
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        game={game}
        states={stateRow}
      />

      {message.length !== 0 && (
        <div className="fixed right-0 bottom-0 | px-8 py-4 mr-12 mb-12 | border rounded-xl | bg-gray-700 text-white">
          {message}
        </div>
      )}
    </div>
  );
}
findDOMNode;

export default App;

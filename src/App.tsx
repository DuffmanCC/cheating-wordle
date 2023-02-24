import { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import Row from "./components/Row";
import Tile from "./components/Tile";

function App() {
  let [game, setGame] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  let [activeTile, setActiveTile] = useState(0);
  let [activeRow, setActiveRow] = useState(0);

  const [word, setWord] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function fillTile(letter: string) {
    game[activeRow][activeTile] = letter;
    setGame(game);

    setWord([...word, letter]);

    if (activeTile === 4) {
      activeRow++;
      setActiveRow(activeRow);

      setActiveTile(0);
    } else {
      activeTile++;
      setActiveTile(activeTile);
    }
  }

  function deleteTile() {
    game[activeRow][activeTile] = "";
    setGame(game);

    if (activeTile === 0) {
      activeRow--;
      setActiveRow(activeRow);

      setActiveTile(4);
    } else {
      activeTile--;
      setActiveTile(activeTile);
    }
  }

  function handleKeyDown(e: KeyboardEvent): void {
    const isLetter = /^[A-z]$/.test(e.key);

    if (isLetter) {
      fillTile(e.key);
    }

    if (e.key === "Backspace") {
      deleteTile();
    }

    if (e.key === "Enter") {
      submitRow(word);
    }
  }

  function submitRow(word: string[]) {
    if (word.length < 5) return;

    alert(word.join(""));
  }

  function getClick(tileIndex: number, rowIndex: number) {
    setActiveTile(tileIndex);
    setActiveRow(rowIndex);
  }

  return (
    <div className="container mx-auto max-w-xl items-center h-screen">
      <h1 className="text-4xl text-center mb-12 mt-4">Wordle</h1>

      <div className="mb-12">
        {Array(6)
          .fill(null)
          .map((el, rowIndex) => (
            <div key={rowIndex} className="flex my-2 mx-auto justify-center">
              {Array(5)
                .fill(null)
                .map((el, tileIndex) => (
                  <Tile
                    key={tileIndex}
                    tileIndex={tileIndex}
                    rowIndex={rowIndex}
                    activeRow={activeRow}
                    letter={game[rowIndex][tileIndex]}
                    getClick={getClick}
                    isActive={
                      tileIndex === activeTile && rowIndex === activeRow
                    }
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}
findDOMNode;

export default App;

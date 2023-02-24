import Tile from "./Tile";
import { MouseEvent, useEffect, useRef, useState } from "react";

interface Props {
  row: string;
}

export default function Row({ row }: Props) {
  const state: string = "yellow";

  const [linea, setLinea] = useState(["", "", "", "", ""]);

  const [activeTile, setActiveTile] = useState(0);

  function getIndex(index: number) {
    setActiveTile(index);
  }

  function getLetter(letter: string) {
    linea[activeTile] = letter;
    setLinea(linea);
  }

  function deleteTile() {
    linea[activeTile] = "";
    setLinea(linea);

    if (activeTile <= 0) {
      setActiveTile(0);
    }

    setActiveTile(activeTile - 1);

    console.log(activeTile);
  }

  function nextTile() {
    if (activeTile >= 4) {
      setActiveTile(4);
    }

    setActiveTile(activeTile + 1);

    console.log(activeTile);
  }

  function prevTile() {
    if (activeTile <= 0) {
      setActiveTile(0);
    }

    setActiveTile(activeTile - 1);
  }

  return (
    <div className="flex my-2 mx-auto justify-center">
      {linea.map((letter, index) => (
        <Tile
          key={index}
          index={index}
          state={state}
          getIndex={getIndex}
          getLetter={getLetter}
          deleteTile={deleteTile}
          nextTile={nextTile}
          prevTile={prevTile}
          letter={letter}
          isActive={activeTile === index ? true : false}
        />
      ))}
    </div>
  );
}

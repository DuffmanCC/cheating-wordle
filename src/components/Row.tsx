import Tile from "./Tile";
import { MouseEvent, useEffect, useRef, useState } from "react";
import TileInterface from "../interfaces/TileInterface";

interface PropsInterface {
  row: TileInterface[];
  activeRow: number;
  rowIndex: number;
  activeTile: number;
}

export default function Row({
  row,
  activeRow,
  rowIndex,
  activeTile,
}: PropsInterface) {
  return (
    <div className="flex my-2 mx-auto justify-center">
      {row.map((el, tileIndex) => (
        <Tile
          key={tileIndex}
          letter={el.letter}
          isActive={tileIndex === activeTile && rowIndex === activeRow}
          state={el.state}
        />
      ))}
    </div>
  );
}

import Tile from "./Tile";
import { MouseEvent, useEffect, useRef, useState } from "react";

interface Props {
  row: string[];
  rowIndex: number;
  activeRow: number;
  activeTile: number;
  setActiveTile: Function;
  states: string[];
}

export default function Row({
  row,
  rowIndex,
  activeRow,
  activeTile,
  setActiveTile,
  states,
}: Props) {
  const getClick = (tileIndex: number) => {
    setActiveTile(tileIndex);
  };

  return (
    <div className="flex my-2 mx-auto justify-center">
      {row.map((el, tileIndex) => (
        <Tile
          key={tileIndex}
          letter={el}
          tileIndex={tileIndex}
          rowIndex={rowIndex}
          activeRow={activeRow}
          getClick={getClick}
          isActive={tileIndex === activeTile && rowIndex === activeRow}
          bgColor={states[tileIndex]}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
import Board from "./components/board";
// import Row from "./components/Row";
// import Tile from "./components/Tile";

function App() {
  return (
    <div className="container mx-auto max-w-xl items-center h-screen">
      <h1 className="text-4xl text-center mb-12 mt-4">Wordle</h1>

      <Board />
    </div>
  );
}
findDOMNode;

export default App;

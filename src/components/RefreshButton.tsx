import { RefObject, useRef } from "react";
import useGame from "../hooks/useGame";
import RefreshIcon from "./icons/RefreshIcon";

const RefreshButton = () => {
  const refreshButton: RefObject<HTMLButtonElement> = useRef(null);

  const {
    setGame,
    activeRow,
    activeTile,
    setMessage,
    setRemainingWords,
    setKeyboardKeysState,
    setIsWin,
    setWordOfTheDay,
    setDisplayRemainingWords,
    wordOfTheDayDefault,
    uniqueArrWithoutTildes,
  } = useGame();

  function handleRefresh() {
    setGame(
      Array(6).fill(
        Array(5).fill({
          state: "",
          letter: "",
        })
      )
    );

    setIsWin(false);
    activeRow.current = 0;
    activeTile.current = 0;
    setMessage("");
    setRemainingWords(uniqueArrWithoutTildes);
    setKeyboardKeysState({});
    setDisplayRemainingWords(false);
    setWordOfTheDay(wordOfTheDayDefault);
    localStorage.removeItem("game");

    if (refreshButton.current) {
      refreshButton.current.blur();
    }
  }

  return (
    <button
      title="refresh"
      onClick={handleRefresh}
      className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
      ref={refreshButton}
    >
      <RefreshIcon width="1.25rem" />
    </button>
  );
};
export default RefreshButton;

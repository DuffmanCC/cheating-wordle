import { RefObject, useRef } from "react";
import TileInterface from "../interfaces/TileInterface";
import RefreshIcon from "./icons/RefreshIcon";

interface PropsInterface {
  setGame: (game: TileInterface[][]) => void;
  activeRow: { current: number };
  activeTile: { current: number };
  setMessage: (message: string) => void;
  setRemainingWords: (remainingWords: string[]) => void;
  setKeyboardKeysState: (keyboardKeysState: {}) => void;
  setDisplayRemainingWords: (displayRemainingWords: boolean) => void;
  setIsWin: (isWin: boolean) => void;
  setWordOfTheDay: (wordOfTheDay: string) => void;
  wordOfTheDayDefault: string;
  uniqueArrWithoutTildes: string[];
  className?: string;
}

const RefreshButton = ({
  setGame,
  activeRow,
  activeTile,
  setMessage,
  setRemainingWords,
  setKeyboardKeysState,
  setDisplayRemainingWords,
  setIsWin,
  setWordOfTheDay,
  wordOfTheDayDefault,
  uniqueArrWithoutTildes,
  className,
}: PropsInterface) => {
  const refreshButton: RefObject<HTMLButtonElement> = useRef(null);

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
      className={[
        "hover:text-blue-800 focus:text-blue-800 text-gray-500",
        className,
      ].join(" ")}
      ref={refreshButton}
    >
      <RefreshIcon width="1.5rem" />
    </button>
  );
};
export default RefreshButton;

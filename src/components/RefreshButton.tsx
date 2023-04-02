import { RefObject, useRef } from "react";
import TileInterface from "../interfaces/TileInterface";
import RefreshIcon from "./icons/RefreshIcon";

interface PropsInterface {
  setGame: (game: TileInterface[][]) => void;
  setActiveRow: (activeRow: number) => void;
  setActiveTile: (activeTile: number) => void;
  setMessage: (message: string) => void;
  setRemainingWords: (remainingWords: string[]) => void;
  setKeyboardKeysState: (keyboardKeysState: {}) => void;
  setDisplayRemainingWords: (displayRemainingWords: boolean) => void;
  setIsWin: (isWin: boolean) => void;
  uniqueArrWithoutTildes: string[];
  className?: string;
}

const RefreshButton = ({
  setGame,
  setActiveRow,
  setActiveTile,
  setMessage,
  setRemainingWords,
  setKeyboardKeysState,
  setDisplayRemainingWords,
  setIsWin,
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
    setActiveRow(0);
    setActiveTile(0);
    setMessage("");
    setRemainingWords(uniqueArrWithoutTildes);
    setKeyboardKeysState({});
    setDisplayRemainingWords(false);
    localStorage.removeItem("game");

    if (refreshButton.current) {
      refreshButton.current.blur();
    }
  }

  return (
    <button
      title="refresh"
      onClick={handleRefresh}
      className={["hover:text-blue-800 focus:text-blue-800", className].join(
        " "
      )}
      ref={refreshButton}
    >
      <RefreshIcon width="1.5rem" />
    </button>
  );
};
export default RefreshButton;

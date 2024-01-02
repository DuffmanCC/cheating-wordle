import { ReactNode, createContext, useRef, useState } from "react";
import solutions from "../data/solutions";
import validWords from "../data/validWords";
import { GameContextType, TileInterface } from "../interfaces/interfaces";
import { dayOfTheYear, removeTildes } from "../lib/tools";

export const GameContext = createContext<GameContextType>({
  wordOfTheDay: "",
  wordOfTheDayDefault: "",
  uniqueArrWithoutTildes: [],
  isSettingsPanelOpen: false,
  setIsSettingsPanelOpen: () => {},
  setWordOfTheDay: () => {},
  displayRemainingWords: false,
  setDisplayRemainingWords: () => {},
  isArchivePanelOpen: false,
  setIsArchivePanelOpen: () => {},
  isStatsPanelOpen: false,
  setIsStatsPanelOpen: () => {},
  message: "",
  setMessage: () => {},
  isWin: false,
  setIsWin: () => {},
  remainingWords: [],
  setRemainingWords: () => {},
  remainingWordsTries: [],
  setRemainingWordsTries: () => {},
  keyboardKeysState: {},
  setKeyboardKeysState: () => {},
  activeRow: { current: 0 },
  activeTile: { current: 0 },
  emptyGame: [],
  game: [],
  setGame: () => {},
});

type PropsInterface = {
  children: ReactNode;
};

export function GameProvider({ children }: PropsInterface) {
  const wordOfTheDayDefault = removeTildes(
    solutions[358 + 365 + dayOfTheYear()].solution
  );

  const uniqueArrWithoutTildes = [...new Set(validWords.map(removeTildes))];
  const [wordOfTheDay, setWordOfTheDay] = useState(wordOfTheDayDefault);
  const [displayRemainingWords, setDisplayRemainingWords] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isArchivePanelOpen, setIsArchivePanelOpen] = useState(false);
  const [isStatsPanelOpen, setIsStatsPanelOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isWin, setIsWin] = useState<boolean>(false);
  const [remainingWords, setRemainingWords] = useState<string[]>(
    uniqueArrWithoutTildes
  );
  const [remainingWordsTries, setRemainingWordsTries] = useState<number[]>([
    uniqueArrWithoutTildes.length,
  ]);
  const [keyboardKeysState, setKeyboardKeysState] = useState({});
  const activeRow = useRef(0);
  const activeTile = useRef(0);
  const emptyGame: TileInterface[][] = Array(6).fill(
    Array(5).fill({
      state: "",
      letter: "",
    })
  );
  const localStorageGame: string | null = localStorage.getItem("game");
  const [game, setGame] = useState(() =>
    localStorageGame ? JSON.parse(localStorageGame) : emptyGame
  );

  return (
    <GameContext.Provider
      value={{
        wordOfTheDay,
        wordOfTheDayDefault,
        setWordOfTheDay,
        uniqueArrWithoutTildes,
        displayRemainingWords,
        setDisplayRemainingWords,
        isSettingsPanelOpen,
        setIsSettingsPanelOpen,
        isArchivePanelOpen,
        setIsArchivePanelOpen,
        isStatsPanelOpen,
        setIsStatsPanelOpen,
        message,
        setMessage,
        isWin,
        setIsWin,
        remainingWords,
        setRemainingWords,
        remainingWordsTries,
        setRemainingWordsTries,
        keyboardKeysState,
        setKeyboardKeysState,
        activeRow,
        activeTile,
        emptyGame,
        game,
        setGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

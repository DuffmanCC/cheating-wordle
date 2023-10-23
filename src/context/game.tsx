import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";
import solutions from "../data/solutions";
import validWords from "../data/validWords";
import TileInterface from "../interfaces/TileInterface";
import { dayOfTheYear, removeTildes } from "../lib/tools";

type GameContextType = {
  wordOfTheDay: string;
  wordOfTheDayDefault: string;
  setWordOfTheDay: Dispatch<SetStateAction<string>>;
  uniqueArrWithoutTildes: string[];
  isSettingsPanelOpen: boolean;
  setIsSettingsPanelOpen: Dispatch<SetStateAction<boolean>>;
  displayRemainingWords: boolean;
  setDisplayRemainingWords: Dispatch<SetStateAction<boolean>>;
  isArchivePanelOpen: boolean;
  setIsArchivePanelOpen: Dispatch<SetStateAction<boolean>>;
  isStatsPanelOpen: boolean;
  setIsStatsPanelOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isWin: boolean;
  setIsWin: Dispatch<SetStateAction<boolean>>;
  remainingWords: string[];
  setRemainingWords: Dispatch<SetStateAction<string[]>>;
  remainingWordsTries: number[];
  setRemainingWordsTries: Dispatch<SetStateAction<number[]>>;
  keyboardKeysState: { [key: string]: string };
  setKeyboardKeysState: Dispatch<SetStateAction<{}>>;
  activeRow: MutableRefObject<number>;
  activeTile: MutableRefObject<number>;
  emptyGame: TileInterface[][];
  game: TileInterface[][];
  setGame: Dispatch<SetStateAction<TileInterface[][]>>;
};

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
    solutions[358 + dayOfTheYear()].solution
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

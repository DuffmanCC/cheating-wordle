export interface TileInterface {
  state: string;
  letter: string;
}

export interface PlayerInterface {
  jornada: string;
  word: string;
  attempts: number | null;
}

export interface DataInterface {
  [key: string]: PlayerInterface[];
}

export interface KeyboardKeysStateInterface {
  [key: string]: string;
}

export interface RegexInterface {
  included: string[];
  notIncluded: string[];
  pattern: string;
}

export interface WeekInterface {
  weekNumber: number;
  start: Date;
  end: Date;
}

export interface MonthInterface {
  monthName: string;
  monthYear: number;
  start: Date;
  end: Date;
}

export type GameContextType = {
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

export interface Player {
  name: string;
  media: number;
  mediaPrev: number;
  rank: number;
  rankPrev: number;
  symbol: string;
  roundsPlayed: number;
  attempts: number[];
  diff: null;
  drs: null;
}

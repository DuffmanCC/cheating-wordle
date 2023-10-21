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

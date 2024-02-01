import { NUMBER_OF_DECIMALS, STARTING_DATE } from "../data/constants";
import {
  DataInterface,
  KeyboardKeysStateInterface,
  MonthInterface,
  Player,
  RegexInterface,
  TileInterface,
  WeekInterface,
} from "../interfaces/interfaces";

export function removeTildes(word: string): string {
  const tildes = /[áéíóú]/g;

  return word.replace(tildes, (match: string): string => {
    switch (match) {
      case "á":
        return "a";
      case "é":
        return "e";
      case "í":
        return "i";
      case "ó":
        return "o";
      case "ú":
        return "u";
      default:
        return match;
    }
  });
}

export function formatDate(date: string) {
  const dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  return dateObj.toLocaleDateString("es-ES", options);
}

export function isValidWord(word: TileInterface[], validWords: string[]) {
  const arr = word.map((tile) => tile.letter);

  return validWords.includes(arr.join(""));
}

export function isFullWord(word: TileInterface[]): boolean {
  const arr = word.map((el) => (el.letter ? true : false));

  return !arr.includes(false);
}

export function createRegex(row: TileInterface[]) {
  const regex = row
    .map((el, index) => {
      if (el.state === "match") {
        return el.letter;
      } else if (el.state === "present" || el.state === "absent") {
        return `[^${el.letter}]`;
      } else {
        return ".";
      }
    })
    .join("");

  return regex;
}

export function updateRemainingWords(
  remainingWordsDefault: string[],
  { included, notIncluded, pattern }: RegexInterface
) {
  let includedPattern = "";

  if (included.length > 0) {
    included.forEach((letter: string) => {
      includedPattern += `(?=.*${letter})`;
    });
  }

  const notIncludedPattern =
    notIncluded.length > 0 ? `(?!.*[${notIncluded.join("")}])` : "";

  const regExp = new RegExp(
    `^${includedPattern}${notIncludedPattern}${pattern}$`
  );

  // filter words containing letters
  let arr = remainingWordsDefault.filter((word) => {
    return regExp.test(word);
  });

  return arr;
}

export function isTheWord(
  word: TileInterface[],
  wordOfTheDay: string
): boolean {
  return word.map((tile) => tile.letter).join("") === wordOfTheDay;
}

export function dayOfTheYear(): number {
  const today: Date = new Date();
  const startOfYear: Date = new Date(today.getFullYear(), 0, 0);
  const diff: number = today.getTime() - startOfYear.getTime();
  const oneDay: number = 1000 * 60 * 60 * 24;

  return Math.floor(diff / oneDay);
}

export function countingRepeatedLetters(wordOfTheDay: string): {
  [key: string]: { number: number };
} {
  const count: {
    [key: string]: {
      number: number;
      position: number;
    };
  } = {};

  const arr = wordOfTheDay.split("");

  arr.forEach((letter) => {
    count[letter] = {
      number: (count[letter]?.number || 0) + 1,
      position: arr.indexOf(letter),
    };
  });

  return count;
}

export function setLetterStates(
  wordOfTheDay: string,
  submittedWord: TileInterface[],
  game: TileInterface[][],
  activeRow: { current: number },
  keyboardKeysState: KeyboardKeysStateInterface,
  setKeyboardKeysState: React.Dispatch<
    React.SetStateAction<KeyboardKeysStateInterface>
  >,
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>
): RegexInterface {
  const included: string[] = [];
  const notIncluded: string[] = [];

  const newKeyboardKeysState: KeyboardKeysStateInterface = {};

  // check for repeated letters
  const repeatedLettersWordOfTheDay = countingRepeatedLetters(wordOfTheDay);
  const repeatedLettersSubmittedWord = countingRepeatedLetters(
    submittedWord.map((tile) => tile.letter).join("")
  );

  // console.log("repeatedLettersWordOfTheDay: ", repeatedLettersWordOfTheDay);
  // console.log("repeatedLettersSubmittedWord: ", repeatedLettersSubmittedWord);

  submittedWord.forEach((tile, index) => {
    if (tile.letter === wordOfTheDay[index]) {
      game[activeRow.current][index].state = "match";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "match";

      included.push(tile.letter);

      // console.log("1 -", tile.letter);

      return;
    }

    if (!wordOfTheDay.includes(tile.letter)) {
      game[activeRow.current][index].state = "absent";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "absent";

      notIncluded.push(tile.letter);

      // console.log("2 -", tile.letter);

      return;
    }

    if (
      Object.keys(repeatedLettersWordOfTheDay).includes(tile.letter) &&
      repeatedLettersWordOfTheDay[tile.letter].number >= 1
    ) {
      game[activeRow.current][index].state = "present";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "present";

      included.push(tile.letter);

      // console.log("3 -", tile.letter);

      return;
    }
  });

  setGame(game);

  setKeyboardKeysState({ ...keyboardKeysState, ...newKeyboardKeysState });

  return {
    included,
    notIncluded,
    pattern: createRegex(game[activeRow.current]),
  };
}

export function fillTile(
  letter: string,
  game: TileInterface[][],
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>,
  activeRow: { current: number },
  activeTile: { current: number }
) {
  if (activeTile.current > 4) return;

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  updatedGame[activeRow.current][activeTile.current].letter = letter;
  setGame(updatedGame);
}

export function deleteTile(
  activeTile: { current: number },
  activeRow: { current: number },
  game: TileInterface[][],
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>
) {
  if (activeTile.current === 0 && game[activeRow.current][0].letter === "")
    return;

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  if (updatedGame[activeRow.current][activeTile.current].letter !== "") {
    updatedGame[activeRow.current][activeTile.current].letter = "";
  } else {
    updatedGame[activeRow.current][activeTile.current - 1].letter = "";
  }

  setGame(updatedGame);
}

export function createGameBoardResult(game: TileInterface[][]): Array<string> {
  const arr = game.map((row) => {
    return row
      .map((tile) => {
        if (tile.state === "present") return `🟨`;
        if (tile.state === "absent") return `⬜`;
        if (tile.state === "match") return `🟩`;
      })
      .join("");
  });

  return arr.filter((element) => element !== "");
}

export function createClipboardString(gameBoardResult: string[]) {
  const gameTiles = gameBoardResult.join("\n");
  return (
    `Cheating Wordle #${359 + 365 + dayOfTheYear()} ${
      gameTiles.length + 1
    }/6 \n\n` +
    gameTiles +
    `\n\n` +
    `To keep cheating: \n` +
    `https://duffmancc.github.io/cheating-wordle/`
  );
}

export function formatDateToDDMMYY(date: Date) {
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (months are 0-based) and pad with leading zero if needed
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

  return `${day}/${month}/${year}`;
}

export function mapStats(arr: string[][]): Object {
  interface Entry {
    jornada: string;
    word: string;
    attempts: number | null;
    date: string;
  }

  interface Result {
    [key: string]: Entry[];
  }

  const obj: Result = {};

  // Iterate over the rows in arr
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    const name = row[0] as string;
    const values = row.slice(1);

    // Initialize an array to hold the objects for this name
    obj[name] = [];

    // Iterate over the values and create objects for each one
    for (let j = 0; j < values.length; j++) {
      const attempts = values[j];
      const jor = arr[arr.length - 1][j + 1] as string;
      const jornada = jor.split(" ")[0]; // Extract the jornada from jornada
      const word = jor.split(" ")[1]; // Extract the word from jornada

      const startingDate = new Date(STARTING_DATE);
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const date = new Date(startingDate.getTime() + j * oneDayInMilliseconds);

      // Create the object and push it into the array
      obj[name].push({
        jornada: jornada,
        word: word,
        attempts: !isNaN(parseInt(attempts)) ? parseInt(attempts) : null,
        date: formatDateToDDMMYY(date),
      });
    }
  }

  return obj;
}

export function bgColorFromAttemps(attempts: string | number) {
  if (attempts === 1) {
    return "bg-yellow-300";
  }

  if (attempts === 2) {
    return "bg-yellow-400";
  }

  if (attempts === 3) {
    return "bg-yellow-500";
  }

  if (attempts === 4) {
    return "bg-yellow-600";
  }

  if (attempts === 5) {
    return "bg-yellow-700";
  }

  if (attempts === 6) {
    return "bg-yellow-800";
  }

  if (attempts === 7) {
    return "bg-yellow-900";
  }

  return "bg-gray-600";
}

export function rank(value: number, values: number[], descending = false) {
  const clonedValues = [...values];

  // delete NaN values
  const filteredValues = clonedValues.filter((value) => !isNaN(value));

  // Sort the cloned array in descending order if needed
  if (descending) {
    filteredValues.sort((a, b) => b - a);
  } else {
    filteredValues.sort((a, b) => a - b);
  }

  // Find the index of the value in the sorted array
  const sortedIndex = filteredValues.indexOf(value);

  // Calculate the rank (add 1 to start from 1-based ranking)
  const rank = sortedIndex + 1;

  return rank;
}

export function symbol(a: number, b: number) {
  return a > b ? "▲" : a < b ? "▼" : "=";
}

export function media(arr: number[]) {
  const sum = arr.reduce((acc, ccv) => acc + ccv, 0);
  const rawResult = sum / roundsPlayed(arr);
  const roundedResult = rawResult.toFixed(NUMBER_OF_DECIMALS);

  return parseFloat(roundedResult);
}

export function mediaPrev(arr: number[]) {
  const newArr = arr.slice(0, arr.length - 1);

  const sum = newArr.reduce((acc, ccv) => acc + ccv, 0);
  const rawResult = sum / roundsPlayed(newArr);
  const roundedResult = rawResult.toFixed(NUMBER_OF_DECIMALS);

  return parseFloat(roundedResult);
}

export function roundsPlayed(arr: number[]) {
  const elementosNoNulos = arr.filter((elemento) => elemento !== null);

  return elementosNoNulos.length;
}

export function diffPlayer(players: Player[], rank: number) {
  const currentPlayer = players.find((player: Player) => player.rank === rank);

  if (currentPlayer === undefined) return 0;

  // sort players by rank
  players.sort((a: Player, b: Player) => a.rank - b.rank);

  const indexCurrentPlayer = players.indexOf(currentPlayer);

  if (indexCurrentPlayer === 0) return 0;

  const prevPlayer = players[indexCurrentPlayer - 1];

  const rawResult = (prevPlayer.media - currentPlayer.media).toFixed(
    NUMBER_OF_DECIMALS
  );

  return parseFloat(rawResult);
}

export function drs(players: Player[], rank: number) {
  const currentPlayer = players.find((player: Player) => player.rank === rank);

  if (currentPlayer === undefined) return 0;

  // sort players by rank
  players.sort((a: Player, b: Player) => a.rank - b.rank);

  const indexCurrentPlayer = players.indexOf(currentPlayer);

  if (indexCurrentPlayer === 0) return 0;

  const prevPlayer = players[indexCurrentPlayer - 1];

  const mediaPreviousPlayer = prevPlayer.media;
  const roundsPlayed = currentPlayer.roundsPlayed;
  const sumaAllAttempts = currentPlayer.attempts.reduce(
    (acc: number, curr: number | null) => {
      if (curr === null) {
        return acc;
      } else {
        return acc + curr;
      }
    }
  );

  const rawResult =
    mediaPreviousPlayer -
    (mediaPreviousPlayer * (roundsPlayed + 1) - sumaAllAttempts);

  return -1 * Math.ceil(rawResult);
}

export function bgDrsColor(drs: number | null) {
  if (drs === null) {
    return false;
  }

  if (drs >= -3) {
    return "bg-red-500 text-white";
  }

  return false;
}

export function arrowColor(symbol: string) {
  if (symbol === "▲") {
    return "text-green-500";
  }

  if (symbol === "▼") {
    return "text-red-500";
  }

  return "";
}

export function getFullWeeksStartingOnMondayBetweenDates(
  startDate: Date
): WeekInterface[] {
  const weeks = [];
  const currentDate = new Date(startDate);
  const toDay = new Date();

  // Find the next Monday from the start date
  currentDate.setDate(startDate.getDate() + (8 - startDate.getDay()));
  let num = 0;

  while (currentDate <= toDay) {
    const weekStart = new Date(currentDate);
    const weekEnd = new Date(currentDate);
    weekEnd.setDate(currentDate.getDate() + 6);

    weeks.push({
      weekNumber: num + 1,
      start: weekStart,
      end: weekEnd,
    });

    // Move to the next Monday
    currentDate.setDate(currentDate.getDate() + 7);
    num++;
  }

  const arr = weeks.filter((week) => week.end <= toDay);

  return arr;
}

export function getMonthsBetweenDates(startDate: Date): MonthInterface[] {
  const today = new Date();
  const months = [];

  let startingDayObject = startDate;

  while (startingDayObject <= today) {
    const monthName = startingDayObject.toLocaleString("en-US", {
      month: "long",
    });
    const monthYear = startingDayObject.getFullYear();

    const firstDayOfMonth = new Date(startingDayObject);
    firstDayOfMonth.setDate(1);
    const lastDayOfMonth = new Date(startingDayObject);
    //first day of the next month
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1, 1);
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

    const monthObject = {
      monthName,
      monthYear,
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    };

    months.push(monthObject);

    startingDayObject.setMonth(startingDayObject.getMonth() + 1);
  }

  // add current month
  // first day of current month
  const firstDayOfMonth = new Date(today);
  firstDayOfMonth.setDate(1);

  // last day of current month
  const lastDayOfMonth = new Date(today);
  //first day of the next month
  lastDayOfMonth.setMonth(today.getMonth() + 1, 1);
  lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

  months.push({
    monthName: today.toLocaleString("en-US", { month: "long" }),
    monthYear: today.getFullYear(),
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  return months;
}

export function daysUntilToday(date: Date, arrayLength: number) {
  const toDay = new Date();
  const milisecondsInADay = 1000 * 3600 * 24;
  const timeDifference = toDay.getTime() - date.getTime();

  return arrayLength - Math.floor(timeDifference / milisecondsInADay);
}

export function getStateClasses(state: string) {
  const classes = "transition-colors duration-200 text-white";

  if (state === "match")
    return ["bg-green-600 border-green-600", classes].join(" ");

  if (state === "present")
    return ["bg-yellow-600 border-yellow-600", classes].join(" ");

  if (state === "absent")
    return ["bg-gray-500 border-gray-500", classes].join(" ");

  return "";
}

export function mediaJornada(data: DataInterface, round: number = 0): Number {
  const players = Object.keys(data).filter((player) => {
    return player !== "JORNADA";
  });

  const arr = players.map((player) => {
    return data[player][round].attempts;
  });

  const nonNullValues = arr.filter((item) => item !== null);

  if (nonNullValues.length === 0) {
    return 0;
  }

  const sumNonNull = nonNullValues.reduce((acc, currentValue) => {
    if (acc === null || currentValue === null) {
      return 0;
    }

    return acc + currentValue;
  }, 0);

  if (sumNonNull === null) {
    return 0;
  }

  return sumNonNull / nonNullValues.length;
}

export function mediaAllJornadas(
  data: DataInterface
): { mediaJornada: Number }[] {
  const arr = [];
  const numberOfRounds = data.JORNADA.length;

  for (let i = 0; i < numberOfRounds; i++) {
    arr.push({
      mediaJornada: mediaJornada(data, i),
      jornada: i + 6,
      word: data.JORNADA[i].word,
    });
  }

  return arr;
}

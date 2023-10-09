import KeyboardKeysStateInterface from "../interfaces/KeyboardKeysStateInterface";
import RegexInterface from "../interfaces/RegexInterface";
import TileInterface from "../interfaces/TileInterface";

export const removeTildes = (word: string): string => {
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
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  return dateObj.toLocaleDateString("es-ES", options);
};

export const isValidWord = (word: TileInterface[], validWords: string[]) => {
  const arr = word.map((tile) => tile.letter);

  return validWords.includes(arr.join(""));
};

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

  console.log("repeatedLettersWordOfTheDay: ", repeatedLettersWordOfTheDay);
  console.log("repeatedLettersSubmittedWord: ", repeatedLettersSubmittedWord);

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
    `Cheating Wordle #${359 + dayOfTheYear()} ${gameTiles.length + 1}/6 \n\n` +
    gameTiles +
    `\n\n` +
    `To keep cheating: \n` +
    `https://duffmancc.github.io/cheating-wordle/`
  );
}

export function mapStats(arr: (string | number)[][]): Object {
  interface Entry {
    jornada: string;
    word: string;
    attempts: number;
  }

  interface Result {
    [key: string]: Entry[];
  }

  const obj: Result = {};
  // Iterate over the rows in arr
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    const name = row[0] as string;
    const values = row.slice(1) as number[];

    // Initialize an array to hold the objects for this name
    obj[name] = [];

    // Iterate over the values and create objects for each one
    for (let j = 0; j < values.length; j++) {
      const attempts = values[j];
      const jor = arr[arr.length - 1][j + 1] as string;
      const jornada = jor.split(" ")[0]; // Extract the jornada from jornada
      const word = jor.split(" ")[1]; // Extract the word from jornada

      // Create the object and push it into the array
      obj[name].push({
        jornada: jornada,
        word: word,
        attempts: attempts,
      });
    }
  }

  return obj;
}

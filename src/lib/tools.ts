import TileInterface from "../interfaces/TileInterface";
import RegexInterface from "../interfaces/RegexInterface";

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
      } else if (el.state === "present") {
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
  currentGuess: TileInterface[],
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

export function countingRepeatedLetters(arr: string[]): {
  [key: string]: number;
} {
  const count: { [key: string]: number } = {};

  for (let letter of arr) {
    count[letter] = (count[letter] || 0) + 1;
  }

  return count;
}

export function setLetterStates(
  wordOfTheDay: string,
  submittedWord: TileInterface[],
  game: TileInterface[][],
  activeRow: number,
  activeTile: number,
  keyboardKeysState: KeyboardKeysStateInterface,
  setKeyboardKeysState: React.Dispatch<
    React.SetStateAction<KeyboardKeysStateInterface>
  >,
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>
): RegexInterface {
  const included: string[] = [];
  const notIncluded: string[] = [];

  const newKeyboardKeysState: KeyboardKeysStateInterface = {};

  const repeatedLetters: string[] = [];

  submittedWord.forEach((tile, index) => {
    if (wordOfTheDay.indexOf(tile.letter) !== -1) {
      game[activeRow][index].state = "present";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "present";
      repeatedLetters.push(tile.letter);

      included.push(tile.letter);
    } else {
      game[activeRow][index].state = "absent";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "absent";

      notIncluded.push(tile.letter);
    }

    if (tile.letter === wordOfTheDay[index]) {
      game[activeRow][index].state = "match";
      newKeyboardKeysState[tile.letter.toUpperCase()] = "match";

      included.push(tile.letter);
    }
  });

  // check for included and repeated letters
  // const submittedRepeated: { [key: string]: number } =
  //   countingRepeatedLetters(repeatedLetters);

  // const wordOfTheDayRepeated: { [key: string]: number } =
  //   countingRepeatedLetters(wordOfTheDay.split(""));

  // console.log("try", submittedRepeated);
  // console.log("wordOfTheDay", wordOfTheDayRepeated);

  // check for repeated letters
  // TODO
  // submittedWord.forEach((tile, index) => {
  //   if (game[activeRow][index].state !== "present") {
  //     return;
  //   }

  //   if (submittedRepeated[tile.letter] > wordOfTheDayRepeated[tile.letter]) {
  //     game[activeRow][index].state = "repeated";
  //   }
  // });

  console.log("game", game[activeRow]);
  setGame(game);

  setKeyboardKeysState({ ...keyboardKeysState, ...newKeyboardKeysState });

  return {
    included,
    notIncluded,
    pattern: createRegex(game[activeRow]),
  };
}

export function fillTile(
  letter: string,
  game: TileInterface[][],
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>,
  activeRow: number,
  activeTile: number
) {
  if (activeTile > 4) return;

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  updatedGame[activeRow][activeTile].letter = letter;
  setGame(updatedGame);
}

export function deleteTile(
  activeTile: number,
  activeRow: number,
  game: TileInterface[][],
  setGame: React.Dispatch<React.SetStateAction<TileInterface[][]>>
) {
  if (activeTile === 0 && game[activeRow][0].letter === "") return;

  const str = JSON.stringify(game);
  const updatedGame = JSON.parse(str);

  if (updatedGame[activeRow][activeTile].letter !== "") {
    updatedGame[activeRow][activeTile].letter = "";
  } else {
    updatedGame[activeRow][activeTile - 1].letter = "";
  }

  setGame(updatedGame);
}
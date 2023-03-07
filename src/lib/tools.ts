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

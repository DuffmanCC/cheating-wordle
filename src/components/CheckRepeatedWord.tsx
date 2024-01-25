import { useState } from "react";
import solutions from "../data/solutions";
import { dayOfTheYear, removeTildes } from "../lib/tools";

interface Word {
  id: number;
  solution: string;
  desc: string;
}

const CheckRepeatedWord = () => {
  const [repeatedWord, setRepeatedWord] = useState("");
  const [repeatedWordId, setRepeatedWordId] = useState<Word[]>([]);

  const handleRepeatedWord = (word: string): void => {
    if (word.length !== 5) return;

    word = word.toLocaleLowerCase();

    const solutionsToWordOfTheDay = solutions.slice(
      0,
      358 + 365 + dayOfTheYear()
    );

    const ids = solutionsToWordOfTheDay.filter(
      (solution) => removeTildes(solution.solution) === word
    );

    setRepeatedWordId(ids);
  };

  return (
    <div>
      <label className="flex justify-start items-center gap-4 mb-4">
        <div className="relative">
          <div>Check repeated:</div>
        </div>

        <div className="flex">
          <input
            type="text"
            id="show-remaining-words"
            tabIndex={0}
            value={repeatedWord}
            className="font-mono h-8 w-28 text-xl p-2 uppercase tracking-widest border border-gray-500"
            onChange={(e) => {
              if (e.target.value.length > 5) return;

              if (e.target.value.length === 5) {
                handleRepeatedWord(e.target.value);
              }

              setRepeatedWord(e.target.value);
            }}
          />
        </div>
      </label>

      {repeatedWord.length === 5 && (
        <div className="">
          {repeatedWordId.length > 0
            ? `Solution number ${repeatedWordId.map((w) => ` #${w.id}`)}`
            : `Not found`}
        </div>
      )}
    </div>
  );
};

export default CheckRepeatedWord;

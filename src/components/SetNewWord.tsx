import { useState } from "react";

interface PropsInterface {
  setNewWordOfTheDay: (newWordOfTheDay: string) => void;
}
const SetNewWord = ({ setNewWordOfTheDay }: PropsInterface) => {
  const [word, setWord] = useState("");

  const handleSet = () => {
    setTimeout(() => {
      setNewWordOfTheDay(word.toLowerCase());
    }, 200);
  };

  return (
    <div>
      <label className="flex justify-start items-center gap-4 mb-4">
        <div className="relative">
          <div>Set new solution:</div>

          <div className="text-xs text-gray-500 absolute">
            for testing purpose
          </div>
        </div>

        <div className="flex">
          <input
            type="text"
            id="show-remaining-words"
            tabIndex={0}
            value={word}
            className="font-mono h-8 w-28 text-xl p-2 uppercase tracking-widest border border-gray-500"
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSet();
              }
            }}
          />

          <button
            className="h-8 p-2 flex justify-start items-center bg-gray-500 text-white text-sm border border-gray-500"
            onClick={handleSet}
          >
            SET
          </button>
        </div>
      </label>
    </div>
  );
};

export default SetNewWord;

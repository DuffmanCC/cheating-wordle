import { useState } from "react";
import ShowIcon from "./icons/ShowIcon";

interface PropsInterface {
  remainingWords: string[];
}

const RemainingWords = ({ remainingWords }: PropsInterface) => {
  const [displayRemainingWords, setDisplayRemainingWords] = useState(false);

  return (
    <div className="text-center mb-20">
      <div className="flex justify-center items-center mb-4 gap-4">
        <h2 className="text-xl">Remaining words: {remainingWords.length}</h2>

        <button
          onClick={() => setDisplayRemainingWords(!displayRemainingWords)}
          className=""
        >
          <ShowIcon width="1rem" />
        </button>
      </div>

      {remainingWords.length < 100 && displayRemainingWords && (
        <ul className="overflow-auto h-auto border border-gray-400 flex flex-wrap justify-center py-2 rounded-lg">
          {remainingWords.map((word, i) => (
            <li key={i} className="mr-2 leading-snug">
              {word}

              {i != remainingWords.length - 1 && <span>,</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemainingWords;

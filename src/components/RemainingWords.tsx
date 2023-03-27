import ArrowDownIcon from "./icons/ArrowDownIcon";
import ArrowDownWithBaseIcon from "./icons/ArrowDownWithBaseIcon";

interface PropsInterface {
  remainingWords: string[];
  displayRemainingWords: boolean;
  setDisplayRemainingWords: (displayRemainingWords: boolean) => void;
}

const RemainingWords = ({
  remainingWords,
  displayRemainingWords,
  setDisplayRemainingWords,
}: PropsInterface) => {
  return (
    <div className="text-center mb-20">
      <div className="flex justify-center items-center mb-4 gap-4">
        <h2 className="text-xl">Remaining words: {remainingWords.length}</h2>

        {remainingWords.length < 100 && (
          <button
            onClick={() => setDisplayRemainingWords(!displayRemainingWords)}
            className=""
          >
            {displayRemainingWords ? (
              <ArrowDownIcon width="1rem" />
            ) : (
              <ArrowDownWithBaseIcon width="1rem" />
            )}
          </button>
        )}
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

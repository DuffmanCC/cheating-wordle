interface PropsInterface {
  remainingWords: string[];
}

const RemainingWords = ({ remainingWords }: PropsInterface) => {
  return (
    <div className="text-center mb-20">
      <h2 className="text-xl mb-2">Remaining words: {remainingWords.length}</h2>

      {remainingWords.length < 100 && (
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

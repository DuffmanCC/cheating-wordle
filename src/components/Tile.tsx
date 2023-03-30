import { useEffect, useState } from "react";

interface Props {
  letter: string;
  isActive: boolean;
  state: string;
  key: number;
}

export default function Tile({ letter, isActive, state }: Props, key: number) {
  let [showLetter, setShowLetter] = useState(false);

  const classes =
    "mx-0.5 w-16 h-16 | text-3xl font-bold capitalize | rounded-lg border-2 | flex items-center justify-center | absolute inset-0";

  const transition = "transition-colors transition-transform duration-50";
  const showLetterClasses = showLetter && "scale-125";

  useEffect(() => {
    if (letter !== "") {
      setShowLetter(true);

      const timerID = setTimeout(() => {
        setShowLetter(false);
      }, 100);

      return () => clearTimeout(timerID);
    }
  }, [letter, state]);

  return (
    <div className="relative w-16 h-16">
      <div
        key={key}
        className={
          isActive
            ? [
                "border-blue-500",
                classes,
                showLetterClasses,
                stateClasses(state),
              ]
                .join(" ")
                .trim()
            : [classes, transition, showLetterClasses, stateClasses(state)]
                .join(" ")
                .trim()
        }
      >
        {letter}
      </div>
    </div>
  );
}

const stateClasses = (state: string) => {
  if (state === "match") return "bg-green-600 text-white border-green-600";

  if (state === "present") return "bg-yellow-600 text-white border-yellow-600";

  if (state === "absent") return "bg-gray-500 text-white border-gray-500";
};

import { useEffect, useState } from "react";

export default function useTile(letter: string, state: string) {
  let [showLetter, setShowLetter] = useState(false);

  const commonClasses =
    "mx-0.5 w-16 h-16 | text-3xl font-bold capitalize | rounded-lg border-2 | flex items-center justify-center | absolute inset-0";

  const transitionClasses =
    "transition-colors transition-transform duration-50";
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

  return { commonClasses, transitionClasses, showLetterClasses };
}

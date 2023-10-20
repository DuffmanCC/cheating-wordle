import { useMemo } from "react";
import useTile from "../hooks/useTile";
import { getStateClasses } from "../lib/tools";

interface PropsInterface {
  letter: string;
  isActive: boolean;
  state: string;
  key: number;
}

export default function Tile(
  { letter, isActive, state }: PropsInterface,
  key: number
) {
  const { commonClasses, transitionClasses, showLetterClasses } = useTile(
    letter,
    state
  );

  const stateClasses = useMemo(() => getStateClasses(state), [state]);

  const tileCommonClasses = useMemo(
    () => [commonClasses, showLetterClasses, stateClasses].join(" "),
    [commonClasses, showLetterClasses, stateClasses]
  );

  return (
    <div className="relative w-16 h-16">
      <div
        key={key}
        className={
          isActive
            ? ["border-blue-500", tileCommonClasses].join(" ").trim()
            : [transitionClasses, tileCommonClasses].join(" ").trim()
        }
      >
        {letter}
      </div>
    </div>
  );
}

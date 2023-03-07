import { useState } from "react";

interface Props {
  letter: string;
  isActive: boolean;
  state: string;
}

export default function Tile({ letter, isActive, state }: Props, key: number) {
  const classes =
    "mx-1 w-16 h-16 | text-2xl font-bold capitalize | rounded-lg border-2 | flex items-center justify-center";

  const stateClasses = (state: string) => {
    if (state === "match") return "bg-green-600 text-white border-green-600";

    if (state === "present")
      return "bg-yellow-600 text-white border-yellow-600";

    if (state === "absent") return "bg-gray-500 text-white border-gray-500";
  };

  return (
    <div
      className={
        isActive
          ? `border-blue-500 ${classes} ${stateClasses(state)}`
          : `${classes} ${stateClasses(state)}`
      }
    >
      {letter}
    </div>
  );
}

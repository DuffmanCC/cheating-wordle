import { ReactNode, useState } from "react";

interface PropsInterface {
  children?: ReactNode;
  value: string;
  state: string;
  onClick: (value: string) => void;
  width?: number;
}

const Key = ({ children, value, state, onClick, width }: PropsInterface) => {
  const classes =
    "flex items-center justify-center | rounded px-1 h-12 | text-xs font-bold | cursor-pointer select-none | hover:bg-gray-200";

  const [isActive, setIsActive] = useState(false);

  const handleClick = (value: string) => {
    setIsActive(true);
    onClick(value);
    setTimeout(() => {
      setIsActive(false);
    }, 50);
  };

  const isActiveClasses =
    isActive &&
    "scale-125 border border-gray-200 trainsition-transform transition-colors duration-50";

  return (
    <button
      style={{ width: width || "34px" }}
      className={[classes, stateClasses(state), isActiveClasses].join(" ")}
      onClick={() => handleClick(value)}
    >
      {children || value}
    </button>
  );
};

export default Key;

const stateClasses = (state: string) => {
  const classes = "transition-colors duration-200 text-white";

  if (state === "match") return "bg-green-600 border-green-600" + classes;

  if (state === "present") return "bg-yellow-600 border-yellow-600" + classes;

  if (state === "absent") return "bg-gray-500 border-gray-500" + classes;

  return "bg-gray-100";
};

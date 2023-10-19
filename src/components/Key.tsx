import { ReactNode, useState } from "react";
import { getStateClasses } from "../lib/tools";

interface PropsInterface {
  children?: ReactNode;
  value: string;
  state: string;
  onClick: (value: string) => void;
  width?: number;
}

const Key = ({ children, value, state, onClick, width }: PropsInterface) => {
  const classes =
    "flex items-center justify-center | rounded px-1 h-12 | text-xs font-bold | cursor-pointer select-none | hover:bg-gray-200 bg-gray-100";

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
      className={[classes, getStateClasses(state), isActiveClasses].join(" ")}
      onClick={() => handleClick(value)}
    >
      {children || value}
    </button>
  );
};

export default Key;

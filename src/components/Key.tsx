import { ReactNode } from "react";

interface PropsInterface {
  children?: string | ReactNode;
  value: string;
  state: string;
  onClick: (value: string) => void;
  width?: number;
}

const Key = ({ children, value, state, onClick, width }: PropsInterface) => {
  function handleClick(value: string) {
    onClick(value.toLowerCase());
  }

  const classes =
    "flex items-center justify-center | rounded mx-0.5 | text-xs font-bold | cursor-pointer select-none";

  const stateClasses = (state: string) => {
    if (state === "match") return "bg-green-600 text-white border-green-600";

    if (state === "present")
      return "bg-yellow-600 text-white border-yellow-600";

    if (state === "absent") return "bg-gray-500 text-white border-gray-500";

    return "bg-gray-100";
  };

  return (
    <button
      style={{ width: width || "30px", height: "58px" }}
      className={`${classes} ${stateClasses(state)}`}
      onClick={() => handleClick(value)}
    >
      {children || value}
    </button>
  );
};

export default Key;

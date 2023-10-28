import useGame from "../hooks/useGame";
import Key from "./Key";

const Keyboard = () => {
  const { keyboardKeysState, handleKeyDown } = useGame();

  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="mb-2 flex flex-col gap-1">
      <div className="flex justify-between gap-1">
        {firstRow.map((key) => (
          <Key
            key={key}
            value={key}
            onClick={handleKeyDown}
            state={keyboardKeysState[key]}
          />
        ))}
      </div>

      <div className="flex justify-between gap-1">
        {secondRow.map((key) => (
          <Key
            key={key}
            value={key}
            onClick={handleKeyDown}
            state={keyboardKeysState[key]}
          />
        ))}
      </div>

      <div className="flex justify-between gap-1">
        <Key width={48} value="Enter" onClick={handleKeyDown} state="">
          <svg
            focusable={false}
            aria-hidden={true}
            viewBox="0 0 24 24"
            style={{ width: "20px" }}
          >
            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
          </svg>
        </Key>

        {thirdRow.map((key) => (
          <Key
            key={key}
            value={key}
            onClick={handleKeyDown}
            state={keyboardKeysState[key]}
          />
        ))}

        <Key width={48} value="Backspace" onClick={handleKeyDown} state="">
          <svg
            focusable={false}
            aria-hidden={true}
            viewBox="0 0 24 24"
            style={{ width: "20px" }}
          >
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path>
          </svg>
        </Key>
      </div>
    </div>
  );
};

export default Keyboard;

import { useEffect, useState } from "react";
import useGame from "../hooks/useGame";

const Message = () => {
  const [animation, setAnimation] = useState("");

  const { message, setMessage } = useGame();

  useEffect(() => {
    if (message !== "") {
      setAnimation("scale-125 transition-transform duration-50");

      const timerID1 = setTimeout(() => {
        setAnimation("");
      }, 100);

      const timerID2 = setTimeout(() => {
        setMessage("");
      }, 1000);

      return () => {
        clearTimeout(timerID1);
        clearTimeout(timerID2);
      };
    }
  }, [message]);

  const classes =
    "w-64 px-4 py-2 | border rounded-lg | bg-gray-700 text-white text-center | whitespace-pre-line";

  return (
    <div className="fixed inset-x-0 bottom-6 flex justify-center z-50">
      <div className={[classes, animation].join(" ").trim()}>{message}</div>
    </div>
  );
};

export default Message;

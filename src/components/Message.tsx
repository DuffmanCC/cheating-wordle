import { useEffect, useState } from "react";

interface PropsInterface {
  message: string;
  setMessage: (message: string) => void;
}

const Message = ({ message, setMessage }: PropsInterface) => {
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (message !== "") {
      setAnimation("scale-125 transition-transform duration-50");

      const timerID = setTimeout(() => {
        setAnimation("");
      }, 100);

      return () => clearTimeout(timerID);
    }
  }, [message]);

  useEffect(() => {
    if (message !== "") {
      const timerID = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timerID);
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

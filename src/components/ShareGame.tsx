import CopyIcon from "./icons/CopyIcon";

type PropsInterface = {
  clipboard: string;
  setMessage: (message: string) => void;
};

const ShareGame = ({ clipboard, setMessage }: PropsInterface) => {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(clipboard);
      setMessage("copied to clipboard");
      console.log(clipboard);
    } catch (err) {
      setMessage(`Failed to copy: ${err}`);
    }
  };

  return (
    <button onClick={handleClick}>
      <CopyIcon width="1.5rem" />
    </button>
  );
};

export default ShareGame;

import TileInterface from "../interfaces/TileInterface";
import { createGameClipboard } from "../lib/tools";
import CopyIcon from "./icons/CopyIcon";

type PropsInterface = {
  setMessage: (message: string) => void;
  game: TileInterface[][];
  activeRow: number;
};

const ShareGame = ({ setMessage, game, activeRow }: PropsInterface) => {
  const handleClick = async () => {
    const gameTiles = createGameClipboard(game);

    const htmlString =
      `To keep cheating: \n` +
      `https://duffmancc.github.io/cheating-wordle/ \n\n` +
      `Cheating Wordle: ${activeRow + 1}/6 \n\n` +
      gameTiles;

    try {
      await navigator.clipboard.writeText(htmlString);
      setMessage("copied to clipboard");
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

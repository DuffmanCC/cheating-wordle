import TileInterface from "../interfaces/TileInterface";
import { createGameClipboard, dayOfTheYear } from "../lib/tools";
import CopyIcon from "./icons/CopyIcon";

type PropsInterface = {
  setMessage: (message: string) => void;
  game: TileInterface[][];
  activeRow: { current: number };
};

const ShareGame = ({ setMessage, game, activeRow }: PropsInterface) => {
  const handleClick = async () => {
    const gameTiles = createGameClipboard(game);

    const htmlString =
      `Cheating Wordle #${359 + dayOfTheYear()} ${
        activeRow.current + 1
      }/6 \n\n` +
      gameTiles +
      `\n\n` +
      `To keep cheating: \n` +
      `https://duffmancc.github.io/cheating-wordle/`;

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

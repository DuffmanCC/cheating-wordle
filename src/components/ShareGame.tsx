import CopyIcon from "./icons/CopyIcon";
import TelegramIcon from "./icons/TelegramIcon";
import WhatsappIcon from "./icons/WhatsappIcon";

type PropsInterface = {
  setMessage: (message: string) => void;
  clipboardString: string;
};

const ShareGame = ({ setMessage, clipboardString }: PropsInterface) => {
  const copyToClipboard = async (clipboardString: string) => {
    try {
      await navigator.clipboard.writeText(clipboardString);
      setMessage("copied to clipboard");
    } catch (err) {
      setMessage(`Failed to copy: ${err}`);
    }
  };

  const shareToWhatsapp = (clipboardString: string) => {
    const encodedText = encodeURIComponent(clipboardString);
    const url = `https://wa.me/?text=${encodedText}`;
    window.open(url, "_blank");
  };

  const shareToTelegram = (htmlString: string) => {
    const encodedText = encodeURIComponent(clipboardString);
    const url = `https://t.me/share/url?url=${encodedText}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => shareToWhatsapp(clipboardString)}>
        <div className="rounded-full bg-green-600 w-10 h-10 justify-center items-center flex">
          <WhatsappIcon
            width="1.5rem"
            className="text-white relative left-px"
          />
        </div>
      </button>

      <button onClick={() => shareToTelegram(clipboardString)}>
        <div className="rounded-full bg-blue-500 w-10 h-10 justify-center items-center flex">
          <TelegramIcon className="text-white w-6" />
        </div>
      </button>

      <button onClick={() => copyToClipboard(clipboardString)}>
        <div className="rounded-full bg-gray-500 w-10 h-10 justify-center items-center flex">
          <CopyIcon className="text-white w-6 relative left-0.5" />
        </div>
      </button>
    </div>
  );
};

export default ShareGame;

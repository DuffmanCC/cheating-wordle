import useGame from "../hooks/useGame";
import RefreshButton from "./RefreshButton";
import CalendarIcon from "./icons/CalendarIcon";
import GearIcon from "./icons/GearIcon";
import StatsIcon from "./icons/StatsIcon";

export default function Header() {
  const { setIsSettingsPanelOpen, setIsArchivePanelOpen, setIsStatsPanelOpen } =
    useGame();

  return (
    <div className="flex gap-8 mb-4 px-4 justify-between items-center">
      <div className="flex gap-4">
        <RefreshButton />

        <button
          onClick={() => setIsSettingsPanelOpen(true)}
          className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
        >
          <GearIcon width="1.25rem" />
        </button>
      </div>

      <h1 className="text-2xl flex flex-col items-center">
        <div className="font-bold">CHEATING</div>

        <div className="ml-2 text-sm text-gray-500">WORDLE</div>
      </h1>

      <div className="flex gap-4">
        <button
          className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
          onClick={() => setIsArchivePanelOpen(true)}
        >
          <CalendarIcon width="1.25rem" />
        </button>

        <button
          onClick={() => setIsStatsPanelOpen(true)}
          className="hover:text-blue-800 focus:text-blue-800 text-gray-500"
        >
          <StatsIcon width="1.25rem" />
        </button>
      </div>
    </div>
  );
}

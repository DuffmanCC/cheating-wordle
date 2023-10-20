import { useCallback } from "react";
import useArchivePanel from "../hooks/useArchivePanel";
import { bgColorFromAttemps } from "../lib/tools";
import CloseIcon from "./icons/CloseIcon";

interface PropsInterface {
  setIsArchivePanelOpen: (isSettingsPanelOpen: boolean) => void;
}

const ArchivePanel = ({ setIsArchivePanelOpen }: PropsInterface) => {
  const { players, player, setPlayer, mappedStats } = useArchivePanel();

  const bgColor = useCallback(
    (attempts: any) => bgColorFromAttemps(attempts),
    []
  );

  return (
    <div className="absolute inset-0 bg-white p-4 flex flex-col gap-4">
      <header className="flex items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">Archive</h2>

        <button
          className="ml-auto"
          onClick={() => {
            setIsArchivePanelOpen(false);
          }}
        >
          <CloseIcon width="1.5rem" />
        </button>
      </header>

      <div className="flex gap-4 mb-4 items-center flex-col ">
        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setPlayer(e.target.value)}
        >
          <option value="default">Select player</option>

          {players.map((player: string) => {
            return (
              <option key={player} value={player}>
                {player}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex justify-center overflow-h-auto overflow-scroll">
        <div className="flex gap-1 flex-wrap">
          {player === "default"
            ? "no player selected, please select a player from the dropdown"
            : (mappedStats[player] || []).map(({ jornada, word, attempts }) => {
                return (
                  <div
                    key={jornada}
                    className={[
                      bgColor(attempts),
                      "p-1 border flex flex-col items-center text-xs rounded-md text-white w-16 h-20",
                    ].join(" ")}
                  >
                    <div className="text-4xl">{attempts || "X"}</div>
                    <div className="flex font-mono">{jornada}</div>
                    <div className="flex font-mono">{word}</div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ArchivePanel;

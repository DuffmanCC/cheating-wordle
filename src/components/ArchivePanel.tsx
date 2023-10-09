import { useEffect, useState } from "react";
import players from "../data/players";
import { fetchGoogleSheet } from "../lib/requests";
import { mapStats } from "../lib/tools";
import CloseIcon from "./icons/CloseIcon";

interface PropsInterface {
  setIsArchivePanelOpen: (isSettingsPanelOpen: boolean) => void;
}

const ArchivePanel = ({ setIsArchivePanelOpen }: PropsInterface) => {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKCgLqldtMHldCfmCGx8F8WBH2H3dWkw4KBDQBgBu31ABlvv2EDpKNIoQDjHZ_VdlDR_AZB3IrCbE_/pub?gid=0&single=true&output=csv";

  interface Entry {
    jornada: string;
    word: string;
    attempts: number | string;
  }

  interface Result {
    [key: string]: Entry[];
  }

  const [mappedStats, setMappedStats] = useState<Result>({});

  useEffect(() => {
    fetchGoogleSheet(url).then((data) => {
      const arr: Result = mapStats(data) as Result;

      setMappedStats(arr);
    });
  }, []);

  const bgClass = (attempts: string | number) => {
    if (attempts) {
      return "bg-green-600";
    }

    return "bg-gray-600";
  };

  const [player, setPlayer] = useState("Ort");

  return (
    <div className="absolute inset-0 bg-white p-4">
      <header className="flex items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">Archive</h2>

        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setPlayer(e.target.value)}
        >
          {players.map((player) => {
            return (
              <option key={player} value={player}>
                {player}
              </option>
            );
          })}
        </select>

        <button
          className="ml-auto"
          onClick={() => {
            setIsArchivePanelOpen(false);
          }}
        >
          <CloseIcon width="1.5rem" />
        </button>
      </header>

      <p>Archive for: {player}</p>

      <div className="flex gap-2 flex-wrap">
        {(mappedStats[player] || []).map(({ jornada, word, attempts }) => {
          return (
            <div
              key={jornada}
              className={
                bgClass(attempts) +
                " p-1 border flex flex-col items-center text-xs rounded-md text-white w-20 h-20"
              }
            >
              <div className="text-4xl">{attempts || "X"}</div>
              <div className="flex font-mono">{jornada}</div>
              <div className="flex font-mono">{word}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArchivePanel;

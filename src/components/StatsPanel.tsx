import { useEffect, useState } from "react";
import { GOOGLE_SPREADSHEET_URL } from "../data/constants";
import { fetchGoogleSheet } from "../lib/requests";
import { mapStats } from "../lib/tools";
import Table from "./Table";
import CloseIcon from "./icons/CloseIcon";

interface PropsInterface {
  setIsStatsPanelOpen: (isStatsPanelOpen: boolean) => void;
}

const StatsPanel = ({ setIsStatsPanelOpen }: PropsInterface) => {
  const spreadsheetUrl: string = GOOGLE_SPREADSHEET_URL;

  interface Entry {
    jornada: string;
    word: string;
    attempts: number | null;
  }

  interface Result {
    [key: string]: Entry[];
  }

  const [mappedStats, setMappedStats] = useState<Result | null>(null);

  useEffect(() => {
    fetchGoogleSheet(spreadsheetUrl).then((data) => {
      const arr: Result = mapStats(data) as Result;

      setMappedStats(arr);
    });
  }, []);

  return (
    <div className="absolute inset-0 bg-white p-4">
      <header className="flex items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">Stats</h2>

        <button
          className="ml-auto"
          onClick={() => {
            setIsStatsPanelOpen(false);
          }}
        >
          <CloseIcon width="1.5rem" />
        </button>
      </header>

      {mappedStats && <Table data={mappedStats} />}
    </div>
  );
};

export default StatsPanel;

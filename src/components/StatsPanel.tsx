import { useEffect, useState } from "react";
import { GOOGLE_SPREADSHEET_URL } from "../data/constants";
import { fetchGoogleSheet } from "../lib/requests";
import { mapStats } from "../lib/tools";
import Table from "./Table";
import TableTopWords from "./TableTopWords";
import CloseIcon from "./icons/CloseIcon";

interface PropsInterface {
  setIsStatsPanelOpen: (isStatsPanelOpen: boolean) => void;
}

const StatsPanel = ({ setIsStatsPanelOpen }: PropsInterface) => {
  const spreadsheetUrl: string = GOOGLE_SPREADSHEET_URL;

  const [mappedStats, setMappedStats] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGoogleSheet(spreadsheetUrl).then((data) => {
      const stats: any = mapStats(data);

      setIsLoading(false);

      setMappedStats(stats);
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

      <main>
        {isLoading && <p>Loading...</p>}
        {mappedStats && (
          <div className="flex flex-col gap-8">
            <Table data={mappedStats} />

            <div className="flex justify-between">
              <TableTopWords data={mappedStats} title="Top words ⬇" />
              <TableTopWords data={mappedStats} reverse title="Top words ⬆" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StatsPanel;

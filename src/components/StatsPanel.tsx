import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/game";
import { GOOGLE_SPREADSHEET_URL } from "../data/constants";
import { fetchGoogleSheet } from "../lib/requests";
import { mapStats } from "../lib/tools";
import HeaderPanel from "./HeaderPanel";
import Panel from "./Panel";
import Table from "./Table";
import TableTopWords from "./TableTopWords";
import CloseIcon from "./icons/CloseIcon";

const StatsPanel = () => {
  const { setIsStatsPanelOpen } = useContext(GameContext);
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
    <Panel>
      <HeaderPanel name="Stats">
        <button
          onClick={() => {
            setIsStatsPanelOpen(false);
          }}
        >
          <CloseIcon width="1.5rem" />
        </button>
      </HeaderPanel>

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
    </Panel>
  );
};

export default StatsPanel;

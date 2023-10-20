import { useEffect, useState } from "react";
import { GOOGLE_SPREADSHEET_URL, PLAYERS } from "../data/constants";
import { DataInterface } from "../interfaces/interfaces";
import { fetchGoogleSheet } from "../lib/requests";
import { mapStats } from "../lib/tools";

export default function useArchivePanel() {
  const spreadsheetUrl: string = GOOGLE_SPREADSHEET_URL;
  const players: string[] = PLAYERS;

  const [mappedStats, setMappedStats] = useState<DataInterface>({});

  useEffect(() => {
    fetchGoogleSheet(spreadsheetUrl).then((data) => {
      const arr: DataInterface = mapStats(data) as DataInterface;

      setMappedStats(arr);
    });
  }, []);

  const [player, setPlayer] = useState("default");

  return { players, player, setPlayer, mappedStats };
}

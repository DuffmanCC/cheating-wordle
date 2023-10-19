import { useEffect, useState } from "react";
import { GOOGLE_SPREADSHEET_URL, PLAYERS } from "../data/constants";
import { fetchGoogleSheet } from "../lib/requests";
import { mapStats } from "../lib/tools";

export default function useArchivePanel() {
  const spreadsheetUrl: string = GOOGLE_SPREADSHEET_URL;
  const players: string[] = PLAYERS;

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
    fetchGoogleSheet(spreadsheetUrl).then((data) => {
      const arr: Result = mapStats(data) as Result;

      setMappedStats(arr);
    });
  }, []);

  const [player, setPlayer] = useState("default");

  return { players, player, setPlayer, mappedStats };
}

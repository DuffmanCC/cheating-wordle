import { useMemo } from "react";
import { STARTING_DATE } from "../data/constants";
import { DataInterface } from "../interfaces/interfaces";
import {
  daysUntilToday,
  getMonthsBetweenDates,
  media,
  rank,
} from "../lib/tools";

export default function useTopChamps(data: DataInterface) {
  const results: {
    month: string;
    playersRank1: string[];
  }[] = [];

  const startingDate = new Date(STARTING_DATE);

  // get all the months between the starting date and today
  const monthsBetweenDates = useMemo(
    () => getMonthsBetweenDates(startingDate).reverse(),
    [startingDate]
  );

  // get data without the jornada
  const dataWithoutJornada = useMemo(
    () => Object.keys(data).filter((player) => player !== "JORNADA"),
    [data]
  );

  const numberOfRounds = data.JORNADA.length;

  // loop through all the months
  monthsBetweenDates.forEach((monthObject) => {
    const daysFrom = daysUntilToday(monthObject.start, numberOfRounds);
    const daysTo = daysUntilToday(monthObject.end, numberOfRounds);

    // get the media of each player for every month
    const medias = dataWithoutJornada.map((player) => {
      const attempts = data[player]
        .map((item: any) => item.attempts)
        .slice(daysFrom, daysTo);

      return media(attempts);
    });

    results.push({
      month: `${monthObject.monthName}-${monthObject.monthYear}`,
      playersRank1: [],
    });

    // loop through all the players and get the rank
    Object.keys(data).forEach((player) => {
      const attempts = data[player]
        .map((item: any) => item.attempts)
        .slice(daysFrom, daysTo);

      if (rank(media(attempts), medias) === 1) {
        results[results.length - 1].playersRank1.push(player);
      }
    });
  });

  const mesesCampeones: { nombre: string; numeroMesesCampeon: number }[] = [];

  dataWithoutJornada.forEach((player) => {
    mesesCampeones.push({ nombre: player, numeroMesesCampeon: 0 });
    results.forEach((month) => {
      if (month.playersRank1.includes(player)) {
        mesesCampeones[mesesCampeones.length - 1].numeroMesesCampeon++;
      }
    });
  });

  mesesCampeones.sort((a, b) => b.numeroMesesCampeon - a.numeroMesesCampeon);

  return { mesesCampeones };
}

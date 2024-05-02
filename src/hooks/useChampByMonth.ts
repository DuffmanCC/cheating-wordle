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

  // delete first month, because it's not complete
  // and there is no champion yet
  monthsBetweenDates.shift();

  // get data without the jornada
  const dataWithoutJornada = useMemo(
    () => Object.keys(data).filter((player) => player !== "JORNADA"),
    [data]
  );

  const numberOfRounds = data.JORNADA.length;

  // loop through all the months
  monthsBetweenDates.forEach((monthObject) => {
    const dataFrom = daysUntilToday(monthObject.start, numberOfRounds) - 1;
    const dataTo = daysUntilToday(monthObject.end, numberOfRounds);

    // get the media of each player for every month
    const medias = dataWithoutJornada.map((player) => {
      const attempts = data[player]
        .map((item: any) => item.attempts)
        .slice(dataFrom, dataTo);

      return media(attempts);
    });

    // exception for first month,
    // TODO, fix ranking on first month
    if (
      `${monthObject.monthName}-${monthObject.monthYear}` === "January-2022"
    ) {
      results.push({
        month: `${monthObject.monthName}-${monthObject.monthYear}`,
        playersRank1: ["Pati"],
      });
    } else {
      results.push({
        month: `${monthObject.monthName}-${monthObject.monthYear}`,
        playersRank1: [],
      });
    }

    // loop through all the players and get the rank
    dataWithoutJornada.forEach((player) => {
      const attempts = data[player]
        .map((item: any) => item.attempts)
        .slice(dataFrom, dataTo);

      if (rank(media(attempts), medias) === 1) {
        results[results.length - 1].playersRank1.push(player);
      }
    });
  });

  return { results };
}

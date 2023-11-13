import { useEffect, useMemo, useState } from "react";
import {
  LAST_NUMBER_OF_ROUNDS_TO_SHOW,
  STARTING_DATE,
} from "../data/constants";
import {
  daysUntilToday,
  diffPlayer,
  drs,
  getFullWeeksStartingOnMondayBetweenDates,
  getMonthsBetweenDates,
  media,
  mediaAllJornadas,
  mediaPrev,
  rank,
  roundsPlayed,
  symbol,
} from "../lib/tools";

import { DataInterface } from "../interfaces/interfaces";

export default function useTable(data: DataInterface) {
  const numberOfRounds = data.JORNADA.length;

  const [numberOfRoundsToShow, setNumberOfRoundsToShow] = useState<number>(
    LAST_NUMBER_OF_ROUNDS_TO_SHOW
  );
  const [week, setWeek] = useState<number>(0);
  const [month, setMonth] = useState<string>("0");
  const [from, setFrom] = useState<number>(-1 * numberOfRoundsToShow);
  const [dataFrom, setDataFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(numberOfRounds);
  const [dataTo, setDataTo] = useState<number>(numberOfRounds);
  const [isPeriod, setIsPeriod] = useState<boolean>(false);

  const dataWithoutJornada = useMemo(
    () => Object.keys(data).filter((player) => player !== "JORNADA"),
    [data]
  );

  const medias = useMemo(
    () =>
      dataWithoutJornada.map((player) => {
        const attempts = data[player]
          .map((item: any) => item.attempts)
          .slice(dataFrom, dataTo);

        return media(attempts);
      }),
    [data, dataFrom, dataTo]
  );

  const mediasPrev = useMemo(
    () =>
      dataWithoutJornada.map((player) =>
        mediaPrev(
          data[player].map((item: any) => item.attempts).slice(dataFrom, dataTo)
        )
      ),
    [data, dataFrom, dataTo]
  );

  const players = useMemo(
    () =>
      dataWithoutJornada.map((player) => {
        const attempts = data[player]
          .map((item: any) => item.attempts)
          .slice(dataFrom, dataTo);

        return {
          name: player,
          media: media(attempts),
          mediaPrev: mediaPrev(attempts),
          rank: rank(media(attempts), medias),
          rankPrev: rank(mediaPrev(attempts), mediasPrev),
          symbol: symbol(
            rank(mediaPrev(attempts), mediasPrev),
            rank(media(attempts), medias)
          ),
          roundsPlayed: roundsPlayed(attempts),
          attempts: attempts,
          diff: null,
          drs: null,
        };
      }),
    [data, medias, mediasPrev, dataFrom, dataTo]
  );

  const mediaAllJornadasArr = useMemo(() => mediaAllJornadas(data), [data]);

  players.forEach((player: any) => {
    player.diff = diffPlayer(players, player.rank);
  });

  players.forEach((player: any) => {
    player.drs = drs(players, player.rank);
  });

  players.sort((a: any, b: any) => a.media - b.media);

  const startingDate = new Date(STARTING_DATE);

  const weeksBetweenDates = useMemo(
    () => getFullWeeksStartingOnMondayBetweenDates(startingDate).reverse(),
    [startingDate]
  );

  const monthsBetweenDates = useMemo(
    () => getMonthsBetweenDates(startingDate).reverse(),
    [startingDate]
  );

  useEffect(() => {
    if (!week) return;

    const from = weeksBetweenDates.filter(
      (weekObject) => weekObject.weekNumber === week
    )[0].start;

    const to = weeksBetweenDates.filter(
      (weekObject) => weekObject.weekNumber === week
    )[0].end;

    const daysFrom = daysUntilToday(from, numberOfRounds);
    const daysTo = daysUntilToday(to, numberOfRounds);

    setFrom(daysFrom - 1);
    setDataFrom(daysFrom - 1);
    setTo(daysTo);
    setDataTo(daysTo);
    setMonth("0");
    setIsPeriod(true);
  }, [week]);

  useEffect(() => {
    if (!month) return;

    if (month === "0") {
      setFrom(-1 * numberOfRoundsToShow);
      setDataFrom(0);
      setTo(data.JORNADA.length);
      setDataTo(data.JORNADA.length);
      setWeek(0);
      return;
    }

    if (month === "January-2022") {
      setFrom(0);
      setDataFrom(0);
      setTo(21);
      setDataTo(21);
    } else {
      const from = monthsBetweenDates.filter(
        (monthObject) =>
          `${monthObject.monthName}-${monthObject.monthYear}` === month
      )[0].start;

      const to = monthsBetweenDates.filter(
        (monthObject) =>
          `${monthObject.monthName}-${monthObject.monthYear}` === month
      )[0].end;

      const daysFrom = daysUntilToday(from, numberOfRounds);
      const daysTo = daysUntilToday(to, numberOfRounds);

      setFrom(daysFrom - 1);
      setDataFrom(daysFrom - 1);
      setTo(daysTo);
      setDataTo(daysTo);
    }

    setWeek(0);
    setIsPeriod(true);
  }, [month]);

  useEffect(() => {
    if (isPeriod) return;

    setFrom(-1 * numberOfRoundsToShow);
    setTo(data.JORNADA.length);
    setDataFrom(0);
    setDataTo(data.JORNADA.length);
    setWeek(0);
    setMonth("0");
  }, [isPeriod, numberOfRoundsToShow]);

  return {
    from,
    to,
    setWeek,
    setMonth,
    week,
    month,
    weeksBetweenDates,
    monthsBetweenDates,
    mediaAllJornadasArr,
    players,
    isPeriod,
    setIsPeriod,
    numberOfRoundsToShow,
    setNumberOfRoundsToShow,
  };
}

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

import { Player } from "../interfaces/interfaces";

import { DataInterface } from "../interfaces/interfaces";

export default function useTable(data: DataInterface) {
  const numberOfRounds = data.JORNADA.length;

  const [numberOfRoundsToShow, setNumberOfRoundsToShow] = useState<number>(
    LAST_NUMBER_OF_ROUNDS_TO_SHOW
  );

  const currentDate = new Date();
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    currentDate
  );
  const year = currentDate.getFullYear();
  const formattedDate = `${monthName}-${year}`;

  const [week, setWeek] = useState<number>(0);
  const [month, setMonth] = useState<string>(formattedDate);
  const [from, setFrom] = useState<number>(-1 * numberOfRoundsToShow);
  const [dataFrom, setDataFrom] = useState<number>(719);
  const [to, setTo] = useState<number>(numberOfRounds);
  const [dataTo, setDataTo] = useState<number>(numberOfRounds);
  const [isPeriod, setIsPeriod] = useState<boolean>(true);

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
      dataWithoutJornada.map((player) => {
        const attempts = data[player]
          .map((item: any) => item.attempts)
          .slice(dataFrom, dataTo);

        return mediaPrev(attempts);
      }),
    [data, dataFrom, dataTo]
  );

  const players = useMemo(
    () =>
      dataWithoutJornada.map((player) => {
        const attempts = data[player]
          .map((item: any) => item.attempts)
          .slice(dataFrom, dataTo);

        const mediaValue: number = media(attempts);
        const mediaPrevValue: number = mediaPrev(attempts);

        return {
          name: player,
          media: media(attempts),
          mediaPrev: mediaPrev(attempts),
          rank: rank(mediaValue, medias),
          rankPrev: rank(mediaPrevValue, mediasPrev),
          symbol: symbol(
            rank(mediaPrevValue, mediasPrev),
            rank(mediaValue, medias)
          ),
          roundsPlayed: roundsPlayed(attempts),
          attempts: attempts,
          diff: null,
          drs: null,
        };
      }),
    [data, dataFrom, dataTo, medias, mediasPrev]
  );

  const mediaAllJornadasArr = useMemo(() => mediaAllJornadas(data), [data]);

  players.forEach((player: Player) => {
    const diff = diffPlayer(players, player.rank);

    player.diff = isNaN(diff) ? 0 : diff;
  });

  players.forEach((player: Player) => {
    const Drs = drs(players, player.rank);

    player.drs = isNaN(Drs) ? 0 : Drs;
  });

  players.sort((a: Player, b: Player) => a.rank - b.rank);

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

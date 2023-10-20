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

  const [week, setWeek] = useState<number>(0);
  const [month, setMonth] = useState<string>("0");
  const [from, setFrom] = useState<number>(-7);
  const [mediaFrom, setMediaFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(data.JORNADA.length);
  const [mediaTo, setMediaTo] = useState<number>(numberOfRounds);
  const [isPeriod, setIsPeriod] = useState<boolean>(false);

  const dataWithoutJornada = useMemo(
    () => Object.keys(data).filter((player) => player !== "JORNADA"),
    [data]
  );

  const medias = dataWithoutJornada.map((player) => {
    const attempts = data[player].map((item: any) => item.attempts);

    return media(attempts);
  });

  const mediasPeriod = dataWithoutJornada.map((player) => {
    const attempts = data[player].map((item: any) => item.attempts);

    return media(attempts.slice(mediaFrom, mediaTo));
  });

  const mediasPrev = dataWithoutJornada.map((player) =>
    mediaPrev(data[player].map((item: any) => item.attempts))
  );

  const players = dataWithoutJornada.map((player) => {
    const attempts = data[player].map((item: any) => item.attempts);
    const attemptsPeriod = attempts.slice(mediaFrom, mediaTo);

    return {
      name: player,
      media: media(attempts),
      mediaPeriod: media(attemptsPeriod),
      mediaPrev: mediaPrev(attempts),
      rank: rank(media(attempts), medias),
      rankPeriod: rank(media(attemptsPeriod), mediasPeriod),
      rankPrev: rank(mediaPrev(attempts), mediasPrev),
      symbol: symbol(
        rank(mediaPrev(attempts), mediasPrev),
        rank(media(attempts), medias)
      ),
      roundsPlayed: roundsPlayed(attempts),
      roundsPlayedPeriod: roundsPlayed(attemptsPeriod),
      attempts: attempts,
      diff: null,
      drs: null,
    };
  });

  const mediaAllJornadasArr = mediaAllJornadas(data);

  players.forEach((player: any) => {
    player.diff = diffPlayer(players, player.rank);
  });

  players.forEach((player: any) => {
    player.drs = drs(players, player.rank);
  });

  if (isPeriod) {
    players.sort((a: any, b: any) => a.mediaPeriod - b.mediaPeriod);
  } else {
    players.sort((a: any, b: any) => a.media - b.media);
  }

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
    setMediaFrom(daysFrom - 1);
    setTo(daysTo);
    setMediaTo(daysTo);
    setMonth("0");
    setIsPeriod(true);
  }, [week]);

  useEffect(() => {
    if (!month) return;

    if (month === "0") {
      setFrom(LAST_NUMBER_OF_ROUNDS_TO_SHOW);
      setTo(data.JORNADA.length);
      setWeek(0);
      return;
    }

    if (month === "January-2022") {
      setFrom(0);
      setMediaFrom(0);
      setTo(21);
      setMediaTo(21);
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
      setMediaFrom(daysFrom - 1);
      setTo(daysTo);
      setMediaTo(daysTo);
    }

    setWeek(0);
    setIsPeriod(true);
  }, [month]);

  useEffect(() => {
    if (!isPeriod) {
      setFrom(LAST_NUMBER_OF_ROUNDS_TO_SHOW);
      setTo(data.JORNADA.length);
      setWeek(0);
      setMonth("0");
    }
  }, [isPeriod]);

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
  };
}

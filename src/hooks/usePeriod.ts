import { useEffect, useMemo, useState } from "react";
import { STARTING_DATE } from "../data/constants";
import {
  daysUntilToday,
  getFullWeeksStartingOnMondayBetweenDates,
  getMonthsBetweenDates,
} from "../lib/tools";

import { DataInterface } from "../interfaces/interfaces";

export default function usePeriod(data: DataInterface, numberOfRounds: number) {
  const [week, setWeek] = useState<number>(0);
  const [month, setMonth] = useState<string>("0");
  const [from, setFrom] = useState<number>(-7);
  const [to, setTo] = useState<number>(data.JORNADA.length);

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

    setFrom(daysFrom);
    setTo(daysTo + 1);
    setMonth("0");
  }, [week]);

  useEffect(() => {
    if (!month) return;

    if (month === "0") {
      setFrom(-7);
      setTo(data.JORNADA.length);
      setWeek(0);
      return;
    }

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

    setFrom(daysFrom);
    setTo(daysTo + 1);
    setWeek(0);
  }, [month]);

  return { from, to, setWeek, setMonth, weeksBetweenDates, monthsBetweenDates };
}

import {
  arrowColor,
  bgDrsColor,
  daysUntilToday,
  diffPlayer,
  drs,
  getFullWeeksStartingOnMondayBetweenDates,
  getMonthsBetweenDates,
  media,
  mediaPrev,
  roundsPlayed,
} from "../lib/tools";

import { useEffect, useState } from "react";
import { STARTING_DATE } from "../data/constants";
import { bgColorFromAttemps, rank, symbol } from "../lib/tools";

interface Player {
  jornada: string;
  word: string;
  attempts: number | null;
}

interface Props {
  data: {
    [key: string]: Player[];
  };
}

const Table = ({ data }: Props) => {
  const medias = Object.keys(data)
    .filter((player) => player !== "JORNADA")
    .map((player) => media(data[player].map((item: any) => item.attempts)));

  const mediasPrev = Object.keys(data)
    .filter((player) => player !== "JORNADA")
    .map((player) => mediaPrev(data[player].map((item: any) => item.attempts)));

  const players = Object.keys(data)
    .filter((player) => player !== "JORNADA")
    .map((player) => {
      const attempts = data[player].map((item: any) => item.attempts);

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
    });

  players.forEach((player: any) => {
    player.diff = diffPlayer(players, player.rank);
  });

  players.forEach((player: any) => {
    player.drs = drs(players, player.rank);
  });

  players.sort((a: any, b: any) => a.media - b.media);

  const startingDate = new Date(STARTING_DATE);
  const currentDate = new Date();

  const weeksBetweenDates = getFullWeeksStartingOnMondayBetweenDates(
    startingDate,
    currentDate
  );

  const monthsBetweenDates = getMonthsBetweenDates(startingDate);

  const [week, setWeek] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [from, setFrom] = useState<number>(-7);
  const [to, setTo] = useState<number>(data.JORNADA.length);

  useEffect(() => {
    if (!week) return;

    setFrom(daysUntilToday(weeksBetweenDates[week].start, data.JORNADA.length));
    setTo(daysUntilToday(weeksBetweenDates[week].end, data.JORNADA.length));
    setMonth(null);
    console.log("week changed");
  }, [week]);

  useEffect(() => {
    if (!month) return;

    setFrom(
      daysUntilToday(monthsBetweenDates[month].start, data.JORNADA.length)
    );
    setTo(daysUntilToday(monthsBetweenDates[month].end, data.JORNADA.length));
    setWeek(null);
    console.log("month changed");
  }, [month]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-4 flex-col items-start">
        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setWeek(Number(e.target.value))}
        >
          <option value="" selected={week === null ? true : false}>
            {week ?? "Select week"}
          </option>

          {weeksBetweenDates.map(({ weekNumber }, index) => {
            return (
              <option
                value={index}
                key={index}
                selected={week === weekNumber ? true : false}
              >
                Week - {weekNumber}
              </option>
            );
          })}
        </select>

        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value="" selected={month === null ? true : false}>
            {month ?? "Select month"}
          </option>

          {monthsBetweenDates.map(({ monthName, monthYear }, index) => {
            return (
              <option
                value={index}
                key={index}
                selected={month === index ? true : false}
              >
                {monthName} - {monthYear}
              </option>
            );
          })}
        </select>
      </div>

      <div className="inline-block py-1 overflow-auto">
        <table className="text-sm font-light">
          <thead className="border-b font-medium">
            <tr>
              <th scope="col" className="px-2 py-1"></th>
              <th scope="col" className="px-2 py-1 text-left">
                Player
              </th>
              {data.JORNADA.slice(from, to).map((item: any) => (
                <td
                  scope="col"
                  className="px-2 py-1 text-right"
                  key={item.jornada}
                >
                  {item.jornada}
                </td>
              ))}
              <th scope="col" className="px-2 py-1 text-right">
                Media
              </th>
              <th scope="col" className="px-2 py-1 text-right"></th>
              <th scope="col" className="px-2 py-1 text-right">
                PJ
              </th>
              <th scope="col" className="px-2 py-1 text-right">
                Diff
              </th>
              <th scope="col" className="px-2 py-1 text-right">
                DRS
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((playerData, index) => (
              <tr className="border-b" key={index}>
                <td className="px-2 py-1 text-right">{playerData.rank}</td>
                <td className="px-2 py-1">{playerData.name}</td>
                {data[playerData.name].slice(from, to).map((item: any) => (
                  <td
                    className={[
                      bgColorFromAttemps(item.attempts),
                      "px-2 py-1 text-right border-white border",
                    ].join(" ")}
                    key={item.jornada}
                  >
                    {item.attempts}
                  </td>
                ))}
                <td className="px-2 py-1 text-right">{playerData.media}</td>
                <td
                  className={[
                    "px-2 py-1 text-right",
                    arrowColor(playerData.symbol),
                  ].join(" ")}
                >
                  {playerData.symbol}
                </td>
                <td className="px-2 py-1 text-right">
                  {playerData.roundsPlayed}
                </td>
                <td className="px-2 py-1 text-right">{playerData.diff}</td>
                <td
                  className={[
                    bgDrsColor(playerData.drs),
                    "px-2 py-1 text-right",
                  ].join(" ")}
                >
                  {playerData.drs}
                </td>
              </tr>
            ))}

            <tr className="border-b">
              <td className="px-2 py-1 text-right"></td>
              <td className="px-2 py-1">Jornada</td>
              {data.JORNADA.slice(from, to).map((item: any) => (
                <td
                  className="px-2 py-1 text-right font-mono"
                  key={item.jornada}
                >
                  {item.word}
                </td>
              ))}
              <td className="px-2 py-1 text-right"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

import {
  arrowColor,
  bgDrsColor,
  diffPlayer,
  drs,
  media,
  mediaAllJornadas,
  mediaPrev,
  roundsPlayed,
} from "../lib/tools";

import usePeriod from "../hooks/usePeriod";
import { bgColorFromAttemps, rank, symbol } from "../lib/tools";

interface Player {
  jornada: string;
  word: string;
  attempts: number | null;
}

interface Data {
  [key: string]: Player[];
}

interface Props {
  data: Data;
}

const Table = ({ data }: Props) => {
  const numberOfRounds = data.JORNADA.length;

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

  const mediaAllJornadasArr = mediaAllJornadas(data);

  players.sort((a: any, b: any) => a.media - b.media);

  players.forEach((player: any) => {
    player.diff = diffPlayer(players, player.rank);
  });

  players.forEach((player: any) => {
    player.drs = drs(players, player.rank);
  });

  players.sort((a: any, b: any) => a.media - b.media);

  const { from, to, setWeek, setMonth, weeksBetweenDates, monthsBetweenDates } =
    usePeriod(data, numberOfRounds);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-4 flex-col items-start">
        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setWeek(Number(e.target.value))}
          defaultValue={0}
        >
          <option value={0} disabled hidden>
            Select week
          </option>

          {weeksBetweenDates.map(({ weekNumber }) => {
            return (
              <option value={weekNumber} key={weekNumber}>
                Week - {weekNumber}
              </option>
            );
          })}
        </select>

        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setMonth(e.target.value)}
          defaultValue={0}
        >
          <option value={0} disabled hidden>
            Select month
          </option>

          {monthsBetweenDates.map(({ monthName, monthYear }) => {
            return (
              <option
                value={`${monthName}-${monthYear}`}
                key={`${monthName}-${monthYear}`}
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
              <th scope="col"></th>
              <th scope="col"></th>
              {data.JORNADA.slice(from, to).map((item: any) => (
                <th
                  scope="col"
                  className="py-1 text-right text-2xs"
                  key={item.jornada}
                >
                  {item.date}
                </th>
              ))}
            </tr>

            <tr>
              <th scope="col" className="px-2 py-1"></th>
              <th scope="col" className="px-2 py-1 text-left">
                Player
              </th>
              {data.JORNADA.slice(from, to).map((item: any) => (
                <th
                  scope="col"
                  className="px-2 py-1 text-right"
                  key={item.jornada}
                >
                  {item.jornada}
                </th>
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
                <td className="px-2 py-1 text-right font-mono">
                  {playerData.media.toFixed(4)}
                </td>
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
          </tbody>

          <tfoot>
            <tr className="border-b">
              <td></td>
              <td className="px-2 py-1 text-right">Jornada</td>
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

            <tr>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 text-right">Media</td>
              {mediaAllJornadasArr.slice(from, to).map((item: any) => (
                <td className="px-2 py-1 text-right" key={item.jornada}>
                  {item.mediaJornada.toFixed(3)}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;

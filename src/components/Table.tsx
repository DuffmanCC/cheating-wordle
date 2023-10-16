import { LAST_NUMBER_OF_ROUNDS_TO_SHOW } from "../data/constants";

import {
  arrowColor,
  bgDrsColor,
  diffPlayer,
  drs,
  media,
  mediaPrev,
  roundsPlayed,
} from "../lib/tools";

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
  const lastRounds: number = LAST_NUMBER_OF_ROUNDS_TO_SHOW;

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

  players.sort((a: any, b: any) => a.media - b.media);

  players.forEach((player: any) => {
    player.diff = diffPlayer(players, player.rank);
  });

  players.forEach((player: any) => {
    player.drs = drs(players, player.rank);
  });

  return (
    <div className="flex flex-col">
      <div className="inline-block py-1 overflow-auto">
        <table className="text-sm font-light">
          <thead className="border-b font-medium">
            <tr>
              <th scope="col" className="px-2 py-1 text-right">
                #
              </th>
              <th scope="col" className="px-2 py-1">
                Player
              </th>
              {data["JORNADA"].slice(lastRounds).map((item: any) => (
                <td className="px-2 py-1 text-right" key={item.jornada}>
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
            {players.map((playerData) => (
              <tr className="border-b" key={playerData.name}>
                <td className="px-2 py-1 text-right">{playerData.rank}</td>
                <td className="px-2 py-1">{playerData.name}</td>
                {data[playerData.name].slice(lastRounds).map((item: any) => (
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
              {data["JORNADA"].slice(lastRounds).map((item: any) => (
                <td className="px-2 py-1 text-right" key={item.jornada}>
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

import useTable from "../hooks/useTable";
import { DataInterface } from "../interfaces/interfaces";
import { arrowColor, bgColorFromAttemps, bgDrsColor } from "../lib/tools";
import TableFilters from "./TableFilters";

interface PropsInterface {
  data: DataInterface;
}

const Table = ({ data }: PropsInterface) => {
  const {
    from,
    to,
    mediaAllJornadasArr,
    players,
    isPeriod,
    setWeek,
    setMonth,
    weeksBetweenDates,
    monthsBetweenDates,
    setIsPeriod,
    numberOfRoundsToShow,
    setNumberOfRoundsToShow,
  } = useTable(data);

  return (
    <div className="flex flex-col">
      <TableFilters
        setWeek={setWeek}
        setMonth={setMonth}
        weeksBetweenDates={weeksBetweenDates}
        monthsBetweenDates={monthsBetweenDates}
        isPeriod={isPeriod}
        setIsPeriod={setIsPeriod}
        numberOfRoundsToShow={numberOfRoundsToShow}
        setNumberOfRoundsToShow={setNumberOfRoundsToShow}
      />

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
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
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
              <th scope="col" className="px-2 py-1 text-right">
                Player
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
                  {isNaN(playerData.media) ? 0 : playerData.media.toFixed(4)}
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

                <td className="px-2 py-1 text-right">{playerData.name}</td>
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

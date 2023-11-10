import { Dispatch, SetStateAction } from "react";
import { MonthInterface, WeekInterface } from "../interfaces/interfaces";

interface PropsInterface {
  setWeek: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<string>>;
  weeksBetweenDates: WeekInterface[];
  monthsBetweenDates: MonthInterface[];
  isPeriod: boolean;
  setIsPeriod: Dispatch<SetStateAction<boolean>>;
}

export default function TableFilters({
  setWeek,
  setMonth,
  weeksBetweenDates,
  monthsBetweenDates,
  isPeriod,
  setIsPeriod,
}: PropsInterface) {
  return (
    <div className="flex gap-4 mb-4 flex-col items-start">
      {isPeriod && (
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
      )}
      {isPeriod && (
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
      )}

      <button
        className="px-2 py-1 border rounded-md"
        onClick={() => setIsPeriod(!isPeriod)}
      >
        {isPeriod ? "All" : "By period"}
      </button>
    </div>
  );
}

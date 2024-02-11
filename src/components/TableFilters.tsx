import { Dispatch, SetStateAction } from "react";
import { MonthInterface, WeekInterface } from "../interfaces/interfaces";

interface PropsInterface {
  setWeek: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<string>>;
  weeksBetweenDates: WeekInterface[];
  monthsBetweenDates: MonthInterface[];
  isPeriod: boolean;
  setIsPeriod: Dispatch<SetStateAction<boolean>>;
  numberOfRoundsToShow: number;
  setNumberOfRoundsToShow: Dispatch<SetStateAction<number>>;
}

export default function TableFilters({
  setWeek,
  setMonth,
  weeksBetweenDates,
  monthsBetweenDates,
  isPeriod,
  setIsPeriod,
  numberOfRoundsToShow,
  setNumberOfRoundsToShow,
}: PropsInterface) {
  return (
    <div className="flex gap-4 mb-4 flex-col items-start">
      {isPeriod && (
        <select
          className="border px-4 py-2 rounded-md"
          onChange={(e) => setMonth(e.target.value)}
        >
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

      {!isPeriod && (
        <label className="flex gap-2 items-center">
          <div>Number of rounds to show:</div>

          {numberOfRoundsToShow}

          <button
            onClick={() => {
              if (numberOfRoundsToShow >= 31) return;

              setNumberOfRoundsToShow(numberOfRoundsToShow + 1);
            }}
            className="flex justify-center items-center w-8 h-8 border rounded-md"
          >
            +
          </button>

          <button
            onClick={() => {
              if (numberOfRoundsToShow <= 3) return;

              setNumberOfRoundsToShow(numberOfRoundsToShow - 1);
            }}
            className="flex justify-center items-center w-8 h-8 border rounded-md"
          >
            -
          </button>
        </label>
      )}
    </div>
  );
}

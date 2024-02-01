import { expect, test } from "vitest";
import { getMonthsBetweenDates } from "../src/lib/tools";

test("getMonthsBetweenDates", () => {
  const date1 = new Date("2024-01-04");

  expect(getMonthsBetweenDates(date1).length).toBe(2);

  const date2 = new Date("2023-04-04");

  expect(getMonthsBetweenDates(date2).length).toBe(11);
});

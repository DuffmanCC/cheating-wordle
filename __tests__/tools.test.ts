import { expect, test } from "vitest";
import { getMonthsBetweenDates, media } from "../src/lib/tools";

test("getMonthsBetweenDates", () => {
  expect(getMonthsBetweenDates(new Date("2024-01-04")).length).toBe(2);
  expect(getMonthsBetweenDates(new Date("2024-01-12")).length).toBe(2);
  expect(getMonthsBetweenDates(new Date("2023-04-04")).length).toBe(11);
  expect(getMonthsBetweenDates(new Date("2022-01-11")).length).toBe(26);
});

test("media", () => {
  expect(media([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
  expect(media([3, 4])).toBe(3.5);
  expect(media([])).toBe(0);
  expect(media([4])).toBe(4);
});

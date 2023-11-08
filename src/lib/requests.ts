export const fetchGoogleSheet = async (url: string) => {
  try {
    const response = await fetch(url);
    // Fetch the data
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const rawData = await response.text();

    const rows = rawData.split("\n");

    let rowsArr: string[][] = [];

    let jornadaRow = rows[12].split(",");
    jornadaRow = jornadaRow.slice(2, jornadaRow.length);
    const lastColumn = jornadaRow.findIndex((value) => value === "");

    for (let i = 3; i < 13; i++) {
      let arr = rows[i].split(",");
      arr = arr.slice(2, arr.length);
      arr = arr.slice(0, lastColumn);
      rowsArr.push(arr);
    }

    return rowsArr;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
};

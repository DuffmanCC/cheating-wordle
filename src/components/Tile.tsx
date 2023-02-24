interface Props {
  letter: string;
  tileIndex: number;
  rowIndex: number;
  activeRow: number;
  getClick: Function;
  isActive: Boolean;
}

export default function Tile(
  { letter, tileIndex, rowIndex, activeRow, getClick, isActive }: Props,
  key: number
) {
  function handleClick() {
    if (rowIndex !== activeRow) return;

    getClick(tileIndex, rowIndex);
  }

  let classes =
    "mx-1 w-16 h-16 | text-2xl font-bold capitalize | rounded border-2 | flex items-center justify-center";

  return (
    <div
      onClick={handleClick}
      className={isActive ? `border-blue-500 ${classes}` : `${classes}`}
    >
      {letter}
    </div>
  );
}

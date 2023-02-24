export default function Board() {
  return (
    <div className="mb-12">
      {Array(6)
        .fill(null)
        .map((el, rowIndex) => (
          <div key={rowIndex} className="flex my-2 mx-auto justify-center">
            {Array(5)
              .fill(null)
              .map((el, tileIndex) => (
                <div className="mx-1 w-16 h-16 | text-2xl font-bold capitalize | rounded border-2 | flex items-center justify-center"></div>
              ))}
          </div>
        ))}
    </div>
  );
}

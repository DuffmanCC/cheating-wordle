import { DataInterface } from "../interfaces/interfaces";
import { mediaAllJornadas } from "../lib/tools";

interface PropsInterface {
  data: DataInterface;
  reverse?: boolean;
  title?: string;
}

const tableTopWords = ({ data, reverse, title }: PropsInterface) => {
  const mediaAllJornadasArr = mediaAllJornadas(data);

  const mediaAllJornadasSortedByMedia = [...mediaAllJornadasArr].sort(
    (a: any, b: any) => a.mediaJornada - b.mediaJornada
  );

  if (reverse) {
    mediaAllJornadasSortedByMedia.reverse();
  }

  return (
    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-72">
      {title && <caption className="py-2 text-lg">{title}</caption>}

      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            Word
          </th>
          <th scope="col" className="px-4 py-3">
            Media
          </th>
        </tr>
      </thead>

      <tbody>
        {mediaAllJornadasSortedByMedia.slice(0, 10).map((item: any) => (
          <tr
            key={item.jornada}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.word}
            </td>
            <td className="px-4 py-2 ">{item.mediaJornada.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default tableTopWords;

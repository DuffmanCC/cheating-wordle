import { mediaAllJornadas } from "../lib/tools";

interface Player {
  jornada: string;
  word: string;
  attempts: number | null;
}

interface Data {
  [key: string]: Player[];
}

interface Props {
  data: Data;
  reverse?: boolean;
  title?: string;
}

const tableTopWords = ({ data, reverse, title }: Props) => {
  const mediaAllJornadasArr = mediaAllJornadas(data);

  const mediaAllJornadasSortedByMedia = [...mediaAllJornadasArr].sort(
    (a: any, b: any) => a.mediaJornada - b.mediaJornada
  );

  if (reverse) {
    mediaAllJornadasSortedByMedia.reverse();
  }

  return (
    <table>
      {title && <caption>{title}</caption>}

      <thead>
        <tr>
          <th scope="col" className="text-left font-normal px-2">
            Word
          </th>
          <th scope="col" className="text-left font-normal px-2">
            Media
          </th>
        </tr>
      </thead>

      <tbody className="font-thin">
        {mediaAllJornadasSortedByMedia.slice(0, 10).map((item: any) => (
          <tr key={item.jornada}>
            <td className="px-2">{item.word}</td>
            <td className="text-right px-2">{item.mediaJornada.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default tableTopWords;

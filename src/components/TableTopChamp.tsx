import useTopChamps from "../hooks/useTopChamps";
import { DataInterface } from "../interfaces/interfaces";

interface PropsInterface {
  data: DataInterface;
}

export default function TableTopChamp({ data }: PropsInterface) {
  const { mesesCampeones } = useTopChamps(data);

  return (
    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-w-xs w-72">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Player
          </th>
          <th scope="col" className="px-6 py-3">
            Month champion
          </th>
        </tr>
      </thead>
      <tbody>
        {mesesCampeones.map((mes) => (
          <tr
            key={mes.nombre}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td
              scope="row"
              className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {mes.nombre}
            </td>
            <td className="px-6 py-3">{mes.numeroMesesCampeon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

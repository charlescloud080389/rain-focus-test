import React from 'react';
import { TableProps } from '../types/Table';

const Table = <T,>({ columns, data, keyField }: TableProps<T>): React.ReactElement => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row[keyField as keyof T] as string}
              className="border-b hover:bg-gray-50 transition"
            >
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="px-4 py-2 text-sm text-gray-600"
                >
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : (row[column.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
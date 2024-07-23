import { Td, Tr } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

export default function TableRow({ row }) {
  return (
    <>
      <Tr>
        {row.getVisibleCells().map((cell) => {
          return (
            <Td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          );
        })}
      </Tr>
    </>
  );
}

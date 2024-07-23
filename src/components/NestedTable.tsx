import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useTableData from "./useTableData.tsx";

export default function NestedTable({ row, table }) {
  const { serviceColumns } = useTableData();

  return (
    <TableContainer style={{ display: "flex", justifyContent: "center" }}>
      <Table
        width="inherit"
        variant="simple"
        style={{
          overflow: "auto",
        }}
      >
        <Thead>
          <Tr>
            {serviceColumns.map((column) => {
              return (
                <Th key={column.id}>
                  {typeof column.header === "string" && column.header}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {row.original.service.map((service) => (
            <Tr key={service.id}>
              {serviceColumns.map((col) => (
                <Td key={col.id}>{service[col.id]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

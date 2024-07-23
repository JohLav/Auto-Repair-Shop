import useTableData from "./useTableData.tsx";
import { Customer } from "../data/types.ts";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fuzzyFilter } from "../utils/Table.utils.ts";
import {
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ColumnVisibilitySelector from "./ColumnVisibilitySelector.tsx";
import TableHeader from "./TableHeader.tsx";
import TableRow from "./TableRow.tsx";
import Pagination from "./Pagination.tsx";
import { Fragment } from "react";
import NestedTable from "./NestedTable.tsx";

export default function TableComp() {
  const { data, customerColumns, columnIds, initialColumnVisibility } =
    useTableData();

  const table = useReactTable<Customer>({
    data: data,
    columns: customerColumns,
    enableSubRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    getRowCanExpand: () => true,
    initialState: {
      columnVisibility: initialColumnVisibility,
    },
  });

  return (
    <>
      <Flex direction="column" width="100vw" gap="1.5rem" p={2} grow={1}>
        <Flex alignItems="center" m={5}>
          <Input
            ml={2}
            size="md"
            placeholder="Search"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
          <ColumnVisibilitySelector table={table} columnIds={columnIds} />
        </Flex>
        <TableContainer>
          <Table variant="simple" style={{ overflow: "auto" }}>
            <Thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHeader key={header.id} header={header} />
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow row={row} />
                  {row.getIsExpanded() && (
                    <Tr>
                      <Td colSpan={row.getVisibleCells().length}>
                        <NestedTable key={row.id} row={row} table={table} />
                      </Td>
                    </Tr>
                  )}
                </Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination table={table} />
      </Flex>
    </>
  );
}

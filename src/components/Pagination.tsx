import { Table } from "@tanstack/react-table";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import { Customer } from "../data/types.ts";

export default function Pagination({ table }: { table: Table<Customer> }) {
  return (
    <Flex gap={2} m={5} alignItems="center" justifyContent="center">
      <IconButton
        aria-label="First page"
        icon={<FaAnglesLeft />}
        size="sm"
        onClick={() => table.firstPage()}
        isDisabled={!table.getCanPreviousPage()}
      />
      <IconButton
        aria-label="Prev page"
        icon={<FaAngleLeft />}
        size="sm"
        onClick={() => table.previousPage()}
        isDisabled={!table.getCanPreviousPage()}
      />
      <Text fontSize="s">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </Text>
      <IconButton
        aria-label="Next page"
        icon={<FaAngleRight />}
        size="sm"
        onClick={() => table.nextPage()}
        isDisabled={!table.getCanNextPage()}
      />
      <IconButton
        aria-label="Last page"
        icon={<FaAnglesRight />}
        size="sm"
        onClick={() => table.lastPage()}
        isDisabled={!table.getCanNextPage()}
      />
    </Flex>
  );
}

import { useEffect, useMemo, useState } from "react";
import { ColumnHelper, createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Flex, IconButton } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import moment from "moment";
import { Customer, Service } from "../data/types.ts";
import fetchCustomers from "../api/mockApi.ts";

export default function useTableData() {
  const [data, setData] = useState<Customer[]>([]);

  useEffect(() => {
    const getData = async () => {
      const customers: Customer[] = await fetchCustomers();
      setData(customers);
    };
    getData();
  }, []);

  const DISPLAY_COLUMN_SIZE = 100;

  const customerColumnHelper: ColumnHelper<Customer> =
    createColumnHelper<Customer>();

  const customerColumns = useMemo(
    () => [
      customerColumnHelper.display({
        id: "selection",
        header: ({ table }) => (
          <Flex justifyContent="center" alignItems="center">
            <Checkbox
              isChecked={table.getIsAllRowsSelected()}
              isIndeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Flex>
        ),
        cell: ({ row }) => (
          <Flex justifyContent="center" alignItems="center">
            <Checkbox
              onChange={row.getToggleSelectedHandler()}
              isChecked={row.getIsSelected()}
            />
          </Flex>
        ),
        size: DISPLAY_COLUMN_SIZE,
      }),
      customerColumnHelper.display({
        id: "expand",
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <Flex justifyContent={"center"} alignItems="center">
              <IconButton
                aria-label="Expand row"
                icon={row.getIsExpanded() ? <FaMinus /> : <FaPlus />}
                size="xs"
                onClick={row.getToggleExpandedHandler()}
              />
            </Flex>
          ) : null,
        size: DISPLAY_COLUMN_SIZE,
      }),
      customerColumnHelper.accessor("firstname", {
        id: "firstname",
        header: "Firstname",
      }),
      customerColumnHelper.accessor("lastname", {
        id: "lastname",
        header: "Lastname",
      }),
      customerColumnHelper.accessor("year", {
        id: "year",
        header: "Year",
        cell: ({ getValue }) => moment(getValue()).format("YYYY"),
      }),
      customerColumnHelper.accessor("brand", {
        id: "brand",
        header: "Brand",
      }),
      customerColumnHelper.accessor("model", {
        id: "model",
        header: "Model",
      }),
      customerColumnHelper.display({
        id: "delete",
        header: () => (
          <Flex justifyContent="center" alignItems="center">
            <FaTrash />
          </Flex>
        ),
        cell: ({ row }) => (
          <Flex justifyContent="center" alignItems="center">
            <IconButton
              aria-label="Delete row"
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() =>
                setData((prevData) =>
                  prevData.filter(
                    (customer) => customer.id !== row.original.id,
                  ),
                )
              }
              size="xs"
            />
          </Flex>
        ),
        size: DISPLAY_COLUMN_SIZE,
      }),
    ],
    [setData],
  );

  const serviceColumnHelper: ColumnHelper<Service> =
    createColumnHelper<Service>();

  const serviceColumns = useMemo(
    () => [
      serviceColumnHelper.display({
        id: "selection",
        header: ({ table }) => (
          <Flex justifyContent="center" alignItems="center">
            <Checkbox
              isChecked={table.getIsAllRowsSelected()}
              isIndeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Flex>
        ),
        cell: ({ row }) => (
          <Flex justifyContent="center" alignItems="center">
            <Checkbox
              onChange={row.getToggleSelectedHandler()}
              isChecked={row.getIsSelected()}
            />
          </Flex>
        ),
        size: DISPLAY_COLUMN_SIZE,
      }),
      serviceColumnHelper.accessor("code", {
        id: "code",
        header: "Code",
      }),
      serviceColumnHelper.accessor("desc", {
        id: "desc",
        header: "Description",
      }),
      serviceColumnHelper.accessor("date", {
        id: "date",
        header: "Date",
      }),
      serviceColumnHelper.accessor("cost", {
        id: "cost",
        header: "Cost",
      }),
      serviceColumnHelper.display({
        id: "delete",
        header: () => (
          <Flex justifyContent="center" alignItems="center">
            <FaTrash />
          </Flex>
        ),
        cell: ({ row }) => (
          <Flex justifyContent="center" alignItems="center">
            <IconButton
              aria-label="Delete row"
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => {
                setData((prevData) =>
                  prevData.map((customer) =>
                    customer.id === row.original.id
                      ? {
                          ...customer,
                          service: customer.service.filter(
                            (service) => service.id !== row.original.id,
                          ),
                        }
                      : customer,
                  ),
                );
              }}
              size="xs"
            />
          </Flex>
        ),
        size: DISPLAY_COLUMN_SIZE,
      }),
    ],
    [setData],
  );

  const columnIds = useMemo(
    () => customerColumns.map((column) => column.id),
    [customerColumns],
  );

  const initialColumnVisibility = useMemo(() => {
    return columnIds.reduce((acc: { [id: string]: boolean }, val) => {
      acc[val] = true;
      return acc;
    }, {});
  }, [columnIds]);

  return {
    data,
    customerColumns,
    serviceColumns,
    columnIds,
    initialColumnVisibility,
  };
}

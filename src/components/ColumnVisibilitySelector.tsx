import {
  Checkbox,
  CheckboxGroup,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FaDiceFour } from "react-icons/fa6";
import { convertCamelToTitleCase } from "../utils/Table.utils.ts";
import { Customer } from "../data/types.ts";
import { Table } from "@tanstack/react-table";

interface ColumnSelector {
  table: Table<Customer>;
  columnIds: string[];
}

export default function ColumnVisibilitySelector({
  table,
  columnIds,
}: ColumnSelector) {
  const columnVisibilityCheckboxState = Object.entries(
    table.getState().columnVisibility,
  )
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const handleRadioChange = (value: string) => {
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val] = value === "all";
        return acc;
      }, {}),
    );
  };

  const handleCheckboxChange = (selectedOptions: string[]) => {
    table.setColumnVisibility(
      columnIds.reduce((acc: { [id: string]: boolean }, val) => {
        acc[val] = selectedOptions.includes(val);
        return acc;
      }, {}),
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Show Column Visibility"
          icon={<FaDiceFour />}
          size="sm"
          m={2}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <RadioGroup onChange={handleRadioChange} mb={2} defaultValue="all">
            <Stack direction="row">
              <Radio value="all">Show All</Radio>
              <Radio value="none">Show None</Radio>
            </Stack>
          </RadioGroup>

          <CheckboxGroup
            value={columnVisibilityCheckboxState}
            colorScheme="green"
            onChange={handleCheckboxChange}
          >
            <Stack style={{ color: "black" }}>
              {columnIds.map((columnId) => (
                <Checkbox key={columnId} id={columnId} value={columnId}>
                  {convertCamelToTitleCase(columnId)}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

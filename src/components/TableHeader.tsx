import { flexRender, Header } from "@tanstack/react-table";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Th,
} from "@chakra-ui/react";
import { Customer } from "../data/types.ts";
import { FaArrowDown, FaArrowUp, FaEllipsisVertical } from "react-icons/fa6";

export default function TableHeader({
  header,
}: {
  header: Header<Customer, unknown>;
}) {
  const isSorted = header.column.getIsSorted();
  const isPinned = header.column.getIsPinned();

  return (
    <Th
      key={header.id}
      style={{
        width: header.getSize(),
        position: "relative",
        color: "white",
        background: "#000086",
        ...(isPinned && {
          background: "rgb(97 6 79)",
        }),
      }}
      colSpan={header.colSpan}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaEllipsisVertical />}
          style={{
            position: "absolute",
            right: 4,
            top: 10,
          }}
          className="menu"
          size="xs"
        />
        <Portal>
          <MenuList color="black">
            {isPinned !== "right" && (
              <MenuItem
                onClick={() => header.column.pin("right")}
                fontSize="sm"
              >
                Pin to Right
              </MenuItem>
            )}
            {isPinned !== "left" && (
              <MenuItem onClick={() => header.column.pin("left")} fontSize="sm">
                Pin to Left
              </MenuItem>
            )}
            {isPinned && (
              <MenuItem onClick={() => header.column.pin(false)} fontSize="sm">
                Unpin
              </MenuItem>
            )}
            <MenuItem
              onClick={header.column.getToggleSortingHandler()}
              fontSize="sm"
            >
              {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      <Flex justifyContent="center" gap={1} alignItems="center">
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {isSorted && (isSorted === "asc" ? <FaArrowDown /> : <FaArrowUp />)}
      </Flex>
    </Th>
  );
}

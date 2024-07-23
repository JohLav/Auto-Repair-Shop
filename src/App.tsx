import TableComp from "./components/TableComp.tsx";
import { Heading } from "@chakra-ui/react";

export default function App() {
  return (
    <>
      <Heading textAlign="center" m={5}>
        Auto Repair Shop
      </Heading>
      <TableComp />
    </>
  );
}

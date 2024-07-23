import { CUSTOMERS } from "../data/data.ts";
import { Customer } from "../data/types.ts";

export default function fetchCustomers(): Promise<Customer[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CUSTOMERS);
    }, 1000);
  });
}

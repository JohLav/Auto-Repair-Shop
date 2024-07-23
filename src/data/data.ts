import { Customer } from "./types.ts";

export const CUSTOMERS: Customer[] = [
  {
    id: 1,
    firstname: "Kathy",
    lastname: "Barker",
    year: 2016,
    brand: "Ford",
    model: "Focus",
    service: [
      {
        id: 1,
        code: 1001,
        desc: "Oil change",
        date: "January 25, 2019",
        cost: 20.71,
      },
      {
        id: 2,
        code: 1001,
        desc: "Oil change",
        date: "April 3, 2019",
        cost: 22.13,
      },
      {
        id: 3,
        code: 1001,
        desc: "Oil change",
        date: "August 5, 2019",
        cost: 22.13,
      },
      {
        id: 4,
        code: 1009,
        desc: "Brake pad replacement",
        date: "August 5, 2019",
        cost: 258.41,
      },
    ],
  },
  {
    id: 2,
    firstname: "Ralph",
    lastname: "Benson",
    year: 2014,
    brand: "Honda",
    model: "Civic",
    service: [
      {
        id: 1,
        code: 1001,
        desc: "Oil change",
        date: "March 13, 2019",
        cost: 36.42,
      },
      {
        id: 2,
        code: 1003,
        desc: "A/C recharge",
        date: "March 13, 2019",
        cost: 206.14,
      },
    ],
  },
  {
    id: 3,
    firstname: "Bob",
    lastname: "Douglas",
    year: 2016,
    brand: "Ford",
    model: "F-150",
    service: [
      {
        id: 1,
        code: 1005,
        desc: "Tire patch (driver's side front)",
        date: "May 12, 2020",
        cost: 0,
      },
    ],
  },
  {
    id: 4,
    firstname: "Omar",
    lastname: "Adams",
    year: 2017,
    brand: "Kia",
    model: "Sorento",
    service: [
      {
        id: 1,
        code: 1006,
        desc: "Rough shift from 2nd to 3rd",
        date: "May 5, 2020",
        cost: 223.43,
      },
    ],
  },
];

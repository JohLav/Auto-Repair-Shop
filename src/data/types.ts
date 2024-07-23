export type Service = {
  id: number;
  code: number;
  desc: string;
  date: string;
  cost: number;
};

export type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  year: number;
  brand: string;
  model: string;
  service: Service[];
};

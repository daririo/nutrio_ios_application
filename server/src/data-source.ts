import "reflect-metadata";
import { DataSource } from 'typeorm';

import { Product } from "./entities/Products";
import { Macros } from "./entities/Macros";
import { Micros } from "./entities/Micros";
import { Vitamins } from "./entities/Vitamins";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  database: "nutrio_app",

  synchronize: true,
  logging: true,

  entities: [Product, Macros, Micros, Vitamins],
});
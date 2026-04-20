import "reflect-metadata";
import { DataSource } from 'typeorm';

import { Product } from "./entities/products/Products";
import { Macros } from "./entities/products/Macros";
import { Micros } from "./entities/products/Micros";
import { Vitamins } from "./entities/products/Vitamins";
import { Settings } from "./entities/settings/Settings";
import { Persona } from "./entities/settings/Persona";
import { Nutrition } from "./entities/settings/Nutrition";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,

  synchronize: true,
  logging: true,

  entities: [Product, Macros, Micros, Vitamins, Settings, Persona, Nutrition],
});
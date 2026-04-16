import "reflect-metadata";
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    database: 'nutrio_app',

    synchronize: true,
    logging: true,

    entities: [__dirname + "/entities/*.ts"]
})
import "reflect-metadata";
import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT ?? 5432,
    username: process.env.DB_USER,
    password: `${process.env.DB_PASS}`,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [],
    migrations: ["src/migrations"],
    subscribers: []
});

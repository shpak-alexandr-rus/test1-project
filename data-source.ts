import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as path from 'path';
import 'dotenv/config';

export const dataSourceConfig: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT ?? 5432,
    username: process.env.DB_USER,
    password: `${process.env.DB_PASS}`,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, "src", "entities", "*.entity.{js,ts}")],
    migrations: [path.join(__dirname, "src", "migrations", "*.{js,ts}")],
    subscribers: []
}

export const AppDataSource = new DataSource(dataSourceConfig);

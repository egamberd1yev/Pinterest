// // import pkg from "pg"
// // import dotenv from "dotenv"

// // dotenv.config();

// // const { Pool } = pkg;

// // export const pool = new Pool({
// //   user: process.env.DB_USER,
// //   host: process.env.DB_HOST,
// //   database: process.env.DB_NAME,
// //   password: process.env.DB_PASSWORD,
// //   port: Number(process.env.DB_PORT || 5432),
// // >>>>>>> f88b071a41af1fdeff24ffd10ef798916f5ee004
// });


// src/db.js
import { DataSource } from "typeorm";
import { UserEntity } from "../models/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "pinterest_db",
  synchronize: true,
  logging: true,
  entities: [UserEntity],
});

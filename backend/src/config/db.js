import { DataSource } from "typeorm";
import { UserEntity } from "../models/user.entity.js";
import { ImageEntity } from "../models/image.entity.js";
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
  entities: [UserEntity, ImageEntity],
});
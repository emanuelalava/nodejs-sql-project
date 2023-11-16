import { createPool } from "mysql2/promise";
import { configuration } from "./config.js";

export const pool = createPool({
  host: configuration.DB_HOST,
  port: configuration.DB_PORT,
  database: configuration.DB_NAME,
  user: configuration.DB_USER,
  password: configuration.DB_PASSWORD,
});

import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Sn87017709306",
  port: 5432,
});

await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS gender VARCHAR(10) DEFAULT NULL");
console.log("Migration done: gender column added");
await pool.end();

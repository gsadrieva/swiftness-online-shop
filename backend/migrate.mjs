import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Sn87017709306",
  port: 5432,
});

await pool.query("ALTER TABLE orders ADD COLUMN IF NOT EXISTS installment_months INT DEFAULT NULL");
console.log("Migration done: installment_months added");
await pool.end();

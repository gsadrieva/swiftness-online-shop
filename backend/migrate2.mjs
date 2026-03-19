import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Sn87017709306",
  port: 5432,
});

await pool.query(`
  ALTER TABLE cart_product 
  ADD CONSTRAINT cart_product_cart_id_product_id_unique 
  UNIQUE (cart_id, product_id)
`).then(() => console.log("Constraint added"))
  .catch(e => console.log("Already exists or error:", e.message));

await pool.end();

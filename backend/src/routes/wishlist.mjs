import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

router.get("/wishlist", async (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  const response = await pool.query(
    "SELECT p.* FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = $1",
    [req.user.id]
  );
  return res.status(200).send(response.rows ?? []);
});

router.post("/wishlist", async (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  const { id } = req.body;
  await pool.query(
    "INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [req.user.id, id]
  );
  return res.status(200).send("Added");
});

router.delete("/wishlist/:id", async (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  await pool.query(
    "DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2",
    [req.user.id, req.params.id]
  );
  return res.status(200).send("Removed");
});

export default router;

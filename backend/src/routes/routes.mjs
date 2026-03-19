import { Router } from "express";
import authRouter from "./auth.mjs"
import productsRouter from "./products.mjs"
import cartRouter from "./cart.mjs"
import orderRouter from "./order.mjs"
import wishlistRouter from "./wishlist.mjs"

const router = Router();
router.use("/auth", authRouter);
router.use(productsRouter);
router.use(cartRouter);
router.use(orderRouter);
router.use(wishlistRouter);

export default router;

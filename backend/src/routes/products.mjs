import { Router } from "express";
import ProductsController from "../controllers/Products.mjs";
import ProductRepository from "../repositories/Product.mjs";
const router = Router();

function isAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") return next();
    return res.status(403).send("Forbidden");
}

router.get("/products", async (req, res) => {
    const products = await ProductRepository.getProducts(req.user);
    return res.status(200).send(products ?? []);
});

router.get("/products/category/:category", async (req, res) => {
    const category = req.params.category;
    const products = await ProductRepository.getProductsByCategory(category, req.user);
    return res.status(200).send(products ?? []);
});

router.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await ProductRepository.getProductById(id, req.user);
    return res.status(200).send(product);
});

router.post("/products", isAdmin, async (req, res) => {
    const product = await ProductRepository.addProduct(req.body);
    return res.status(200).send(product);
})

router.patch("/products/:id", isAdmin, async (req, res) => {
    const id = req.params.id;
    const product = await ProductRepository.updateProduct(id, req.body);
    return res.status(200).send(product);
})

router.delete("/products/:id", isAdmin, async (req, res) => {
    const id = req.params.id;
    await ProductRepository.deleteProduct(id);
    return res.status(200).send();
})

router.get("/categories", async (req, res) => {
    const categories = await ProductRepository.getCategories();
    return res.status(200).send(categories ?? []);
})

export default router;
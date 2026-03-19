import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productService from "../services/product.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function Products() {
  const [products, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  function loadProducts(data) {
    setAllProducts(data);
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    productService.getCategories()
      .then(res => res.data)
      .then(objects => Array.isArray(objects) ? objects.map(obj => obj.category) : [])
      .then(data => setCategories(["all", ...data]))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setPriceRange({ min: "", max: "" });
    if (!category) {
      productService.getProducts()
        .then(res => res.data)
        .then(loadProducts)
        .catch(err => { setError(err); setLoading(false); });
    } else {
      productService.getProductsByCategory(category)
        .then(res => res.data)
        .then(loadProducts)
        .catch(err => { setError(err); setLoading(false); });
    }
  }, [category]);

  function applyPriceFilter() {
    if (!allProducts) return;
    const min = priceRange.min === "" ? 0 : Number(priceRange.min);
    const max = priceRange.max === "" ? Infinity : Number(priceRange.max);
    setProducts(allProducts.filter(p => p.price >= min && p.price <= max));
  }

  function resetFilters() {
    setPriceRange({ min: "", max: "" });
    setProducts(allProducts);
  }

  return (
    <div className="flex flex-1 py-8 px-10 gap-6">
      {/* Боковая панель */}
      <aside className="w-52 shrink-0 space-y-6">
        <div>
          <p className="font-semibold mb-2">Категории</p>
          <ul className="space-y-1">
            {categories && categories.map(cat => (
              <li key={cat}>
                <button
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${
                    (cat === "all" && !category) || cat === category
                      ? "bg-violet-700 text-white"
                      : "hover:bg-violet-100"
                  }`}
                  onClick={() => cat === "all" ? navigate("/products") : setSearchParams({ category: cat })}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3">Баға (тг)</p>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0</span>
            <span className="font-medium text-violet-700">{priceRange.max || 1000000} тг</span>
            <span>1 000 000</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000000}
            step={1000}
            value={priceRange.max || 1000000}
            onChange={e => setPriceRange({ min: 0, max: e.target.value })}
            className="w-full accent-violet-600"
          />
          <button onClick={applyPriceFilter} className="w-full bg-violet-700 text-white rounded py-1 text-sm hover:bg-violet-800 mt-3">Қолдану</button>
          <button onClick={resetFilters} className="w-full mt-1 border border-violet-700 text-violet-700 rounded py-1 text-sm hover:bg-violet-50">Тазалау</button>
        </div>
      </aside>

      {/* Список товаров */}
      <div className="flex-1">
        {error && <p className="text-red-500">{error.message}</p>}
        <p className="text-sm text-gray-500 mb-4">{products ? `${products.length} тауар табылды` : ""}</p>
        <div className="flex flex-wrap gap-6 justify-start">
          {products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {loading && Array.from(new Array(10)).map((_, index) => (
            <div key={index}>
              <Skeleton variant="rectangular" width={250} height={180} />
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

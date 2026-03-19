import React, { useEffect, useState } from "react";
import wishlistService from "../services/wishlist.service";
import ProductCard from "../components/ProductCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Skeleton from "@mui/material/Skeleton";

function Wishlist() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistService.getWishlist()
      .then((res) => res.data)
      .then((data) => { setProducts(data); setLoading(false); });
  }, []);

  return (
    <div className="flex-1 bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-violet-600 text-center mb-8">
          Таңдаулылар
        </h1>

        {loading && (
          <div className="flex flex-wrap gap-6 justify-center">
            {Array.from(new Array(4)).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton variant="rectangular" width={250} height={180} />
                <Skeleton />
                <Skeleton width="60%" />
              </div>
            ))}
          </div>
        )}

        {products && products.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <FavoriteBorderIcon style={{ fontSize: 48 }} className="mb-3 text-gray-300" />
            <p className="text-lg font-medium">Таңдаулылар жоқ</p>
          </div>
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          {products && products.map((product) => (
            <ProductCard key={product.id} product={{ ...product, inWishlist: true }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;

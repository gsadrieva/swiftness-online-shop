import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useContext } from "react";
import cartService from "../services/cart.service";
import wishlistService from "../services/wishlist.service";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/cart";
import UserContext from "../context/user";

function ProductCard(props) {
  const [product, setProduct] = useState(props.product);
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(props.product.inWishlist || false);
  const [activeImg, setActiveImg] = useState(0);
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  function addToCart() {
    if (!user) { navigate("/login"); return; }
    setLoading(true);
    cartService.addToCart({ id: product.id })
      .then((res) => res.data)
      .then((data) => { setProduct(data); setLoading(false); updateCart(); })
      .catch((err) => { alert(err.response.data); setLoading(false); });
  }

  function toggleWishlist() {
    if (!user) { navigate("/login"); return; }
    if (inWishlist) {
      wishlistService.removeFromWishlist(product.id)
        .then(() => setInWishlist(false));
    } else {
      wishlistService.addToWishlist(product.id)
        .then(() => setInWishlist(true));
    }
  }

  return (
    <div className="w-64 p-4 space-y-2 shadow-lg rounded-tl-[35px] rounded-br-[35px] shadow-violet-600/50 relative">
      {/* Сердечко */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 text-gray-300 hover:text-red-400 transition-colors"
      >
        {inWishlist ? <FavoriteIcon style={{ fontSize: 20, color: '#ef4444' }} /> : <FavoriteBorderIcon style={{ fontSize: 20 }} />}
      </button>

      <div className="relative h-56 overflow-hidden rounded-xl bg-gray-50">
        <img
          src={product.images[activeImg]}
          alt={product.title}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        {/* Зоны наведения */}
        {product.images.length > 1 && (
          <div className="absolute inset-0 flex">
            {product.images.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full"
                onMouseEnter={() => setActiveImg(i)}
              />
            ))}
          </div>
        )}
        {/* Индикаторы */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeImg === i ? "bg-violet-600 w-4" : "bg-gray-300 w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <p className="font-semibold text-base cursor-pointer" onClick={() => navigate("/products/" + product.id)}>
        {product.title}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <p className="font-bold text-base">
          {product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price} тг
        </p>
        {product.discount && (
          <>
            <p className="text-sm text-gray-400 line-through">{product.price} тг</p>
            <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{product.discount}%</span>
          </>
        )}
      </div>
      {product.inCart && (
        <button className="text-white px-4 py-1 rounded-md bg-neutral-300" disabled>
          Таңдаулы
        </button>
      )}
      {!product.inCart && (
        <button
          className="px-4 py-1 rounded-md bg-violet-600 text-white hover:bg-slate-600"
          disabled={loading}
          onClick={addToCart}
        >
          {loading ? "Жүктеу" : "Себетке қосу"}
          <ShoppingBagIcon />
        </button>
      )}
    </div>
  );
}

export default ProductCard;
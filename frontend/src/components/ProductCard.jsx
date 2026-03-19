import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useContext } from "react";
import cartService from "../services/cart.service";
import wishlistService from "../services/wishlist.service";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CartContext from "../context/cart";
import UserContext from "../context/user";

function ProductCard(props) {
  const [product, setProduct] = useState(props.product);
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(props.product.inWishlist || false);
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  function addToCart() {
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

      <div className="flex items-center w-full justify-between">
        <Swiper
          modules={[Navigation]}
          className="mySwiper h-max"
          centeredSlides
          style={{ "--swiper-navigation-color": "gray", "--swiper-navigation-size": "25px" }}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <img
                src={image}
                alt={product.title}
                className="object-contain overflow-hidden h-56 transform transition duration-500 hover:scale-125"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="font-semibold text-base cursor-pointer" onClick={() => navigate("/products/" + product.id)}>
        {product.title}
      </p>
      <p className="font-medium text-base">{product.price}тг</p>
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
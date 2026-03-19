import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/product.service";
import cartService from "../services/cart.service";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Skeleton from "@mui/material/Skeleton";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import UserContext from "../context/user";
import { useTranslation } from "../hooks/useTranslation";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { tr } = useTranslation();

  function addToCart() {
    if (!user) { navigate("/login"); return; }
    cartService.addToCart({ id: product.id })
      .then((res) => res.data)
      .then((data) => setProduct({ ...product, inCart: true }))
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    setLoading(true);
    productService.getProduct(id)
      .then((res) => res.data)
      .then((data) => { setProduct(data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, []);

  const discountedPrice = product?.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;

  return (
    <div className="flex-1 bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {loading && (
          <div className="bg-white rounded-3xl p-8 flex gap-10">
            <Skeleton variant="rounded" width={400} height={400} className="shrink-0" />
            <div className="flex-1 space-y-4">
              <Skeleton variant="rounded" height={36} width="70%" />
              <Skeleton variant="rounded" height={24} width="40%" />
              <Skeleton variant="rounded" height={20} width="50%" />
              <Skeleton variant="rounded" height={80} />
              <Skeleton variant="rounded" height={48} width="50%" />
            </div>
          </div>
        )}

        {product && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-0">

              {/* Фото */}
              <div className="md:w-[45%] bg-gray-50 p-6 flex items-center justify-center">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="w-full"
                  style={{ "--swiper-navigation-color": "#7c3aed", "--swiper-navigation-size": "24px" }}
                >
                  {product.images.map((image, i) => (
                    <SwiperSlide key={i} className="flex items-center justify-center">
                      <img
                        src={image}
                        alt={product.title}
                        className="h-80 w-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Инфо */}
              <div className="flex-1 p-8 space-y-5">

                {/* Бренд + рейтинг */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <StarRoundedIcon style={{ color: "#f59e0b", fontSize: 20 }} />
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                  )}
                </div>

                {/* Название */}
                <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

                {/* Категория */}
                <p className="text-sm text-gray-400">
                  <span className="text-gray-500 font-medium">Санат: </span>{product.category}
                </p>

                {/* Описание */}
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

                {/* Цена */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-3xl font-bold text-gray-900">
                    {discountedPrice ?? product.price} тг
                  </span>
                  {product.discount && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{product.price} тг</span>
                      <span className="bg-pink-500 text-white text-sm font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <LocalOfferOutlinedIcon style={{ fontSize: 14 }} />
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </div>

                {/* Наличие */}
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <InventoryOutlinedIcon style={{ fontSize: 16 }} />
                  <span>{product.stock} дана қол жетімді</span>
                </div>

                {/* Кнопка */}
                {!product.inCart ? (
                  <button
                    onClick={addToCart}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md shadow-violet-200"
                  >
                    <ShoppingBagOutlinedIcon fontSize="small" />
                    Себетке қосу
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/cart")}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-colors"
                  >
                    <ShoppingBagOutlinedIcon fontSize="small" />
                    Себетке өту
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;

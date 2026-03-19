import React, { useContext, useState } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import cartService from "../services/cart.service.js";
import CartContext from "../context/cart";
import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function repeatOrder() {
    setLoading(true);
    try {
      await Promise.all(
        order.products.map((p) =>
          cartService.addToCart({ id: p.product_id, quantity: p.quantity })
        )
      );
      updateCart();
      navigate("/checkout", {
        state: {
          selectedPlan: order.installment_months ?? null,
          total: order.totalPrice,
        },
      });
    } catch {
      alert("Қате орын алды");
    } finally {
      setLoading(false);
    }
  }

  const monthly = order.installment_months
    ? Math.round(order.totalPrice / order.installment_months)
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Шапка */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <p className="font-bold text-gray-800">Тапсырыс № {order.id}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <CalendarTodayOutlinedIcon style={{ fontSize: 12 }} />
            {new Date(order.order_date).toLocaleString()}
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <CheckCircleOutlineIcon style={{ fontSize: 14 }} />
          Ақылы
        </span>
      </div>

      {/* Товары */}
      <div className="px-6 py-4 space-y-3">
        {order.products.map((product, i) => (
          <div key={i} className="flex items-center gap-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-16 h-16 object-contain rounded-xl bg-gray-50 p-1"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{product.title}</p>
              <p className="text-xs text-gray-400">{product.brand}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-violet-600">{product.price * product.quantity} тг</p>
              <p className="text-xs text-gray-400">{product.price} тг × {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Рассрочка */}
      {monthly && (
        <div className="px-6 py-3 bg-violet-50 border-t border-violet-100 flex items-center gap-2 text-sm text-violet-700">
          <CreditScoreOutlinedIcon style={{ fontSize: 18 }} />
          <span>
            0-0-{order.installment_months} бөліп төлеу:{" "}
            <strong>{monthly} тг × {order.installment_months} ай</strong>
          </span>
        </div>
      )}

      {/* Футер */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <LocalShippingOutlinedIcon style={{ fontSize: 16 }} className="text-violet-500" />
          {new Date(order.delivery_time).toLocaleString()}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-800">
            Барлығы: <span className="text-violet-600">{order.totalPrice} тг</span>
          </span>
          <button
            onClick={repeatOrder}
            disabled={loading}
            className="flex items-center gap-1 text-xs font-semibold text-violet-600 border border-violet-200 bg-white hover:bg-violet-50 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
          >
            <ReplayOutlinedIcon style={{ fontSize: 15 }} />
            {loading ? "..." : "Қайталау"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

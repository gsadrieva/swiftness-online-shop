import React, { useContext, useEffect, useState } from "react";
import cartService from "../services/cart.service";
import Skeleton from "@mui/material/Skeleton";
import CartProduct from "../components/CartProduct";
import CartContext from "../context/cart";
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useTranslation } from "../hooks/useTranslation";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const total = cart ? cart.reduce((acc, p) => acc + p.price * p.quantity, 0) : 0;
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { tr } = useTranslation();

  function updateProduct(id, quantity) {
    cartService.updateCart(id, quantity)
      .then((res) => res.data)
      .then((data) => { setCart(Array.isArray(data) ? data : []); updateCart(); });
  }

  function removeProduct(id) {
    cartService.removeFromCart(id)
      .then((res) => res.data)
      .then((data) => { setCart(Array.isArray(data) ? data : []); updateCart(); });
  }

  useEffect(() => {
    setLoading(true);
    cartService.getCart()
      .then((res) => res.data)
      .then((data) => { setCart(data); setLoading(false); });
  }, []);

  return (
    <div className="flex-1 w-full bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <ShoppingBagOutlinedIcon className="text-violet-600" />
          {tr.cart}
        </h1>

        <div className="flex gap-6 items-start">
          <div className="flex-1 space-y-4">
            {loading && Array.from(new Array(3)).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 flex gap-4">
                <Skeleton variant="rounded" width={96} height={96} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="rounded" height={20} width="60%" />
                  <Skeleton variant="rounded" height={16} width="30%" />
                  <Skeleton variant="rounded" height={16} width="20%" />
                </div>
              </div>
            ))}

            {cart && cart.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
                <ShoppingBagOutlinedIcon style={{ fontSize: 48 }} className="mb-3 text-gray-300" />
                <p className="text-lg font-medium">{tr.empty}</p>
              </div>
            )}

            {cart && cart.map((cartProduct) => (
              <CartProduct
                key={cartProduct.id}
                product={cartProduct}
                update={updateProduct}
                remove={removeProduct}
              />
            ))}
          </div>

          {cart && cart.length > 0 && (
            <div className="w-80 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800">{tr.total}</h2>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{tr.items(cart.length)}</span>
                <span>{total} тг</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-800">
                <span>{tr.total}</span>
                <span className="text-violet-600 text-lg">{total} тг</span>
              </div>

              <div className="bg-violet-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-violet-600 mb-2">{tr.paymentType}</p>

                <button
                  onClick={() => setSelectedPlan(null)}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedPlan === null ? "bg-violet-600 text-white" : "bg-white text-gray-700 hover:bg-violet-100"
                  }`}
                >
                  <span>{tr.payFull}</span>
                  <span>{total} тг</span>
                </button>

                {[3, 6, 12, 24].map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedPlan(m)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPlan === m ? "bg-violet-600 text-white font-semibold" : "bg-white text-gray-700 hover:bg-violet-100"
                    }`}
                  >
                    <span>0-0-{m}</span>
                    <span>{Math.round(total / m)} тг × {m} ай</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate("/checkout", { state: { selectedPlan, total } })}
                className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-md shadow-violet-200"
              >
                {selectedPlan ? tr.installment(selectedPlan) : tr.orderBtn(total)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

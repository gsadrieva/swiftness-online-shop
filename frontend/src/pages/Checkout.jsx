import React, { useState } from "react";
import orderService from "../services/order.service";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/cart";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { useTranslation } from "../hooks/useTranslation";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCart } = useContext(CartContext);
  const { tr } = useTranslation();
  const selectedPlan = location.state?.selectedPlan ?? null;
  const total = location.state?.total ?? 0;

  const localTime = () => {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [orderDetails, setOrderDetails] = useState({
    paymentMethod: "online",
    deliveryTime: localTime(),
    address: "",
  });

  function checkout(e) {
    e.preventDefault();
    if (!orderDetails.paymentMethod || !orderDetails.deliveryTime || !orderDetails.address) {
      alert(tr.fillAll);
      return;
    }
    orderService
      .checkoutOrder({ ...orderDetails, installmentMonths: selectedPlan ?? null })
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          alert(tr.orderPlaced);
          updateCart();
          navigate("/purchases");
        }
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="flex-1 w-full flex justify-center items-start py-12 px-4 bg-gray-50">
      <form onSubmit={checkout} className="w-full max-w-lg space-y-5">
        <h1 className="text-2xl font-bold text-violet-600 text-center">{tr.checkoutTitle}</h1>

        {/* Төлем жоспары */}
        <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-violet-700">
            <ReceiptOutlinedIcon fontSize="small" />
            <span className="font-semibold text-sm">
              {selectedPlan ? tr.installmentLabel(selectedPlan) : tr.fullPayLabel}
            </span>
          </div>
          <span className="font-bold text-violet-600">
            {selectedPlan ? `${Math.round(total / selectedPlan)} тг × ${selectedPlan} ай` : `${total} тг`}
          </span>
        </div>

        {/* Адрес */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-2 text-violet-600 font-semibold">
            <LocationOnOutlinedIcon fontSize="small" />
            <span>{tr.address}</span>
          </div>
          <input
            type="text"
            required
            placeholder={tr.addressPlaceholder}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors"
            onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
          />
        </div>

        {/* Уақыт */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-2 text-violet-600 font-semibold">
            <AccessTimeOutlinedIcon fontSize="small" />
            <span>{tr.deliveryTime}</span>
          </div>
          <input
            type="datetime-local"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors text-gray-700"
            defaultValue={localTime()}
            onChange={(e) => setOrderDetails({ ...orderDetails, deliveryTime: e.target.value })}
          />
        </div>

        {/* Төлем */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-2 text-violet-600 font-semibold">
            <CreditCardOutlinedIcon fontSize="small" />
            <span>{tr.payment}</span>
          </div>
          <select
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors text-gray-700"
            onChange={(e) => setOrderDetails({ ...orderDetails, paymentMethod: e.target.value })}
          >
            <option value="online">{tr.cardOnline}</option>
            {!selectedPlan && <option value="cash">{tr.cash}</option>}
          </select>

          {orderDetails.paymentMethod === "online" && (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                  e.target.value = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                }}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-1/2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                    e.target.value = raw.length > 2 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw;
                  }}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={3}
                  className="w-1/2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors"
                  onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3); }}
                />
              </div>
              <input
                type="text"
                placeholder={tr.cardHolder}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-400 transition-colors"
                onChange={(e) => { e.target.value = e.target.value.replace(/[0-9]/g, ""); }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-3 rounded-2xl font-semibold hover:bg-violet-700 transition-colors shadow-md shadow-violet-200"
        >
          {tr.confirm}
        </button>
      </form>
    </div>
  );
}

export default Checkout;

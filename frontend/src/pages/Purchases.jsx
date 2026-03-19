import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import orderService from "../services/order.service";
import OrderCard from "../components/OrderCard";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

function Purchases() {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrders()
      .then((res) => res.data)
      .then((data) => { setPurchases(data); setLoading(false); });
  }, []);

  return (
    <div className="flex-1 bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-violet-600 text-center">
          Менің тапсырыстарым
        </h1>

        {loading && Array.from(new Array(3)).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 space-y-3">
            <Skeleton variant="rounded" height={20} width="40%" />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={16} width="30%" />
          </div>
        ))}

        {purchases && purchases.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
            <ReceiptLongOutlinedIcon style={{ fontSize: 48 }} className="mb-3 text-gray-300" />
            <p className="text-lg font-medium">Тапсырыстар жоқ</p>
          </div>
        )}

        {purchases && purchases.map((purchase) => (
          <OrderCard key={purchase.id} order={purchase} />
        ))}
      </div>
    </div>
  );
}

export default Purchases;

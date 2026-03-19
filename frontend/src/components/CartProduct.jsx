import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function CartProduct({ product, update, remove }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md shadow-violet-100 border border-violet-100 hover:shadow-violet-300 transition-shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-24 h-24 object-contain rounded-xl bg-gray-50 p-1"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">{product.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{product.brand}</p>
        <p className="text-violet-600 font-bold mt-1">{product.price} тг</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <button
          onClick={() => remove(product.id)}
          className="text-gray-300 hover:text-red-400 transition-colors"
        >
          <DeleteIcon fontSize="small" />
        </button>
        <div className="flex items-center gap-2 bg-violet-50 rounded-xl px-2 py-1">
          <button
            onClick={() => product.quantity === 1 ? remove(product.id) : update(product.id, product.quantity - 1)}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-violet-200 transition-colors text-violet-600"
          >
            <RemoveIcon style={{ fontSize: 14 }} />
          </button>
          <span className="w-6 text-center font-semibold text-gray-700 text-sm">{product.quantity}</span>
          <button
            onClick={() => update(product.id, product.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-violet-200 transition-colors text-violet-600"
          >
            <AddIcon style={{ fontSize: 14 }} />
          </button>
        </div>
        <p className="text-sm font-semibold text-gray-500">{product.price * product.quantity} тг</p>
      </div>
    </div>
  );
}

export default CartProduct;

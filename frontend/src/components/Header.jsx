import React, { useState, useContext } from "react";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate, Link } from "react-router-dom";
import CartContext from "../context/cart";
import UserContext from "../context/user";
import userService from "../services/user.service";
import { useTranslation } from "../hooks/useTranslation";

const LANGS = ["kz", "ru", "en"];

function Header() {
  const { cart } = useContext(CartContext);
  const { user, updateUser } = useContext(UserContext);
  const { tr, lang, setLang } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    userService.logout()
      .then(res => res.status)
      .then(status => {
        if (status == 200) {
          updateUser();
          navigate("/");
          window.location.reload();
        }
      })
      .catch(err => alert(err.message));
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Лого */}
        <img
          src="img/Logo.png"
          alt="Logo"
          width="180px"
          className="cursor-pointer object-contain"
          style={{ filter: 'grayscale(100%) invert(18%) sepia(99%) saturate(3000%) hue-rotate(258deg) brightness(50%) contrast(120%)' }}
          onClick={() => navigate("/")}
        />

        {/* Навигация */}
        <nav className="flex items-center gap-6">
          <Link to="/products" className="text-gray-500 hover:text-violet-600 text-sm font-medium transition-colors">
            {tr.catalog}
          </Link>

          {/* Переключатель языка */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                  lang === l ? "bg-violet-600 text-white" : "text-gray-500 hover:text-violet-600"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Избранное */}
          {user && (
            <button onClick={() => navigate("/wishlist")} className="relative text-gray-500 hover:text-red-400 transition-colors">
              <FavoriteBorderIcon />
            </button>
          )}

          {/* Корзина */}
          {user && (
            <button onClick={() => navigate("/cart")} className="relative text-gray-500 hover:text-violet-600 transition-colors">
              <ShoppingBagOutlinedIcon />
              {cart && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          {/* Пользователь */}
          {user ? (
            <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
              <button className="flex items-center gap-2 bg-violet-50 hover:bg-violet-100 text-violet-700 px-3 py-1.5 rounded-lg transition-colors">
                <AccountCircleOutlinedIcon fontSize="small" />
                <span className="text-sm font-medium">{user.role === "admin" ? tr.admin : user.firstname}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  <button
                    onClick={() => navigate("/purchases")}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                  >
                    <PersonOutlinedIcon fontSize="small" />
                    {tr.myOrders}
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors border-t border-gray-100"
                  >
                    <LogoutIcon fontSize="small" />
                    {tr.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <AccountCircleOutlinedIcon fontSize="small" />
              {tr.login}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

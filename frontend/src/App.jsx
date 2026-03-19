import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartProvider";
import Checkout from "./pages/Checkout";
import UserProvider from "./context/UserProvider";
import Purchases from "./pages/Purchases";
import AddProduct from "./pages/admin_panel/AddProduct";
import AdminLayout from "./pages/admin_panel/Layout";
import Main from "./pages/admin_panel/Main";
import EditProduct from "./pages/admin_panel/EditProduct";
import DeleteProduct from "./pages/admin_panel/DeleteProduct";
import ListProducts from "./pages/admin_panel/ListProducts";
import Confidential from "./pages/Confidential";
import Wishlist from "./pages/Wishlist";
import { useContext } from "react";
import UserContext from "./context/user";

function AdminRoute({ children }) {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <div>
      <UserProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/confidential" element={<Confidential />} />
              <Route path="/wishlist" element={<Wishlist />} />

            </Route>
            <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route path="/admin" element={<Main />} />
              <Route path="/admin/list" element={<ListProducts />} />
              <Route path="/admin/add" element={<AddProduct />} />
              <Route path="/admin/edit" element={<EditProduct />} />
              <Route path="/admin/delete" element={<DeleteProduct />} />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider>
      
    </div>
  );
}

export default App;
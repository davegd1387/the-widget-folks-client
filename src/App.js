import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import NavBar from "./components/NavBar.js";
import PageNotFound from "./components/PageNotFound";
import { Admin } from "./components/Admin";
import { Profile } from "./components/Profile";
import { AuthProvider } from "./context/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Sales from "./components/Sales";
import Sale from "./components/Sale";
import { Cart } from "./components/Cart";
import Products from "./components/Products";
import { User } from "./components/User";
import { Footer } from "./components/Footer";
import { ShopProvider } from "./context/shop-cart";
function App() {
  return (
    <>
      <AuthProvider>
        <ShopProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="admin"
              element={
                <RequireAuth>
                  <Admin />
                </RequireAuth>
              }
            />
            <Route
              path="admin/:custId"
              element={
                <RequireAuth>
                  <User />
                </RequireAuth>
              }
            />
            <Route
              path="sales"
              element={
                <RequireAuth>
                  <Sales />
                </RequireAuth>
              }
            />
            <Route
              path="sales/:saleId"
              element={
                <RequireAuth>
                  <Sale />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="cart"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />
            <Route path="products" element={<Products />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </ShopProvider>
      </AuthProvider>
    </>
  );
}

export default App;

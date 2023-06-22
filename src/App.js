import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
// import { About } from "./components/About";
import NavBar from "./components/NavBar.js";
import PageNotFound from "./components/PageNotFound";
// import Users from "./components/Users";
// import UserDetails from "./components/UserDetails";
import { Admin } from "./components/Admin";
import { Profile } from "./components/Profile";
import { AuthProvider } from "./context/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Sales from "./components/Sales";
import Sale from "./components/Sale";
import Products from "./components/Products";
import { User } from "./components/User";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <AuthProvider>
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
          <Route path="products" element={<Products />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;

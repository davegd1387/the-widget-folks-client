import { useShop } from "../context/shop-cart";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "./cart.css";
import axios from "../api/axios";
const PURCHASE_URL = "/protected/sales/new";
export const Cart = () => {
  const { user } = useAuth();
  const custId = user.custId;
  const { products, cartItems, getTotalCartAmount, clearCart } = useShop();
  //   console.log(`getTotalCartAmount(): ${getTotalCartAmount()}`);
  //   let totalAmount = 0;
  const totalAmount = parseFloat(getTotalCartAmount().toFixed(2));
  //   const totalAmount = (getTotalCartAmount() * 100) / 100;
  //   console.log(`totalAmount): ${totalAmount}`);
  //   const totalAmount = Math.round((getTotalCartAmount() * 100) / 100).toFixed(2);
  const tax = parseFloat(totalAmount * 0.08625).toFixed(2);
  const grandTotal = parseFloat(totalAmount + tax * 1).toFixed(2);
  const todayDate = new Date().toISOString().slice(0, 10);
  const continueShopping = "Contimue Shopping";
  // console.log(`custId: ${custId}`);
  // console.log(`products: ${JSON.stringify(products)}`);
  // console.log(`cartItems: ${JSON.stringify(cartItems)}`);
  const navigate = useNavigate();

  const sortedItems = cartItems.sort((a, b) => {
    return a.itemId - b.itemId;
  });
  // console.log(`sortedItems: ${JSON.stringify(sortedItems)}`);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        PURCHASE_URL,
        JSON.stringify({
          saleDate: todayDate,
          amount: totalAmount,
          tax,
          taxStatus: "T",
          custId,
          saleItems: sortedItems,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(`sale entered: ${JSON.stringify(response.data)}`);
      clearCart();
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 403) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.response?.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Purchase Failed");
      // }
      // errRef.current.focus();
    }
  };
  return (
    <ul className="cart">
      {totalAmount > 0 && (
        <div className="cart__li">
          <div className="cart__header">Product</div>
          <div className="cart__header">Description</div>
          <div className="cart__header">Unit</div>
          <div className="cart__header">Total</div>
          <div className="cart__header">Quantity</div>
        </div>
      )}
      {sortedItems.map((item) => {
        if (item.quantity !== 0) {
          const currProduct = products.find((product) => {
            return product.itemId === item.itemId;
          });
          return <CartItem product={currProduct} key={currProduct.itemId} />;
        } else {
          return null;
        }
      })}
      {totalAmount > 0 ? (
        <div>
          <form onSubmit={handleSubmit} className="checkout">
            <button
              className="cart__button"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
            {/* <p className="cart__para">Order Total: ${totalAmount}</p> */}
            <button className="cart__button">
              <span className="co__large">Checkout: </span>
              <span className="co__small">
                ${grandTotal} ({totalAmount} + tax: {tax})
              </span>
            </button>
          </form>
        </div>
      ) : (
        <div className="cart__empty">
          <h2>Your CART is empty!</h2>
        </div>
      )}
    </ul>
  );
};

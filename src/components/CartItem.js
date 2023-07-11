import { useShop } from "../context/shop-cart";
import "./cart.css";
export const CartItem = (props) => {
  const { product } = props;
  const { itemId, prodName, desc, price } = product;
  const { cartItems, addToCart, removeFromCart, updateCartItemQuantity } =
    useShop();
  const plusSign = "+";
  const minusSign = "-";
  const cartItemQuantity = cartItems.find(
    (item) => item.itemId === itemId
  ).quantity;
  // console.log(`cartItems[itemId]:${cartItems[itemId]}`);
  // console.log(`[itemId]:${itemId}`);
  return (
    <li className="cart__li">
      <div className="cart__item cart__item__bold">
        {/* <b> */}
        {prodName}
        {/* </b> */}
      </div>
      <div className="cart__item">{desc}</div>
      <div className="cart__item">{parseFloat(price).toFixed(2)}</div>
      {/* <div className="cart__item">{cartItemQuantity}</div> */}
      <div className="cart__item">
        {/* {Math.round((price * cartItemQuantity * 100) / 100).toFixed(2)} */}
        {parseFloat(price * cartItemQuantity).toFixed(2)}
      </div>

      <div className="cart__item cart__qty">
        <button onClick={() => removeFromCart(itemId)} className="cart__button">
          {minusSign}
        </button>
        <input
          className="cart__input"
          value={cartItemQuantity}
          type="text"
          onChange={(e) =>
            updateCartItemQuantity(Number(e.target.value), itemId)
          }
        />
        <button onClick={() => addToCart(itemId)} className="cart__button">
          {plusSign}
        </button>
      </div>
    </li>
  );
};

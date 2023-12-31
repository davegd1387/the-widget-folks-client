import { useShop } from "../context/shop-cart";
import "./products.css";
const Product = (props) => {
  const { itemId, prodName, desc, price, user } = props;
  const { addToCart, inCart } = useShop();
  // console.log(`itemId: ${itemId}`);
  const cartItemQuantity = inCart(itemId);
  // console.log(`cartItemQuantity: ${cartItemQuantity}`);
  return (
    <div className="product">
      <div>
        <h3 className="product--h3">{prodName}</h3>
        <p className="product--price">
          Price: $ {parseFloat(price).toFixed(2)}
        </p>
      </div>
      <p className="product--desc">{desc}</p>

      {user && (
        <button className="addToCartBttn" onClick={() => addToCart(itemId)}>
          Add To {cartItemQuantity && <> {cartItemQuantity} in </>}Cart
        </button>
      )}
    </div>
  );
};

export default Product;

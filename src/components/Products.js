import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import Product from "./Product";
import axios from "../api/axios";
import { useShop } from "../context/shop-cart";
import "./products.css";
const Products_URL = "/items/";

const Products = () => {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const { user } = useAuth();
  const { products, loadProducts } = useShop();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${Products_URL}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(`prods data: ${JSON.stringify(data)}`);
      loadProducts(data);
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Get Products Failed");
      }
      errRef.current.focus();
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const sortProducts = products.sort((a, b) => {
    return a.prodName - b.prodName;
  });
  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {/* <h2>Our Products</h2> */}
        <div>
          {/* <div className="products"> */}
          <ul className="products">
            {sortProducts.map((product) => (
              <li key={product.itemId} className="products__li">
                <Product
                  itemId={product.itemId}
                  prodName={product.prodName}
                  desc={product.desc}
                  price={product.price}
                  user={user}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Products;

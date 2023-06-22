import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "./Product";
import axios from "../api/axios";
const Products_URL = "/items/";

const Products = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/products";
  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const getProducts = async () => {
    const { data } = await axios.get(`${Products_URL}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // console.log(JSON.stringify(data));
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

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
        <h2>Our Products</h2>
        <div className="products">
          {products.map((product) => (
            <Product
              itemId={product.itemId}
              prodName={product.prodName}
              desc={product.desc}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;

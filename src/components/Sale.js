import { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/auth";
import "./sale.css";
const Sale_URL = "/protected/sale/";
export default function Sale() {
  const auth = useAuth();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const { saleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || `/sales`;
  const [sale, setSale] = useState([]);
  const handleReturn = () => {
    navigate(redirectPath, { replace: true });
  };
  const getSale = async () => {
    try {
      const { data } = await axios.get(`${Sale_URL}${saleId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(JSON.stringify(data));
      setSale(data);
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("UnAuthorized");
      } else {
        setErrMsg("Server Error");
      }
      auth.logout();

      errRef.current.focus();
    }
  };
  useEffect(() => {
    getSale();
  }, []);
  return (
    <section className="sale">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h2 className="sale__h2">Details for Sale #{saleId}</h2>
      <main className="sale__main">
        <ul className="sale__container">
          <li key={0} className="sale__li">
            <div className="sale__header">Product</div>
            <div className="sale__header">Description</div>
            <div className="sale__header">Price</div>
            <div className="sale__header">Quantity</div>
          </li>
          {sale.map((item) => (
            <li key={item.item + 1} className="sale__li">
              <div className="sale__item">{item.name}</div>
              <div className="sale__item">{item.desc}</div>
              <div className="sale__item">
                {parseFloat(item.price).toFixed(2)}
              </div>
              <div className="sale__item">{item.quantity}</div>
            </li>
          ))}
        </ul>
        <button className="sale__rtn_btn" onClick={handleReturn}>
          Return
        </button>
      </main>
    </section>
  );
}

import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../api/axios";
const Sales_URL = "/protected/sales/";

const Sales = () => {
  const auth = useAuth();
  const { firstName, lastName, userId } = auth.user;

  const errRef = useRef();
  // const navigate = useNavigate();
  const location = useLocation();
  // const redirectPath = location.state?.path || "/profile";
  const [sales, setSales] = useState([]);
  const [yesNoSales, setYesNoSales] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const getSales = async () => {
    try {
      const { data } = await axios.get(`${Sales_URL}${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(JSON.stringify(data));
      if (data.length > 0) {
        setYesNoSales("Sales for ");
      } else {
        setYesNoSales("Sorry, no sales for ");
      }
      setSales(data);
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Server Error");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    getSales();
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

        <h1>
          {yesNoSales}
          {lastName}, {firstName}{" "}
        </h1>

        <div className="sales">
          {sales.map((sale) => (
            <>
              <Link to={sale.saleId.toString()} key={sale.saleId}>
                <p>Sales ID: {sale.saleId}</p>
              </Link>
              <p>Date: {sale.saleDate}</p>
              <p>Amount: {sale.amount}</p>
              <p>Sales Tax: {sale.tax}</p>
              <p>Tax Status: {sale.taxStatus}</p>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default Sales;

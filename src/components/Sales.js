import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import taxStatus from "../utils/taxStatus";
import axios from "../api/axios";
const Sales_URL = "/protected/sales/";

const Sales = () => {
  const auth = useAuth();
  const { firstName, lastName, userId } = auth.user;

  const errRef = useRef();
  const [sales, setSales] = useState([]);
  const [yesNoSales, setYesNoSales] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  const getSales = async () => {
    try {
      const { data } = await axios.get(`${Sales_URL}${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(JSON.stringify(data));
      if (data.length > 0) {
        setYesNoSales("Purchases for ");
      } else {
        setYesNoSales("Sorry, no surchases for ");
      }
      setSales(data);
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
      errRef.current?.focus();
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          {errMsg}
        </p>

        <h2>
          {yesNoSales}
          {lastName}, {firstName}{" "}
        </h2>
        {sales.length > 0 && (
          <ul className="sales__container">
            <div className="sales__li">
              <div className="sales__header">Click On</div>
              <div className="sales__header">Date</div>
              <div className="sales__header">Amount</div>
              <div className="sales__header">Sales Tax</div>
              <div className="sales__header">Status</div>
            </div>
            {sales.map((sale) => (
              // <li key={sale.item} className="sales__li">
              <li key={sale.saleId} className="sales__li">
                <div className="sales__item">
                  <Link
                    className="sales__link"
                    to={sale.saleId.toString()}
                    key={sale.saleId}
                  >
                    {sale.saleId}
                  </Link>
                </div>
                <div className="sales__item">
                  {sale.saleDate.substring(0, 10)}
                </div>
                <div className="sales__item">
                  {parseFloat(sale.amount).toFixed(2)}
                </div>
                <div className="sales__item">
                  {parseFloat(sale.tax).toFixed(2)}
                </div>
                <div className="sales__item">{taxStatus(sale.taxStatus)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default Sales;

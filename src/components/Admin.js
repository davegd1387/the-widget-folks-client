// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth";
import { useRef, useState, useEffect } from "react";

import axios from "../api/axios";
const ADMIN_URL = "/protected/admin";
export const Admin = () => {
  //   const auth = useAuth();
  const [custnum, setCustnum] = useState("");
  //   const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${ADMIN_URL}${custnum}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      if (!err?.response) {
        // setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        // setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        // setErrMsg("Unauthorized");
      } else {
        // setErrMsg("Login Failed");
      }
      //   errRef.current.focus();
    }
  };
  return (
    <div>
      <h2>Administrative Functions</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="custsearch">Customer #:</label>
        <input
          type="number"
          id="custnum"
          autoComplete="off"
          //   onChange={(e) => console.log(`onChange: ${e.target.value}`)}
          onChange={(e) => setCustnum(e.target.value)}
          value={custnum}
          required
        />

        <button>Search</button>
      </form>
    </div>
  );
};

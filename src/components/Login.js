import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth/local";

const Login = () => {
  const auth = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/profile";
  const redirectPathAdmin = location.state?.path || "/admin";
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(`response.data: ${JSON.stringify(response?.data)}`);
      const {
        firstName,
        lastName,
        address1,
        address2,
        city,
        zip,
        state,
        tel,
        userId,
        isadmin,
        custId,
      } = response?.data;
      console.log();

      auth.login({
        email,
        pwd,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        tel,
        userId,
        isadmin,
        custId,
      });
      setEmail("");
      setPwd("");
      setSuccess(true);
      isadmin
        ? navigate(redirectPathAdmin, { replace: true })
        : navigate(redirectPath, { replace: true });

      // navigate(redirectPath, { replace: true });
      // console.log(`We are DONE!`);
    } catch (err) {
      console.log(`err.response: ${JSON.stringify(err.response)}`);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in {auth.user.firstName}!</h1>
        </section>
      ) : (
        <section className="login-form">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email (Username):</label>
            <input
              type="text"
              // id="username"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              // value={user}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          {/* <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Register Here!</Link>
            </span>
          </p> */}
        </section>
      )}
    </>
  );
};

export default Login;

import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import stateList from "../utils/stateList";
import { useAuth } from "../context/auth";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const STREET_REGEX = /^[0-9a-zA-Z\s\.\-\`\#]{5,30}$/;
const STREET2_REGEX = /^[0-9a-zA-Z\s\.\-\`\#]{0,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /[a-zA-Z\s\.\-\`]{1,30}$/;
const ZIP_REGEX = /^[0-9]{5}$/;
const TELEPHONE_REGEX = /\d{3}-\d{3}-\d{4}/;
const CITY_REGEX = /^[A-Za-z][A-Za-z\'\-\.]+([\ A-Za-z][A-Za-z\'\-\.\s]+)*/;
const REGISTER_URL = "/auth/register";

const Register = () => {
  const options = stateList.map(({ full, abbreviation }) => {
    return (
      <option key={abbreviation} value={abbreviation}>
        {full}
      </option>
    );
  });
  const auth = useAuth();
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/profile  ";

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [address1, setAddress1] = useState("");
  const [validAddress1, setValidAddress1] = useState(false);
  const [address1Focus, setAddress1Focus] = useState(false);

  const [address2, setAddress2] = useState("");
  const [validAddress2, setValidAddress2] = useState(false);
  const [address2Focus, setAddress2Focus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [zip, setZip] = useState("");
  const [validZip, setValidZip] = useState(false);
  const [zipFocus, setZipFocus] = useState(false);

  const [st, setSt] = useState("");
  const [validSt, setValidSt] = useState(false);
  const [stFocus, setStFocus] = useState(false);

  const [telephone, setTelephone] = useState("");
  const [validTelephone, setValidTelephone] = useState(false);
  const [telephoneFocus, setTelephoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidAddress1(STREET_REGEX.test(address1));
  }, [address1]);

  useEffect(() => {
    setValidAddress2(STREET2_REGEX.test(address2));
  }, [address2]);

  useEffect(() => {
    setValidCity(CITY_REGEX.test(city));
  }, [city]);

  useEffect(() => {
    if (st.length > 0) {
      // console.log(`State changed to: ${st}`)
      setValidSt(true);
    } else {
      setValidSt(false);
    }
  }, [st]);

  useEffect(() => {
    setValidZip(ZIP_REGEX.test(zip));
  }, [zip]);

  useEffect(() => {
    setValidTelephone(TELEPHONE_REGEX.test(telephone));
  }, [telephone]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Inside handleSumit, ${firstName}, ${lastName}, ${address1}, ${address2}, ${city}, ${st}, ${zip}, ${telephone}`
    );

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      console.log("error !!!");
      setErrMsg("Invalid Entry");
      return;
    }
    const customer = {
      email,
      password,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state: st,
      zip,
      telephone,
    };
    try {
      console.log(`Inside handleSumit, customer:${JSON.stringify(customer)}`);
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(customer),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      // console.log(JSON.stringify(response));
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
      } = response?.data;
      auth.login({
        email,
        password,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        tel,
        userId,
      });
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail("");
      setPassword("");
      setMatchPwd("");
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setZip("");
      setSt("");
      setTelephone("");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log(`Error: ${err.request}`);
        console.log(`Error: ${JSON.stringify(err.response)}`);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username/ email Already in Use!");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="register-form">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            {/* <div className="register">
              <div className="register-first"> */}
            <label htmlFor="email">
              Email(Username):
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              // aria-invalid={validEmail ? "false" : "true"}
              // aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Valid Email Format Required.
            </p>
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              // aria-invalid={validPwd ? "false" : "true"}
              // aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "hide"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: !,@,#,$,%
              {/* Allowed special characters:{" "} */}
              {/* <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span> */}
            </p>

            {/* <div id="matchpwddiv" className={validPwd ? "matchpwddiv" : "hide"}> */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? "instructions" : "hide"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            {/* </div> */}
            <label htmlFor="firstName">
              First Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validFirstName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validFirstName || !firstName ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="firstName"
              autoComplete="on"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            <p
              id="firstnote"
              className={
                firstNameFocus && firstName && !validFirstName
                  ? "instructions"
                  : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              First Name Required!
            </p>
            <label htmlFor="lastName">
              Last Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validLastName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validLastName || !lastName ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="lastName"
              autoComplete="on"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            <p
              id="lastnote"
              className={
                lastNameFocus && lastName && !validLastName
                  ? "instructions"
                  : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Last Name Required!
            </p>
            <label htmlFor="telephone">
              Telephone:
              <FontAwesomeIcon
                icon={faCheck}
                className={validTelephone ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validTelephone || !telephone ? "hide" : "invalid"}
              />
            </label>
            <input
              type="tel"
              id="telephone"
              autoComplete="on"
              placeholder="012-345-6789"
              onChange={(e) => setTelephone(e.target.value)}
              value={telephone}
              required
              onFocus={() => setTelephoneFocus(true)}
              onBlur={() => setTelephoneFocus(false)}
            />
            <p
              id="telephonenote"
              className={
                telephoneFocus && telephone && !validTelephone
                  ? "instructions"
                  : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Telephone Required!
            </p>
            {/* </div> */}
            {/* <div className="register-second"> */}
            <label htmlFor="address1">
              Address:
              <FontAwesomeIcon
                icon={faCheck}
                className={validAddress1 ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validAddress1 || !address1 ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="address1"
              autoComplete="on"
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              required
              onFocus={() => setAddress1Focus(true)}
              onBlur={() => setAddress1Focus(false)}
            />
            <p
              id="address1note"
              className={
                address1Focus && address1 && !validAddress1
                  ? "instructions"
                  : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Address Required!
            </p>
            {/* <label htmlFor="address2">
              Address 2:
              <FontAwesomeIcon
                icon={faCheck}
                className={validAddress2 ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validAddress2 || !address2 ? "hide" : "invalid"}
              />
            </label> */}
            <input
              type="text"
              id="address2"
              autoComplete="on"
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              onFocus={() => setAddress2Focus(true)}
              onBlur={() => setAddress2Focus(false)}
            />
            {/* <p
              id="address2note"
              className={
                address2Focus && address2 && !validAddress2
                  ? "instructions"
                  : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Address Required!
            </p> */}
            <label htmlFor="city">
              City:
              <FontAwesomeIcon
                icon={faCheck}
                className={validCity ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validCity || !city ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="city"
              autoComplete="on"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              onFocus={() => setCityFocus(true)}
              onBlur={() => setCityFocus(false)}
            />
            <p
              id="citynote"
              className={
                cityFocus && city && !validCity ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              City Required!
            </p>
            <label htmlFor="state">
              State:
              <FontAwesomeIcon
                icon={faCheck}
                className={validSt ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validSt || !st ? "hide" : "invalid"}
              />
            </label>
            <select
              value={st}
              name="state"
              id="state"
              onChange={(e) => setSt(e.target.value)}
              required
              onFocus={() => setStFocus(true)}
              onBlur={() => setStFocus(false)}
            >
              {options}
            </select>
            <label htmlFor="zip">
              Zip:
              <FontAwesomeIcon
                icon={faCheck}
                className={validZip ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validZip || !zip ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="zip"
              autoComplete="on"
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              required
              onFocus={() => setZipFocus(true)}
              onBlur={() => setZipFocus(false)}
            />
            <p
              id="zipnote"
              className={zipFocus && zip && !validZip ? "instructions" : "hide"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Zip Required!
            </p>
            {/* </div>
            </div> */}
            <button
              disabled={!validEmail || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          {/* <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In Here!</Link>
            </span>
          </p> */}
        </section>
      )}
    </>
  );
};

export default Register;

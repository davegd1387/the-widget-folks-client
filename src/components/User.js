import { useAuth } from "../context/auth";
export const User = () => {
  const auth = useAuth();
  const {
    firstName,
    lastName,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    tel,
    userId,
    isadmin,
    custId,
  } = auth.user;

  return (
    <div className="customer">
      <span className="custname">
        {firstName} {lastName}{" "}
      </span>
      {isadmin && "(admin)"}
      <br />
      <span className="email">{email}</span>

      <br />
      <span className="address">
        {address1} <br />
        {address2 && address2}
        {address2 && <br />}
        {city}, {state} {zip}
      </span>
      <br />
      <span className="telephone">{tel}</span>
      <br />
      {isadmin && `Customer id: ${custId}`}
      {/* <br />
      User id: {userId}
      <br /> */}
    </div>
  );
};

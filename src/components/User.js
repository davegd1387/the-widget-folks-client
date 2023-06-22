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
      <h2>Welcome:</h2>
      <span className="custname">
        {firstName} {lastName}{" "}
      </span>
      {isadmin && "(admin)"}
      <br />
      {email}
      <br />
      {address1}
      <br />
      {address2 != null && address2}
      {address2 != null && <br />}
      {city}, {state} {zip}
      <br />
      {tel}
      <br />
      {isadmin && `Customer id: ${custId}`}
      <br />
      <br />
      User id: {userId}
      <br />
    </div>
  );
};

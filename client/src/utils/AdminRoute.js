import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import Spinner from "../components/spinner.gif";
function AdminRoute({ component: Component, location, ...rest }) {
  const { userState } = useContext(UserContext);
  if (userState.loading) {
    return <img src={Spinner} alt="spinner" />;
  }
  return userState.authenticated && userState.isAdmin ? (
    <Route
      {...rest}
      exact
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  ) : (
    <Redirect to="/" />
  );
}
export default AdminRoute;

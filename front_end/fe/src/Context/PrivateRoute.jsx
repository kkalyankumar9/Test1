import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoute = ({ children }) => {

  const isAuth = useAuth

  if (!isAuth) {
    return <Navigate to="/signup"  />;
  }
  return children;
};

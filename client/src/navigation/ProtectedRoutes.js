import { Navigate } from "react-router-dom";
import { Routeconstant } from "./Routeconstant";

export const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("BLOG"));
  if (user && user.data.length) {
    return children;
  }
  return <Navigate to={Routeconstant.LOGIN} />;
};

export const PublicRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("BLOG"));
  if (user && user.data.length) {
    return <Navigate to="/" />;
  }
  return children;
};

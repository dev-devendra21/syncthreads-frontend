import { ReactNode } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("jwt_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;

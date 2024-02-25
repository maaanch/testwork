/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// project imports

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const RequireAuth = ({ allowedRoles }: { allowedRoles: any }) => {
  const { getaccessToken, isLoggedIn, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const token = getaccessToken();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("signin", { replace: true });
  //   }
  // }, [token, navigate]);

  // return <>{token && <Outlet />}</>;
  return <Outlet />;
};

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default RequireAuth;

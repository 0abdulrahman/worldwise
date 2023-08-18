import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

import PropTypes from "prop-types";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate("/worldwise/login");
  }, [user, navigate]);

  if (user) {
    return <>{children}</>;
  }
}

export default AuthGuard;

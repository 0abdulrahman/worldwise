import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext();

const BASE_URL = "https://worldwiseapi.somee.com/api";

const intitalState = { loading: false, error: "", user: null };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, error: null, loading: true };
    case "logged":
      return { ...state, loading: false, error: null, user: action.payload };
    case "registered":
      return { ...state, loading: false, error: null, user: action.payload };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "reset":
      return { ...state, error: null };
    case "logout":
      return { ...state, ...intitalState };
    default:
      throw new Error("Unknown action type :(");
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
function AuthProvider({ children }) {
  const [{ loading, error, user }, dispatch] = useReducer(reducer, intitalState);
  const navigate = useNavigate();
  // get user details on first load
  useEffect(() => {
    const userId = localStorage.getItem("WorldWiseUser");
    if (userId) {
      (async () => {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(`${BASE_URL}/users/login/${userId}`);
          if (!res.ok) throw new Error();
          const data = await res.json();
          dispatch({ type: "logged", payload: data.data });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

  async function login(loginDetails = {}) {
    if (loginDetails.userName && loginDetails.password) {
      try {
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          body: JSON.stringify(loginDetails),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errResponse = await res.json();
          dispatch({ type: "error", payload: errResponse.message });
        } else {
          const data = await res.json();
          localStorage.setItem("WorldWiseUser", data.data.userId);
          dispatch({ type: "logged", payload: data.data });
          navigate("/worldwise/app");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({ type: "error", payload: "Username and password cannot be empty" });
    }
  }

  async function register(registerDetails) {
    const registerObject = Object.fromEntries(registerDetails);
    if (
      registerObject.userName &&
      registerObject.firstName &&
      registerObject.lastName &&
      registerObject.password &&
      registerObject.email
    ) {
      try {
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          body: registerDetails,
        });

        if (!res.ok) {
          const errResponse = await res.json();
          dispatch({ type: "error", payload: errResponse.message });
        } else {
          const data = await res.json();
          if (!data) {
            dispatch({ type: "error", payload: data.message });
          } else {
            localStorage.setItem("WorldWiseUser", data.data.userId);
            console.log(data);
            dispatch({ type: "registered", payload: data.data });
            navigate("/worldwise/app");
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({ type: "error", payload: "Please fill out all fields." });
    }
  }

  const reset = useCallback(function reset() {
    dispatch({ type: "reset" });
  }, []);

  function logOut() {
    dispatch({ type: "logout" });
    localStorage.removeItem("WorldWiseUser");
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        reset,
        logOut,
        loading,
        error,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outside of its Provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };

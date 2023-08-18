import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { RiEyeFill, RiEyeCloseLine } from "react-icons/ri";

function Login() {
  const { login, reset, error, loading, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  if (user) navigate("/worldwise/app/cities");

  function handleSubmit(e) {
    e.preventDefault();
    login({ userName: username, password });
  }

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <section className={styles.login}>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className={styles.password}>
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setShowPassword((state) => !state)} type="button">
            {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
          </button>
        </div>
        {loading && <Loading />}
        {error && <p className="error">{error}</p>}
        <Button text="Login">Login</Button>
        <Link to="/worldwise/register" className={styles.link} onClick={reset}>
          Don&apos;t have an account?
        </Link>
      </form>
    </section>
  );
}

export default Login;

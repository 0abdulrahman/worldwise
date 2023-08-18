import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";
import { useCities } from "../../context/CitiesContext";

function Navbar() {
  const { user, logOut } = useAuth();
  const { logOutCities } = useCities();
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <NavLink to="/worldwise/" className={styles.link}>
          Homepage
        </NavLink>
        <NavLink to="/worldwise/product" className={styles.link}>
          Product
        </NavLink>
        {user ? (
          <NavLink
            to="/worldwise"
            className={styles.login}
            onClick={() => {
              logOutCities();
              logOut();
            }}
          >
            Logout
          </NavLink>
        ) : (
          <NavLink to="/worldwise/login" className={styles.login}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

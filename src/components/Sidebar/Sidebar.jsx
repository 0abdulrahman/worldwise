import { NavLink, Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";

function Sidebar() {
  return (
    <section className={styles.sidebar}>
      <Logo />
      <div className={styles.nav}>
        <NavLink to="cities">Cities</NavLink>
        <NavLink to="countries">Countries</NavLink>
      </div>
      <Outlet />
      <footer>© Copyright {new Date().getFullYear()} by WorldWise Inc.</footer>
    </section>
  );
}

export default Sidebar;

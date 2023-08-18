import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import styles from "./Logo.module.css";
function Logo() {
  return (
    <Link to="/worldwise/" className={styles.link}>
      <img src={logo} alt="WorldWise" className={styles.img} />
      WorldWise
    </Link>
  );
}

export default Logo;

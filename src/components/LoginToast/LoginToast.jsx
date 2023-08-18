import { useAuth } from "../../context/AuthContext";
import { useCities } from "../../context/CitiesContext";
import styles from "./LoginToast.module.css";
import PropTypes from "prop-types";

LoginToast.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  logout: PropTypes.func,
};
function LoginToast() {
  const { logOutCities } = useCities();
  const {
    user: { firstName: name, profilePic: img },
    logOut,
  } = useAuth();
  return (
    <div className={styles.loginToast}>
      <div className={styles.img}>
        <img src={img} alt={name} />
      </div>
      <p>
        Welcome,
        <br />
        {name}!
      </p>
      <button
        onClick={() => {
          logOutCities();
          logOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default LoginToast;

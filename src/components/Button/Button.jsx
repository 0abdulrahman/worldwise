import styles from "./Button.module.css";
import PropTypes from "prop-types";

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node || PropTypes.string,
};

function Button({ onClick = null, children }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;

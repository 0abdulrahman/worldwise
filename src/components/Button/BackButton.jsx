import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";
import PropTypes from "prop-types";

BackButton.propTypes = {
  onClick: PropTypes.func,
};

function BackButton({ onClick = null }) {
  const navigate = useNavigate();
  if (onClick === null) {
    onClick = () => navigate(-1);
  }
  return (
    <button onClick={onClick} className={styles.backBtn}>
      &larr; Back
    </button>
  );
}

export default BackButton;

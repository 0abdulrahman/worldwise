import PropTypes from "prop-types";
import styles from "./Countries.module.css";
import { useCities } from "../../context/CitiesContext";
import Loading from "../Loading/Loading";

Countries.propTypes = {
  cities: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

function Countries() {
  const { cities, loading, error } = useCities();
  const countries = cities?.reduce((arr, city) => {
    if (!arr.find((arrCity) => arrCity.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return [...arr];
    }
  }, []);

  return (
    <div className={styles.countries}>
      {loading && <Loading />}
      {error && <p className="error">{error}</p>}
      {!loading && !error && countries && (
        <>
          {countries.map((country) => (
            <div className={styles.country} key={country.country}>
              <p>{country.emoji}</p>
              <p>{country.country}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Countries;

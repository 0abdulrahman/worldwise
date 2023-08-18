import PropTypes from "prop-types";
import styles from "./Cities.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../context/CitiesContext";
import Loading from "../Loading/Loading";
import { useEffect } from "react";

Cities.propTypes = {
  cities: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

function Cities() {
  const { cities, loading, error, currentMapPosition, deleteCity, getCities } = useCities();

  async function handleDelete(e, id) {
    e.preventDefault();
    deleteCity(id);
  }

  useEffect(() => {
    if (!cities || !cities?.length > 0) getCities();
  }, [getCities]);

  return (
    <>
      {loading && <Loading />}

      <div className={`${styles.cities}`}>
        {error && <p className="error">{error}</p>}
        {!loading && !error && cities && (
          <>
            {cities.map((city) => (
              <Link
                className={`${styles.city} ${
                  city.position.lat === currentMapPosition[0] && city.position.lng === currentMapPosition[1]
                    ? "active-city"
                    : ""
                }`}
                key={city.id}
                to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
              >
                <p>
                  {city.emoji} {city.cityName}
                </p>
                <div>
                  <p>{new Date(city.date).toDateString().slice(4)}</p>
                  <button onClick={(e) => handleDelete(e, city.id)}>&#10006;</button>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Cities;

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../../context/CitiesContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import BackButton from "../Button/BackButton";
import styles from "./City.module.css";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";

City.propTypes = {
  cities: PropTypes.array,
};

function City() {
  const id = +useParams().id;
  const { cities, setCurrentMapPosition } = useCities();
  const [lat, lng] = useUrlPosition();
  useEffect(() => {
    setCurrentMapPosition([lat, lng]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  if (!cities.length > 0) return <Loading />;

  const city = cities.find((city) => city.id === id);

  return (
    <div className={styles.city}>
      <div>
        <h6>City name</h6>
        <p>
          <span>{city.emoji} </span>
          {city.cityName}
        </p>
      </div>
      <div>
        <h6>You went to {city.cityName} on</h6>
        <p>{new Date(city.date).toDateString()}</p>
      </div>
      <div>
        <h6>Your notes</h6>
        <p>{city.notes}</p>
      </div>
      <div>
        <h6>Learn more</h6>
        <a href={`https://en.wikipedia.org/wiki/${city.cityName}`} target="_blank" rel="noreferrer">
          Check out {city.cityName} on Wikipedia &rarr;
        </a>
      </div>
      <BackButton />
    </div>
  );
}

export default City;

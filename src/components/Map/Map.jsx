import { useCities } from "../../context/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import PropTypes from "prop-types";
import LoginToast from "../LoginToast/LoginToast";
import styles from "./Map.module.css";
import { useEffect } from "react";

function Map() {
  const { cities, currentMapPosition, setCurrentMapPosition } = useCities();
  const [loading, , location, getLocation] = useGeoLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      setCurrentMapPosition(location);
      navigate(`form?lat=${location[0]}&lng=${location[1]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <section className={styles.map}>
      <UserPositionBtn handleClick={() => getLocation()} loading={loading} />
      <LoginToast />
      <MapContainer center={currentMapPosition} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities &&
          cities.map((city) => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id} className={styles.marker}>
              <Popup>
                <span>{city.emoji}</span> {city.cityName}
              </Popup>
            </Marker>
          ))}
        <ChangeCenter position={currentMapPosition} />
        <ClickListener />
      </MapContainer>
    </section>
  );
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function ClickListener() {
  const navigate = useNavigate();
  const { setCurrentMapPosition } = useCities();
  useMapEvents({
    click: (e) => {
      setCurrentMapPosition([e.latlng.lat, e.latlng.lng]);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

UserPositionBtn.propTypes = {
  loading: PropTypes.bool,
  handleClick: PropTypes.func,
};

function UserPositionBtn({ loading, handleClick }) {
  return (
    <button className={styles.usePositionBtn} onClick={() => handleClick()}>
      {loading ? "Loading..." : "USE YOUR LOCATION"}
    </button>
  );
}
export default Map;

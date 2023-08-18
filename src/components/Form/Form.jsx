import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import styles from "./Form.module.css";
import BackButton from "../Button/BackButton";
import Button from "../Button/Button";
import { useCities } from "../../context/CitiesContext";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { addCity } = useCities();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [cityDate, setCityDate] = useState(new Date().toISOString().slice(0, 10));
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok) throw new Error("Something went wrong, please try again.");
        const data = await res.json();

        if (!data.countryCode) throw new Error("That doesn't seem to be a city, please click somewhere else.");

        setCityName(data.city || data.locality || country || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [lat, lng, country]);

  function handleAdd(e) {
    e.preventDefault();
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: new Date(cityDate).toISOString(),
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };
    if (addCity(newCity)) navigate("/worldwise/app/cities");
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      {!error && (
        <form className={`${styles.form} ${loading ? "form-loading" : ""}`} onSubmit={handleAdd}>
          <div className={styles.group}>
            <label htmlFor="city-name">City name</label>
            <input id="city-name" type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            <span>{emoji}</span>
          </div>
          <div className={styles.group}>
            <label htmlFor="city-date">When did you go to {cityName}?</label>
            <input id="city-date" type="date" value={cityDate} onChange={(e) => setCityDate(e.target.value)} />
          </div>
          <div className={styles.group}>
            <label htmlFor="city-notes">Notes about your trip to {cityName}</label>
            <textarea id="city-notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          </div>
          <div className={styles.btns}>
            <BackButton onClick={() => navigate("/app/cities")} />
            <Button onClick={handleAdd}>Add</Button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;

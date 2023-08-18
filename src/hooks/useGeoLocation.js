import { useState } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getLocation() {
    if (!navigator.geolocation) {
      setError("Something went wrong, your device doesn't support geolocation is seems :(");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (res) => {
        setLocation([res.coords.latitude, res.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }

  return [loading, error, location, getLocation];
}

export default useGeoLocation;

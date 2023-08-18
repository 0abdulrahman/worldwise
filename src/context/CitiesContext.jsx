import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const BASE_URL = "http://worldwiseapi.somee.com/api";

const CitiesContext = createContext();

CitiesProvider.propTypes = {
  children: PropTypes.node,
};

const initialState = { loading: false, error: "", currentMapPosition: [25, 19], cities: [], user: null };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "setMapPosition":
      return { ...state, currentMapPosition: action.payload };
    case "cities/loaded":
      return {
        ...state,
        loading: false,
        cities: action.payload,
        currentMapPosition:
          state.cities.length > 0
            ? [state.cities[0].position.lat, state.cities[0].position.lng]
            : state.currentMapPosition,
      };
    case "city/created":
      return { ...state, loading: false, cities: action.payload[0], currentMapPosition: action.payload[1] };
    case "city/deleted":
      return { ...state, loading: false, cities: action.payload };
    case "logout":
      return { ...state, ...initialState };
    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ loading, error, currentMapPosition, cities }, dispatch] = useReducer(reducer, initialState);

  // Retreive cities
  const getCities = useCallback(
    async function getCities() {
      const userId = localStorage.getItem("WorldWiseUser");
      try {
        dispatch({ type: "loading" });
        const data = await fetch(`${BASE_URL}/cities/${userId}`);
        if (!data.ok) throw new Error("Failed to fetch the data");
        const jsonData = await data.json();
        dispatch({ type: "cities/loaded", payload: jsonData.data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    },
    [dispatch]
  );

  // Create a new city
  const addCity = useCallback(
    async function addCity(newCity) {
      const userId = localStorage.getItem("WorldWiseUser");
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify({ ...newCity, userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to add the city, please try again.");
        const data = await res.json();
        dispatch({
          type: "city/created",
          payload: [
            [...cities, data.data],
            [data.data.position.lat, data.data.position.lng],
          ],
        });
        return true;
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    },
    [cities]
  );

  // Delete a city
  const deleteCity = useCallback(
    async function deleteCity(id) {
      const userId = localStorage.getItem("WorldWiseUser");
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${userId}/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete the city, please try again.");
        dispatch({ type: "city/deleted", payload: cities.filter((city) => city.id !== id) });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    },
    [cities]
  );

  const setCurrentMapPosition = useCallback(function setCurrentMapPosition(coords = [40, 25]) {
    dispatch({ type: "setMapPosition", payload: coords });
  }, []);

  const logOutCities = useCallback(() => {
    dispatch({ type: "logout" });
  }, []);

  const value = useMemo(() => {
    return {
      loading,
      error,
      cities,
      currentMapPosition,
      setCurrentMapPosition,
      addCity,
      deleteCity,
      getCities,
      logOutCities,
    };
  }, [cities, loading, error, currentMapPosition, setCurrentMapPosition, addCity, deleteCity, getCities, logOutCities]);

  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext was used outside of its provider.");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useCities, CitiesProvider };

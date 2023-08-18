import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import AppLayout from "./pages/AppLayout/AppLayout";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Cities from "./components/Cities/Cities";
import City from "./components/City/City";
import Countries from "./components/Countries/Countries";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
// import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CitiesProvider>
          <Navbar />
          <Routes>
            <Route path="/worldwise" element={<Homepage />} />
            <Route path="/worldwise/product" element={<Product />} />
            <Route
              path="/worldwise/app"
              element={
                <AuthGuard>
                  <AppLayout />
                </AuthGuard>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<Cities />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<Countries />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/worldwise/login" element={<Login />} />
            <Route path="/worldwise/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CitiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

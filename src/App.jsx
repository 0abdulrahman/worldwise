import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cities from "./components/Cities/Cities";
import City from "./components/City/City";
import Countries from "./components/Countries/Countries";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AuthGuard from "./components/AuthGuard";
import { Suspense, lazy } from "react";
import SpinnerFullscreen from "./components/SpinnerFullscreen/SpinnerFullscreen";

const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CitiesProvider>
          <Suspense fallback={<SpinnerFullscreen />}>
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
          </Suspense>
        </CitiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

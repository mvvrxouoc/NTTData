import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserDataPage } from "../pages/UserDataPage";
import { DragAndDropPage } from "../pages/Ejemplos/DragAndDropPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { PrivatePage } from "../pages/PrivatePage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { PokemonApiPage } from "../pages/Ejemplos/PokemonApiPage";
import { GoogleCalendarPage } from "../pages/Ejemplos/GoogleCalendarPage";
import { HomePage } from "../pages/HomePage";
import { useEffect } from "react";

export const RoutesComponent = () => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {user?.userData?.token || user?.google?.token ? (
        <>
          <Route path="/user-data" element={<UserDataPage />} />
          <Route path="/dnd" element={<DragAndDropPage />} />
          <Route path="/pokemon-api" element={<PokemonApiPage />} />
          <Route path="/private" element={<PrivateRoute><PrivatePage/></PrivateRoute>} />
          <Route path="/google-calendar" element={<GoogleCalendarPage />} />
          <Route path="/" element={<HomePage />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
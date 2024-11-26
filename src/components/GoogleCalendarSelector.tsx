import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchCalendars, fetchCalendarEvents } from "../api/services/googleCalendarService";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const GoogleCalendarSelector = () => {
  const [user, setUser] = React.useState<any>(null);
  const [calendars, setCalendars] = React.useState<any[]>([]);
  const [selectedCalendar, setSelectedCalendar] = React.useState<string | null>(null);
  const [events, setEvents] = React.useState<any[]>([]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Login Exitoso:", tokenResponse);
      const accessToken = tokenResponse.access_token;
      setUser(tokenResponse);
      try {
        const fetchedCalendars = await fetchCalendars(accessToken);
        setCalendars(fetchedCalendars);
      } catch (error) {
        console.error("Error al obtener calendarios:", error);
      }
    },
    onError: (error) => console.error("Error en el login:", error),
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });

  const handleCalendarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const calendarId = event.target.value;
    setSelectedCalendar(calendarId);
    if (user) {
      fetchCalendarEvents(user.access_token, calendarId)
      .then((items) => {
        const formattedEvents = items.map((event: any) => ({
          title: event.summary || "Sin título",
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error al obtener eventos:", error);
      });
    }
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    setCalendars([]);
    setSelectedCalendar(null);
    setEvents([]);
  };

  const GOOGLE_CLIENT_ID = "499673786460-0i0u0ke85r2ll6hf818mln3v402996h2.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <h1>Acceso al Calendario de Google</h1>
        {user ? (
          <div>
            <button onClick={logout}>Cerrar sesión</button>
            <h2>Bienvenido</h2>
            {calendars.length > 0 && (
              <div>
                <label htmlFor="calendarSelector">Selecciona un calendario:</label>
                <select id="calendarSelector" onChange={handleCalendarChange}>
                  <option value="">Selecciona un calendario</option>
                  {calendars.map((calendar) => (
                    <option key={calendar.id} value={calendar.id}>
                      {calendar.summary}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {events.length > 0 && (
              <div style={{ height: "500px" }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => login()}>Iniciar sesión con Google</button>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};
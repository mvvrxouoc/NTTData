import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchCalendars, fetchCalendarEvents } from "../api/services/googleCalendarService";
import { useAuth } from '../hooks/useAuth';

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
  const { user } = useAuth();
  const accessToken = user?.google?.token;

  const [calendars, setCalendars] = React.useState<any[]>([]);
  const [selectedCalendar, setSelectedCalendar] = React.useState<string | null>(null);
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (accessToken && calendars.length === 0) {
      fetchCalendars(accessToken)
        .then(setCalendars)
        .catch((error) => console.error("Error al obtener calendarios:", error));
    }
  }, [accessToken]);

  const handleCalendarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const calendarId = event.target.value;
    setSelectedCalendar(calendarId);
    if (accessToken && calendarId) {
      fetchCalendarEvents(accessToken, calendarId)
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

  return (
    <div>
      <h1>Acceso al Calendario de Google</h1>
      {calendars.length > 0 ? (
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
      ) : (
        <p>Cargando calendarios...</p>
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
  );
};
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from "date-fns";
import esES from "date-fns/locale/es";
import { fetchCalendarEvents } from '../../api/services/googleCalendarService';
import { useAuth } from '../../hooks/useAuth';

const locales = {
  es: esES,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarView = () => {
  const { user, calendarId } = useAuth();
  const accessToken = user?.google?.token;
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
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
  }, [accessToken, calendarId]);

  if (!calendarId) {
    return null;
  }

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="es"
        style={{ height: 500 }}
      />
    </div>
  );
};
import React from 'react';
import { fetchCalendars } from '../../api/services/googleCalendarService';
import { useAuth } from '../../hooks/useAuth';

export const CalendarSelector = () => {
  const { user, setCalendarId } = useAuth();
  const accessToken = user?.google?.token;
  const [calendars, setCalendars] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (accessToken && calendars.length === 0) {
      fetchCalendars(accessToken)
        .then(setCalendars)
        .catch((error) => console.error("Error al obtener calendarios:", error));
    }
  }, [accessToken]);

  const handleCalendarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCalendarId = event.target.value;
    setCalendarId(selectedCalendarId);
  };

  return (
    <div>
      <h2>Selecciona un calendario:</h2>
      {calendars.length > 0 ? (
        <select onChange={handleCalendarChange}>
          <option value="">Selecciona un calendario</option>
          {calendars.map((calendar) => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.summary}
            </option>
          ))}
        </select>
      ) : (
        <p>Cargando calendarios...</p>
      )}
    </div>
  );
};
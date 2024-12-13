import React, { useState, useEffect } from 'react';
import { fetchEventsForDate } from '../../api/services/googleCalendarService';
import { useAuth } from '../../hooks/useAuth';

interface DateTimeSelectorProps {
  onSelectDateTime: (dateTime: string) => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ onSelectDateTime }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [suggestedTimes, setSuggestedTimes] = useState<string[]>([]);
  const { user, calendarId } = useAuth();
  const accessToken = user?.google?.token;

  const preferredSlots = [
    { name: 'Mañana', start: '08:00', end: '12:00' },
    { name: 'Tarde', start: '12:00', end: '18:00' },
    { name: 'Noche', start: '18:00', end: '23:00' },
  ];

  useEffect(() => {
    if (selectedDate && accessToken && calendarId) {
      fetchEventsForDate(accessToken, calendarId, selectedDate)
        .then((events) => {
          const availableTimes = getSuggestedTimes(events);
          setSuggestedTimes(availableTimes);
        })
        .catch((error) => {
          console.error('Error al obtener eventos:', error);
        });
    }
  }, [selectedDate]);

  const getSuggestedTimes = (events: any[]) => {
    const suggestions: string[] = [];
    for (const slot of preferredSlots) {
      const slotStart = new Date(`${selectedDate}T${slot.start}:00`);
      const slotEnd = new Date(`${selectedDate}T${slot.end}:00`);

      const isFree = !events.some((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
          (eventStart >= slotStart && eventStart < slotEnd) ||
          (eventEnd > slotStart && eventEnd <= slotEnd) ||
          (eventStart <= slotStart && eventEnd >= slotEnd)
        );
      });

      if (isFree) {
        suggestions.push(`${slot.name}: ${slot.start}`);
        if (suggestions.length === 3) break;
      }
    }

    return suggestions;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSelect = (time: string) => {
    const slot = preferredSlots.find((s) => s.start === time.split(': ')[1]);
    if (slot) {
      const dateTime = `${selectedDate}T${slot.start}:00`;
      onSelectDateTime(dateTime);
    }
  };

  return (
    <div>
      <h2>Selecciona Fecha</h2>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      {suggestedTimes.length > 0 && (
        <div>
          <h3>Horas sugeridas:</h3>
          <ul>
            {suggestedTimes.map((time) => (
              <li key={time}>
                <button onClick={() => handleTimeSelect(time)}>{time}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
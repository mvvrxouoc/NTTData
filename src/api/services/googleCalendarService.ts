import axios from 'axios';

export const fetchCalendarEvents = async (accessToken: string, calendarId: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        singleEvents: true,
        orderBy: 'startTime',
      },
    },
  );
  return response.data.items;
};

export const fetchCalendars = async (accessToken: string) => {
  const response = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.items;
};

export const fetchEventsForDate = async (accessToken: string, calendarId: string, date: string) => {
  const startOfDay = `${date}T00:00:00Z`;
  const endOfDay = `${date}T23:59:59Z`;

  const response = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      params: {
        timeMin: startOfDay,
        timeMax: endOfDay,
        singleEvents: true,
        orderBy: 'startTime',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.items.map((event: any) => ({
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
  }));
};


export const createEvent = async (accessToken: string, calendarId: string, event: any) => {
  const response = await axios.post(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    event,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
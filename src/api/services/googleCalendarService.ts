import axios from 'axios';

export const fetchCalendars = async (accessToken: string) => {
  const response = await axios.get(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.items;
};

export const fetchCalendarEvents = async (accessToken: string, calendarId: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.items;
};
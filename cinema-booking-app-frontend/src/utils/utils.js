export default function formatDate(dateString) {
  const date = new Date(dateString);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];

  const hour = date.getHours();

  const formattedDate = `${dayOfWeek} ${hour}.00`;

  return formattedDate;
}

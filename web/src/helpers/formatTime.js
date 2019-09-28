const minutesInDay = 1440;
const minutesInHour = 60;

export const formatTime = (time) => {
  let timeBalance = time;
  const formatedTime = {
    days: 0,
    hours: 0,
    minutes: 0,
  };

  if (timeBalance / minutesInDay) {
    const days = Math.floor(timeBalance / minutesInDay);
    formatedTime.days = days;
    timeBalance -= days * minutesInDay;
  }

  if (timeBalance / minutesInHour) {
    const hours = Math.floor(timeBalance / minutesInHour);
    formatedTime.hours = hours;
    timeBalance -= hours * minutesInHour;
  }

  formatedTime.minutes = timeBalance;
  return formatedTime;
};

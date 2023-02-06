const addOrSubtractFromDate = (date, value, timeUnit) => {
  switch(timeUnit) {
    case 'y':
      date.setFullYear(date.getFullYear() + value);
      break;
    case 'mon':
      date.setMonth(date.getMonth() + value);
      break;
    case 'd':
      date.setDate(date.getDate() + value);
      break;
    case 'h':
      date.setHours(date.getHours() + value);
      break;
    case 'm':
      date.setMinutes(date.getMinutes() + value);
      break;
    case 's':
      date.setSeconds(date.getSeconds() + value);
      break;
    default:
      // invalid time unit
      break;
  }
  return date;
}

const snapDateToTimeUnit = (date, timeUnit) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  switch(timeUnit) {
    case 'y':
      date = new Date(Date.UTC(year));
      break;
    case 'mon':
      date = new Date(Date.UTC(year, month));
      break;
    case 'd':
      date = new Date(Date.UTC(year, month, day));
      break;
    case 'h':
      date = new Date(Date.UTC(year, month, day, hours));
      break;
    case 'm':
      date = new Date(Date.UTC(year, month, day, hours, minutes));
      break;
    case 's':
      date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
      break;
    default:
      // invalid time unit
      break;
  }
  return date;
}

module.exports = { addOrSubtractFromDate, snapDateToTimeUnit };
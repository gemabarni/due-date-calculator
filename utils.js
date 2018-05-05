const SUNDAY = 0;
const SATURDAY = 6;

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const ONE_DAY_IN_MS = 24 * ONE_HOUR_IN_MS;

const SHIFT_START = [9, 0, 0, 0];
const SHIFT_END = [17, 0, 0, 0];


function nextMorning(date) {
  const nextDay = new Date(date.getTime() + ONE_DAY_IN_MS);
  return new Date(nextDay.setHours(...SHIFT_START));
}

function shiftEnd(date) {
  const endTime = new Date(date).setHours(...SHIFT_END);
  return new Date(endTime);
}

function isWorkday(date) {
  const day = date.getDay();
  return day > SUNDAY && day < SATURDAY;
}

function isWorkTime(date) {
  const start = new Date(date).setHours(...SHIFT_START);
  const end = new Date(date).setHours(...SHIFT_END);
  return isWorkday(date) && start <= date && date <= end;
}

module.exports = {
  nextMorning,
  shiftEnd,
  isWorkday,
  isWorkTime,
};

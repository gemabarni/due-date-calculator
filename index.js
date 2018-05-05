const {
  nextMorning,
  shiftEnd,
  isWorkday,
  isWorkTime,
} = require('./utils');

const ONE_HOUR_IN_MS = 1000 * 60 * 60;

function calculateDueDate(submitDate, turnaround) {
  if (!(submitDate instanceof Date)) {
    throw new Error('The submission date is not a Date object');
  }
  if (!isWorkTime(submitDate)) {
    throw new Error('The submission date is not during worktime');
  }

  if (Number(parseFloat(turnaround)) !== turnaround) {
    throw new Error('The turnaround time is not a number');
  }
  if (!Number.isInteger(turnaround) || !(turnaround > 0)) {
    throw new Error('The turnaround time is not a positive integer');
  }

  let remaining = turnaround * ONE_HOUR_IN_MS;
  let currentDate = new Date(submitDate);

  while (remaining > 0) {
    if (isWorkday(currentDate)) {
      const shiftRemaining = shiftEnd(currentDate) - currentDate;

      if (shiftRemaining < remaining) {
        remaining -= shiftRemaining;
      } else {
        return new Date(currentDate.getTime() + remaining);
      }
    }
    currentDate = nextMorning(currentDate);
  }
}

module.exports = calculateDueDate;

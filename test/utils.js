const { assert } = require('chai');
const utils = require('../utils');

const assertDateEqual = (date1, date2) =>
  assert.equal(date1.getTime(), date2.getTime());

describe('utils', () => {
  describe('nextMorning()', () => {
    const workday = new Date(2018, 4, 4, 18, 0, 0, 0);
    const nonWorkday = new Date(2018, 4, 5, 18, 0, 0, 0);

    it('returns a date object', () => {
      assert.instanceOf(utils.nextMorning(workday), Date);
      assert.instanceOf(utils.nextMorning(nonWorkday), Date);
    });

    it('returns the 9AM of the next day', () => {
      const workdayResult = new Date(2018, 4, 5, 9, 0, 0, 0);
      const nonWorkdayResult = new Date(2018, 4, 6, 9, 0, 0, 0);
      assertDateEqual(utils.nextMorning(workday), workdayResult);
      assertDateEqual(utils.nextMorning(nonWorkday), nonWorkdayResult);
    });
  });

  describe('shiftEnd()', () => {
    const test = new Date(2018, 4, 4, 12, 0, 0, 0);

    it('returns a date object', () => {
      assert.instanceOf(utils.shiftEnd(test), Date);
    });

    it('returns 5PM of the same day', () => {
      const testResult = new Date(2018, 4, 4, 17, 0, 0, 0);
      assertDateEqual(utils.shiftEnd(test), testResult);
    });
  });

  describe('isWorkday()', () => {
    const workday = new Date(2018, 4, 4, 18, 0, 0, 0);
    const nonWorkday = new Date(2018, 4, 5, 18, 0, 0, 0);

    it('returns a boolean', () => {
      assert.isBoolean(utils.isWorkday(workday));
      assert.isBoolean(utils.isWorkday(nonWorkday));
    });

    it('returns true for workdays', () => {
      assert.isTrue(utils.isWorkday(workday));
    });

    it('returns false for non-workdays', () => {
      assert.isFalse(utils.isWorkday(nonWorkday));
    });
  });

  describe('isWorkTime()', () => {
    const beforeWorkTime = new Date(2018, 4, 4, 7, 0, 0, 0);
    const afterWorkTime = new Date(2018, 4, 4, 19, 0, 0, 0);
    const workTime = new Date(2018, 4, 4, 15, 0, 0, 0);
    const nonWorkday = new Date(2018, 4, 5, 12, 0, 0, 0);

    it('returns a boolean', () => {
      assert.isBoolean(utils.isWorkTime(beforeWorkTime));
      assert.isBoolean(utils.isWorkTime(afterWorkTime));
      assert.isBoolean(utils.isWorkTime(workTime));
      assert.isBoolean(utils.isWorkTime(nonWorkday));
    });

    it('returns true for worktime', () => {
      assert.isTrue(utils.isWorkTime(workTime));
    });

    it('returns false for non-worktime', () => {
      assert.isFalse(utils.isWorkTime(beforeWorkTime));
      assert.isFalse(utils.isWorkTime(afterWorkTime));
      assert.isFalse(utils.isWorkTime(nonWorkday));
    });
  });
});

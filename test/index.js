const { assert } = require('chai');
const calculateDueDate = require('..');

const assertDateEqual = (date1, date2) =>
  assert.equal(date1.getTime(), date2.getTime());

describe('calculateDueDate()', () => {
  it('is a function', () => {
    assert.isFunction(calculateDueDate);
  });

  it('returns a date object', () => {
    const workTime = new Date(2018, 4, 4, 15, 0, 0, 0);
    assert.instanceOf(calculateDueDate(workTime, 3), Date);
  });

  describe('throws if', () => {
    it('submission date if not a date object', () => {
      assert.throws(() => calculateDueDate(5, 3), Error);
      assert.throws(() => calculateDueDate('friday', 3), Error);
    });

    it('submission date if not during worktime', () => {
      const beforeWorkTime = new Date(2018, 4, 4, 7, 0, 0, 0);
      const afterWorkTime = new Date(2018, 4, 4, 19, 0, 0, 0);
      const nonWorkday = new Date(2018, 4, 5, 12, 0, 0, 0);
      assert.throws(() => calculateDueDate(beforeWorkTime, 3), Error);
      assert.throws(() => calculateDueDate(afterWorkTime, 3), Error);
      assert.throws(() => calculateDueDate(nonWorkday, 3), Error);
    });

    it('turnaround is not a positive integer', () => {
      const workTime = new Date(2018, 4, 4, 15, 0, 0, 0);
      assert.throws(() => calculateDueDate(workTime, 'foo'), Error);
      assert.throws(() => calculateDueDate(workTime, 1.2), Error);
      assert.throws(() => calculateDueDate(workTime, -3), Error);
    });
  });

  describe('calculates the result well for', () => {
    it('same day results', () => {
      const day1 = new Date(2018, 4, 4, 14, 15, 23, 7);
      const day2 = new Date(2018, 2, 7, 10, 0, 0, 0);
      const day1Result = new Date(2018, 4, 4, 16, 15, 23, 7);
      const day2Result = new Date(2018, 2, 7, 16, 0, 0, 0);
      assertDateEqual(calculateDueDate(day1, 2), day1Result);
      assertDateEqual(calculateDueDate(day2, 6), day2Result);
    });

    it('next day results', () => {
      const day1 = new Date(2018, 4, 2, 14, 15, 23, 7);
      const day2 = new Date(2018, 2, 7, 10, 0, 0, 0);
      const day1Result = new Date(2018, 4, 3, 12, 15, 23, 7);
      const day2Result = new Date(2018, 2, 8, 10, 0, 0, 0);
      assertDateEqual(calculateDueDate(day1, 6), day1Result);
      assertDateEqual(calculateDueDate(day2, 8), day2Result);
    });

    it('weekends included', () => {
      const day1 = new Date(2018, 4, 4, 14, 15, 23, 7);
      const day2 = new Date(2018, 2, 1, 10, 0, 0, 0);
      const day1Result = new Date(2018, 4, 7, 12, 15, 23, 7);
      const day2Result = new Date(2018, 2, 5, 13, 0, 0, 0);
      assertDateEqual(calculateDueDate(day1, 6), day1Result);
      assertDateEqual(calculateDueDate(day2, 19), day2Result);
    });

    it('worktime bounds', () => {
      const day1 = new Date(2018, 4, 4, 9, 0, 0, 0);
      const day2 = new Date(2018, 2, 1, 10, 0, 0, 0);
      const day1Result = new Date(2018, 4, 4, 17, 0, 0, 0);
      const day2Result = new Date(2018, 2, 5, 17, 0, 0, 0);
      assertDateEqual(calculateDueDate(day1, 8), day1Result);
      assertDateEqual(calculateDueDate(day2, 23), day2Result);
    });

    it('longer duration', () => {
      const day1 = new Date(2018, 3, 4, 10, 0, 0, 0);
      const day1Result = new Date(2018, 4, 3, 16, 0, 0, 0);
      assertDateEqual(calculateDueDate(day1, 174), day1Result);
    });
  });
});

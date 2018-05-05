# due-date-calculator
Utility to calculate due dates of bugfixes

## Installation
```
npm i @gema/due-date-calculator
```

## Usage
**calculateDueDate(submitDate, turnaround)**

Where the parameters are:
- **submitDate**: `Date` object, the submission time of the bug, has to fall during worktime (Monday - Friday, 9AM - 5PM)
- **turnaround**: `Number`, the turnaround time of the issue in hours, a positive integer

It returns a `Date` object meaning the due date of the issue.

## Example
```js
const calculateDueDate = require('@gema/due-date-calculator');

calculateDueDate(new Date(2018, 4, 4, 9, 0, 0, 0), 8);
// 2018-05-04T17:00:00.000Z
```

## Linting and testing
```
npm run lint
npm test
```

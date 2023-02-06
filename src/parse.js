const utils = require('./utils.js');

const parse = (string) => {
	if (!string || !string.startsWith('now()')) throw new Error('No string or invalid string provided');

	const now = new Date(Date.now());
	// FOR TESTING EXAMPLES
	// const now = new Date(Date.parse("2022-01-08T09:00:00Z"));

	/*
  Find all operations in string
    Regex breakdown - 3 capturing groups (within brackets):
      1 (\\+|-|@) => either '+' OR '-' OR '@'
      2 ([0-9]+)? => any number of digits between 0 and 9 | question mark makes this capturing group optional
      3 (\\y|mon|d|h|m|s) => either 'y' OR 'mon' OR 'd' OR 'h' OR 'm' OR 's' 
  */
 	const regex = "(\\+|-|@)([0-9]+)?(\\y|mon|d|h|m|s)";
	const operations = string.matchAll(regex);

  let newDate = now;

	for (const operation of operations) {
    const operator = operation[1]; // +, - or @
    const number = operation[2]; // any number or empty in case of snap (@)
    const timeUnit = operation[3]; // mon, d, h, m or s

    switch(operator) {
      case '+':
      case '-':
        newDate = utils.addOrSubtractFromDate(newDate, Number(operator + number), timeUnit);
        break;
      case '@':
        newDate = utils.snap(newDate, timeUnit);
        break;
      default:
        // invalid operator
        break;
    }
  }
  return newDate;
};

module.exports = parse;

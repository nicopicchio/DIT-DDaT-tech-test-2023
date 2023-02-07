const utils = require('./utils.js');

const parse = (string) => {
	if (!string || !string.startsWith('now()')) {
		throw new Error('No string or invalid string provided');
	}

	const now = new Date();
	let newDate = now.toISOString().split('.')[0] + 'Z';
	newDate = new Date(newDate);

	// Find all operations in string
	// Regex breakdown - 3 capturing groups (within brackets):
	//  1 - (\\+|-|@) => either '+' OR '-' OR '@'
	//  2 - ([0-9]+)? => any number of digits between 0 and 9 | question mark makes this capturing group optional
	//  3 - (\\y|mon|d|h|m|s) => either 'y' OR 'mon' OR 'd' OR 'h' OR 'm' OR 's'

	const regex = '(\\+|-|@)([0-9]+)?(\\y|mon|d|h|m|s)';
	const operations = string.matchAll(regex);

	for (const operation of operations) {
		const operator = operation[1]; // +, - or @
		const number = operation[2]; // any number or empty in case of snap (@)
		const timeUnit = operation[3]; // mon, d, h, m or s

		switch (operator) {
			case '+':
			case '-':
				newDate = utils.addOrSubtractFromDate(newDate, Number(operator + number),	timeUnit);
				break;
			case '@':
				newDate = utils.snapDateToTimeUnit(newDate, timeUnit);
				break;
			default:
				break;
		}
	}
	return newDate;
};

console.log('current date -> ', parse('now()'));
console.log('current date plus 1 day -> ', parse('now()+1d'));
console.log('current date minus 1 day -> ', parse('now()-1d'));
console.log('current date snapped at day time unit -> ', parse('now()@d'));
console.log('current date minus 1 year, snapped at month time unit -> ', parse('now()-1y@mon'));
console.log('current date plus 10 days plus 12 hours -> ', parse('now()+10d+12h'));

module.exports = parse;

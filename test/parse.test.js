const parse = require('../src/parse.js');

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date('1912-06-23T08:15:00.000Z'));
});

test('should throw an error if no string is provided', () => {
	const result = 'No string or invalid string provided'
	expect(() => parse().toThrow(result));
});

test('should throw an error if the string format is invalid', () => {
	const result = 'No string or invalid string provided'
	expect(() => parse('hello, world')).toThrow(result);
});

test('should add one day', () => {
	const result = new Date('1912-06-24T08:15:00.000Z');
	expect(parse('now()+1d')).toEqual(result);
});

test('should add 10 minutes', () => {
	const result = new Date('1912-06-23T08:25:00.000Z');
	expect(parse('now()+10m')).toEqual(result);
});

test('should add one month', () => {
	const result = new Date('1912-07-23T08:15:00.000Z');
	expect(parse('now()+1mon')).toEqual(result);
});

test('should add one year', () => {
	const result = new Date('1913-06-23T08:15:00.000Z');
	expect(parse('now()+1y')).toEqual(result);
});

test('should add 30 seconds', () => {
	const result = new Date('1912-06-23T08:15:30.000Z');
	expect(parse('now()+30s')).toEqual(result);
});

test('should add 20 days and 12 hours', () => {
	const result = new Date('1912-07-13T20:15:00.000Z');
	expect(parse('now()+20d+12h')).toEqual(result);
});

test('should subtract 1 day', () => {
	const result = new Date('1912-06-22T08:15:00.000Z');
	expect(parse('now()-1d')).toEqual(result);
});

test('should subtract 2 years and snap to month', () => {
	const result = new Date('1911-06-01T00:00:00.000Z');
	expect(parse('now()-1y@mon')).toEqual(result);
});

test('should subtract 8 months and snap to day', () => {
	const result = new Date('1911-10-23T00:00:00.000Z');
	expect(parse('now()-8mon@d')).toEqual(result);
});

test('should snap to day', () => {
	const result = new Date('1912-06-23T00:00:00.000Z');
	expect(parse('now()@d')).toEqual(result);
});

test('should snap to year', () => {
	const result = new Date('1912-01-01T00:00:00.000Z');
	expect(parse('now()@y')).toEqual(result);
});

test('should add 7 months and snap to day', () => {
	const result = new Date('1913-01-23T00:00:00.000Z');
	expect(parse('now()+7mon@d')).toEqual(result);
});

test('should add 18 months and snap to month', () => {
	const result = new Date('1913-12-01T00:00:00.000Z');
	expect(parse('now()+18mon@mon')).toEqual(result);
});

// to add test with wrong time units

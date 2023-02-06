const parse = require('../src/parse');

test('should throw an error if no string is provided', () => {
	expect(() => parse().toThrow('No string or invalid string provided'));
});

test('should throw an error if the string format is invalid', () => {
	expect(() => parse('hello, world')).toThrow('No string or invalid string provided');
});

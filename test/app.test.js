const parse = require('../src/app')

test('should throw an error if no string is provided', () => {
	expect(() => parse().toThrow('No string provided'));
});

test('should throw an error if the string format is invalid', () => {
	expect(() => parse('hello, world')).toThrow('Invalid string format');
});

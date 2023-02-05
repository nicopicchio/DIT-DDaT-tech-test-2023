const parse = require('../src/app')

test('should return a passed string', () => {
	expect(parse('hello, world')).toEqual('hello, world');
});

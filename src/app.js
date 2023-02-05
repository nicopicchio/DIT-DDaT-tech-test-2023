const parse = (string) => {
  if (!string) throw new Error('No string provided')
  if (!string.startsWith('now()')) throw new Error('Invalid string format')
}

module.exports = parse

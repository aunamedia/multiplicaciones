const index = require('./index');

test('Un número aleatorio de una lista de un elemento, debe ser el mismo elemento', () => {
  expect(index.num_ale([1])).toBe(1);
});
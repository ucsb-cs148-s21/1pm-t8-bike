import { multiply } from "../src/utils/multiply"

const product = require('./product');

test('multiply 1 * 2 to equal 2', () => {
  expect(multiply(1, 2)).toBe(2);
});
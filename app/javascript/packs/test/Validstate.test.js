const Validstate = require('../validstate/validstate');
const validstate = new Validstate();

test('checks if value is required', () => {
  expect(validstate.required("")).toBe(false);
  // expect(validstate.required("   ")).toBe(false);
  expect(validstate.required(null)).toBe(false);
  expect(validstate.required(undefined)).toBe(false);
  expect(validstate.required([])).toBe(false);
  expect(validstate.required({})).toBe(false);
});

test('checks if value has minLength', () => {
  const string = "test";
  const array = [1,2,3,4];
  const object = {1: '1', 2: '2'};
  expect(validstate.minLength(string, 3)).toBe(true);
  expect(validstate.minLength(array, 5)).toBe(false);
  expect(validstate.minLength(object, 3)).toBe(false);
});

test('checks if value has maxLength', () => {
  const string = "test";
  const array = [1,2,3,4];
  const object = {1: '1', 2: '2'};
  expect(validstate.maxLength(string, 3)).toBe(false);
  expect(validstate.maxLength(array, 5)).toBe(true);
  expect(validstate.maxLength(object, 3)).toBe(true);
});
